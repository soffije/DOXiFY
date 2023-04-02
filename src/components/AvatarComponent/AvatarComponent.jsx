import React, { useState } from 'react'
import Avatar from 'avataaars'
import { Form, FloatingLabel, Row, Col } from 'react-bootstrap'
import './AvatarEditor.css'

function AvatarComponent({ avatarOptions, setAvatarOptions }) {
  const hairTypes = [
    'NoHair',
    'Eyepatch',
    'Hat',
    'Hijab',
    'Turban',
    'ShortHairDreads01',
    'ShortHairFrizzle',
    'ShortHairShaggyMullet',
    'ShortHairShortCurly',
    'ShortHairShortFlat',
    'ShortHairShortRound',
    'ShortHairShortWaved',
    'ShortHairSides',
    'ShortHairTheCaesar',
    'ShortHairTheCaesarSidePart',
  ]

  const hairColors = [
    'Auburn',
    'Black',
    'Blonde',
    'BlondeGolden',
    'Brown',
    'BrownDark',
    'PastelPink',
    'Platinum',
    'Red',
    'SilverGray',
  ]

  const accessoriesTypes = [
    'Blank',
    'Kurt',
    'Prescription01',
    'Prescription02',
    'Round',
    'Sunglasses',
    'Wayfarers',
  ]

  const facialHairTypes = [
    'Blank',
    'BeardLight',
    'BeardMagestic',
    'BeardMedium',
    'MoustacheFancy',
    'MoustacheMagnum',
  ]

  const facialHairColors = [
    'Auburn',
    'Black',
    'Blonde',
    'BlondeGolden',
    'Brown',
    'BrownDark',
    'Platinum',
    'Red',
  ]

  const clotheTypes = [
    'BlazerShirt',
    'BlazerSweater',
    'CollarSweater',
    'GraphicShirt',
    'Hoodie',
    'Overall',
    'ShirtCrewNeck',
    'ShirtScoopNeck',
    'ShirtVNeck',
  ]

  const clotheColors = [
    'Black',
    'Blue01',
    'Blue02',
    'Blue03',
    'Gray01',
    'Gray02',
    'Heather',
    'PastelBlue',
    'PastelGreen',
    'PastelOrange',
    'PastelRed',
    'PastelYellow',
    'Pink',
    'Red',
    'White',
  ]

  const eyeTypes = [
    'Close',
    'Cry',
    'Default',
    'Dizzy',
    'EyeRoll',
    'Happy',
    'Hearts',
    'Side',
    'Squint',
    'Surprised',
    'Wink',
    'WinkWacky',
  ]
  const eyebrowTypes = [
    'Angry',
    'AngryNatural',
    'Default',
    'DefaultNatural',
    'FlatNatural',
    'FrownNatural',
    'RaisedExcited',
    'RaisedExcitedNatural',
    'SadConcerned',
    'SadConcernedNatural',
    'UnibrowNatural',
    'UpDown',
    'UpDownNatural',
  ]

  const mouthTypes = [
    'Concerned',
    'Default',
    'Disbelief',
    'Eating',
    'Grimace',
    'Sad',
    'ScreamOpen',
    'Serious',
    'Smile',
    'Tongue',
    'Twinkle',
    'Vomit',
  ]

  const skinColors = [
    'Tanned',
    'Yellow',
    'Pale',
    'Light',
    'Brown',
    'DarkBrown',
    'Black',
  ]

  const handleChange = (optionName, optionValue) => {
    setAvatarOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: optionValue,
    }))
  }

  return (
    <div className="avatar-editor">
      <div className="avatar">
        <Avatar
          style={{ borderRadius: '50%' }}
          className="mx-auto d-block mb-3"
          {...avatarOptions}
        />
      </div>
      <Form>
        <Row>
          <Col>
            <FloatingLabel controlId="hairType" label="Hair Type">
              <Form.Select
                value={avatarOptions.topType}
                onChange={(e) => handleChange('topType', e.target.value)}
              >
                {hairTypes.map((hairType) => (
                  <option key={hairType} value={hairType}>
                    {hairType}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel controlId="hairColor" label="Hair Color">
              <Form.Select
                value={avatarOptions.hairColor}
                onChange={(e) => handleChange('hairColor', e.target.value)}
              >
                {hairColors.map((hairColor) => (
                  <option key={hairColor} value={hairColor}>
                    {hairColor}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            {' '}
            <FloatingLabel
              controlId="accessoriesType"
              label="Accessories Types"
            >
              <Form.Select
                value={avatarOptions.accessoriesType}
                onChange={(e) =>
                  handleChange('accessoriesType', e.target.value)
                }
              >
                {accessoriesTypes.map((accessoriesType) => (
                  <option key={accessoriesType} value={accessoriesType}>
                    {accessoriesType}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>

          <Col>
            {' '}
            <FloatingLabel controlId="facialHairType" label="Facial Hair Types">
              <Form.Select
                value={avatarOptions.facialHairType}
                onChange={(e) => handleChange('facialHairType', e.target.value)}
              >
                {facialHairTypes.map((facialHairType) => (
                  <option key={facialHairType} value={facialHairType}>
                    {facialHairType}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            {' '}
            <FloatingLabel
              controlId="facialHairColor"
              label="Facial Hair Colors"
            >
              <Form.Select
                value={avatarOptions.facialHairColor}
                onChange={(e) =>
                  handleChange('facialHairColor', e.target.value)
                }
              >
                {facialHairColors.map((facialHairColor) => (
                  <option key={facialHairColor} value={facialHairColor}>
                    {facialHairColor}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>

          <Col>
            {' '}
            <FloatingLabel controlId="clotheColor" label="Clothe Colors">
              <Form.Select
                value={avatarOptions.clotheColor}
                onChange={(e) => handleChange('clotheColor', e.target.value)}
              >
                {clotheColors.map((clotheColor) => (
                  <option key={clotheColor} value={clotheColor}>
                    {clotheColor}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            {' '}
            <FloatingLabel controlId="clotheType" label="Clothe Types">
              <Form.Select
                value={avatarOptions.clotheType}
                onChange={(e) => handleChange('clotheType', e.target.value)}
              >
                {clotheTypes.map((clotheType) => (
                  <option key={clotheType} value={clotheType}>
                    {clotheType}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>

          <Col>
            {' '}
            <FloatingLabel controlId="eyeType" label="Eye Types">
              <Form.Select
                value={avatarOptions.eyeType}
                onChange={(e) => handleChange('eyeType', e.target.value)}
              >
                {eyeTypes.map((eyeType) => (
                  <option key={eyeType} value={eyeType}>
                    {eyeType}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            {' '}
            <FloatingLabel controlId="eyebrowType" label="Eyebrow Types">
              <Form.Select
                value={avatarOptions.eyebrowType}
                onChange={(e) => handleChange('eyebrowType', e.target.value)}
              >
                {eyebrowTypes.map((eyebrowType) => (
                  <option key={eyebrowType} value={eyebrowType}>
                    {eyebrowType}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>

          <Col>
            {' '}
            <FloatingLabel controlId="mouthType" label="Mouth Types">
              <Form.Select
                value={avatarOptions.mouthType}
                onChange={(e) => handleChange('mouthType', e.target.value)}
              >
                {mouthTypes.map((mouthType) => (
                  <option key={mouthType} value={mouthType}>
                    {mouthType}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            {' '}
            <FloatingLabel controlId="skinColor" label="Skin Colors">
              <Form.Select
                value={avatarOptions.skinColor}
                onChange={(e) => handleChange('skinColor', e.target.value)}
              >
                {skinColors.map((skinColor) => (
                  <option key={skinColor} value={skinColor}>
                    {skinColor}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default AvatarComponent
