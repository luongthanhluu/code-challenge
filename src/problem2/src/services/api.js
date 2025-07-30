export const fetchExchangeRates = async () => {
  const response = await fetch('https://interview.switcheo.com/prices.json')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}
