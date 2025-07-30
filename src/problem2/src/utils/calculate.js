
export const processPriceData = (priceData) => {
    const latestPrices = {}
    priceData.forEach(item => {
      const currency = item.currency
      const price = item.price
      const date = new Date(item.date)
      
      if (!latestPrices[currency] || date > new Date(latestPrices[currency].date)) {
        latestPrices[currency] = { price, date: item.date }
      }
    })
    
    return latestPrices
  }
  
  export const calculateExchangeRates = (latestPrices) => {
    const availableCurrencies = Object.keys(latestPrices)
    const rates = {}
    
    availableCurrencies.forEach(from => {
      rates[from] = {}
      availableCurrencies.forEach(to => {
        if (from === to) {
          rates[from][to] = 1
        } else {
          const fromPrice = latestPrices[from].price
          const toPrice = latestPrices[to].price
          rates[from][to] = toPrice / fromPrice
        }
      })
    })
    
    return { rates, currencies: availableCurrencies }
  }
  
  export const calculateSwapAmount = (amount, from, to, exchangeRates) => {
    const rate = exchangeRates[from]?.[to] || 0
    return amount * rate
  } 