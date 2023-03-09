const isMetaMaskInstalled = () => {
  return typeof window.ethereum !== 'undefined'
}

export default isMetaMaskInstalled
