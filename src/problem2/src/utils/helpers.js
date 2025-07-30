export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const parseFloatSafe = (value) => {
  return parseFloat(value) || 0
}

export const isPositiveNumber = (value) => {
  const num = parseFloatSafe(value)
  return num > 0
}

export const roundToDecimals = (value, decimals = 6) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

export const getTokenIconPath = (currency) => {
  return `tokens/${currency}.svg`
}

export const getButtonText = (isWalletConnected, fromAmount, fromError, toError) => {
  if (!isWalletConnected) return 'Connect Wallet'
  if (!fromAmount) return 'Enter Amount'
  if (fromError || toError) return 'Invalid Input'
  return 'Confirm Swap'
}

export const isFormValid = (isWalletConnected, fromAmount, fromError, toError) => {
  return isWalletConnected && fromAmount && !fromError && !toError
} 