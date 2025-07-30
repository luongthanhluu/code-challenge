export const MESSAGES = {
  LOADING_EXCHANGE_RATES: '🔄 Loading exchange rates from API...',
  SUCCESS_LOADED_CURRENCIES: (count) => `✅ Successfully loaded ${count} currencies with real-time prices!`,
  FAILED_LOAD_EXCHANGE_RATES: '❌ Failed to load exchange rates. Please try again later.',
  CONNECTING_WALLET: '🔗 Connecting to wallet...',
  WALLET_CONNECTED: '✅ Wallet connected successfully!',
  PROCESSING_SWAP: '🔄 Processing swap transaction...',
  SWAP_SUCCESS: (fromAmt, fromCurr, toAmt, toCurr) => 
    `✅ Successfully swapped ${fromAmt.toFixed(6)} ${fromCurr} for ${toAmt.toFixed(6)} ${toCurr}!`,
  SWAP_FAILED: '❌ Swap failed. Please try again.',
  CURRENCIES_SWAPPED: '🔄 Currencies swapped!',
  CHANGED_FROM_CURRENCY: (currency) => `💱 Changed from currency to ${currency}`,
  CHANGED_TO_CURRENCY: (currency) => `💱 Changed to currency to ${currency}`
} 