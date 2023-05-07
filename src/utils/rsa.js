import forge from 'node-forge'

const generateKeys = () => {
  const {
    rsa: { generateKeyPair },
    privateKeyToPem,
    publicKeyToPem,
  } = forge.pki

  const { privateKey, publicKey } = generateKeyPair({ bits: 2048, workers: 2 })

  return {
    privateKey,
    publicKey,
  }
}

export const generateKeysAndSaveToLocalStorage = () => {
  const { privateKey, publicKey } = generateKeys()

  localStorage.setItem('privateKey', privateKey)
  localStorage.setItem('publicKey', publicKey)
}

export const getPublicKey = () => localStorage.getItem('publicKey')

export const getPrivateKey = () => localStorage.getItem('privateKey')

export const encript = (msg) => getPublicKey().encypt(msg)

export const decript = (msg) => getPrivateKey().decript(msg)
