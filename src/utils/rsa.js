import forge from 'node-forge'
import { Buffer } from 'buffer'
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

export const getPublicKey = () => {
  const publicKeyPem = secureLocalStorage.getItem('publicKey')
  return forge.pki.publicKeyFromPem(publicKeyPem)
}

export const getPrivateKey = () => {
  const privateKeyPem = secureLocalStorage.getItem('privateKey')
  return forge.pki.privateKeyFromPem(privateKeyPem)
}

export const getPublicKeyForSmartContract = () => {
  const publicKeyPem = secureLocalStorage.getItem('publicKey')
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem)

  const publicKeyDer = forge.asn1
    .toDer(forge.pki.publicKeyToAsn1(publicKey))
    .getBytes()
  const publicKeyBytes = Array.from(publicKeyDer, (byte) => byte.charCodeAt(0))
  const publicKeyHex = publicKeyBytes
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')

  return `0x${publicKeyHex}`
}

export const encrypt = (publicKeyFromContract, msg) => {
  console.log('Message: ', msg)

  const publicKeyDer = forge.util.hexToBytes(publicKeyFromContract.slice(2))
  const publicKeyAsn1 = forge.asn1.fromDer(publicKeyDer)
  const publicKey = forge.pki.publicKeyFromAsn1(publicKeyAsn1)

  const encrypted = publicKey.encrypt(msg, 'RSA-OAEP')
  console.log('Encrypted message: ', encrypted)

  const decrypted = getPrivateKey().decrypt(encrypted, 'RSA-OAEP')
  console.log('Decrypted message: ', decrypted)
  return forge.util.encode64(encrypted)
}

export const decrypt = (msg) => {
  const encrypted = forge.util.decode64(msg)
  const decrypted = getPrivateKey().decrypt(encrypted, 'RSA-OAEP')
  return forge.util.decodeUtf8(decrypted)
}
