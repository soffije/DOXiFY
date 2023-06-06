import forge from 'node-forge'
import secureLocalStorage from 'react-secure-storage'

const rsa = forge.pki.rsa

const generateKeys = () => {
  const { publicKey, privateKey } = rsa.generateKeyPair({
    bits: 2048,
    e: 0x10001,
  })

  return {
    publicKey,
    privateKey,
  }
}

export const generateKeysAndSaveToLocalStorage = () => {
  const publicKeyExists = secureLocalStorage.getItem('publicKey') !== null
  const privateKeyExists = secureLocalStorage.getItem('privateKey') !== null

  if (publicKeyExists && privateKeyExists) return

  const { privateKey, publicKey } = generateKeys()
  const privateKeyPem = forge.pki.privateKeyToPem(privateKey)
  const publicKeyPem = forge.pki.publicKeyToPem(publicKey)
  secureLocalStorage.setItem('publicKey', publicKeyPem)
  secureLocalStorage.setItem('privateKey', privateKeyPem)
}

export const getPublicKey = () => secureLocalStorage.getItem('publicKey')

export const getPrivateKey = () => {
  const privateKeyPem = secureLocalStorage.getItem('privateKey')
  return forge.pki.privateKeyFromPem(privateKeyPem)
}

export const encrypt = (publicKeyFromContract, msg) =>
  forge.pki.publicKeyFromPem(publicKeyFromContract).encrypt(msg, 'RSA-OAEP')

export const decrypt = (msg) => getPrivateKey().decrypt(msg, 'RSA-OAEP')
