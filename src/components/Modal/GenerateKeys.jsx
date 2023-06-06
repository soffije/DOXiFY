import { useState, useEffect } from 'react'
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap'

function GenerateModal(props) {
  const { show, handleClose } = props
  const [words, setWords] = useState([])
  const [currentWords, setCurrentWords] = useState([])
  const [remainingWords, setRemainingWords] = useState([])
  const [currentStep, setCurrentStep] = useState(1)
  const [newWords, setNewWords] = useState([])

  const handleGenerateWords = () => {
    const numWords = 12
    const selectedWords = []
    const remainingWords = [...words]
    while (selectedWords.length < numWords) {
      const randomIndex = Math.floor(Math.random() * remainingWords.length)
      const randomWord = remainingWords[randomIndex]
      if (!selectedWords.includes(randomWord)) {
        selectedWords.push(randomWord)
        remainingWords.splice(randomIndex, 1)
      }
    }
    setCurrentWords(selectedWords)
    setRemainingWords(remainingWords)
  }

  const handleGenerateNewWords = () => {
    const newWords = [...currentWords]

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * newWords.length)
      if (newWords[randomIndex] === '') {
        i--
      } else {
        newWords[randomIndex] = ''
      }
    }
    setNewWords(newWords)
  }

  const handleCopyWords = () => {
    const textToCopy = currentWords.join(' ')
    navigator.clipboard.writeText(textToCopy)
  }

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
    if (currentStep === 1) {
      handleGenerateNewWords()
    }
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  useEffect(() => {
    fetch('words.json')
      .then((response) => response.json())
      .then((data) => setWords(data))
  }, [])
  return (
    <Modal
      onShow={handleGenerateWords}
      show={show}
      onHide={handleClose}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Generate Words</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentStep === 1 && (
          <Container>
            <Row>
              {currentWords.map((word, index) => (
                <Col md={3} key={index}>
                  <Form.Control
                    type="text"
                    value={word}
                    readOnly
                    className="border border-secondary p-3 mb-3"
                    style={{ fontSize: '1.5rem' }}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        )}
        {currentStep === 2 && (
          <Container>
            <Row>
              {newWords.map((word, index) => (
                <Col md={3} key={index}>
                  {word !== '' ? (
                    <Form.Control
                      type="text"
                      value={word}
                      readOnly
                      className="border border-secondary p-3 mb-3"
                      style={{ fontSize: '1.5rem' }}
                    />
                  ) : (
                    <Form.Control
                      type="text"
                      value={word}
                      onChange={(e) => {
                        const updatedWords = [...newWords]
                        updatedWords[index] = e.target.value
                        setNewWords(updatedWords)
                      }}
                      placeholder="Enter a word"
                      className="border border-secondary p-3 mb-3"
                      style={{ fontSize: '1.5rem' }}
                    />
                  )}
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        {currentStep === 1 && (
          <>
            <Button variant="primary" onClick={handleNextStep}>
              Next Step
            </Button>
            <Button variant="primary" onClick={handleCopyWords}>
              Copy Words
            </Button>
          </>
        )}
        {currentStep === 2 && (
          <>
            <Button variant="primary" onClick={handlePreviousStep}>
              Previous Step
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default GenerateModal
