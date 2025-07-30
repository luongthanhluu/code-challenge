export const validateSwapForm = (fromVal, toVal, fromCurr, toCurr, userBalances) => {
  const errors = { fromError: '', toError: '' }
  let isValid = true
  
  const amount = parseFloat(fromVal) || 0
  const balance = userBalances[fromCurr] || 0
  
  if (amount <= 0) {
    errors.fromError = 'Please enter a valid amount'
    isValid = false
  } else if (amount > balance) {
    errors.fromError = `Insufficient balance. You have ${balance.toFixed(6)} ${fromCurr}`
    isValid = false
  }
  
  if (fromCurr === toCurr) {
    errors.toError = 'Cannot swap the same currency'
    isValid = false
  }
  
  return { isValid, errors }
}

export const formatAmount = (amount) => {
  return amount > 0 ? amount.toFixed(6) : ''
}

export const formatBalance = (balance) => {
  return balance?.toFixed(6) || '0.0'
}

export const formatExchangeRate = (fromCurrency, toCurrency, exchangeRates) => {
  const rate = exchangeRates[fromCurrency]?.[toCurrency] || 0
  return `1 ${fromCurrency} = ${rate.toFixed(6)} ${toCurrency}`
} 