import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  Avatar,
  IconButton,
  Paper,
  CircularProgress,
} from '@mui/material'
import {
  KeyboardArrowDown as ArrowDownIcon,
  SwapVert as SwapIcon,
  AccountBalanceWallet as WalletIcon,
} from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import {
  fetchExchangeRates,
} from '../services'

import {
  processPriceData,
  calculateExchangeRates,
  calculateSwapAmount,
  validateSwapForm,
  formatAmount,
  formatBalance,
  formatExchangeRate,
  sleep,
  parseFloatSafe,
  getTokenIconPath,
  getButtonText,
  isFormValid
} from '../utils'

import {
  DEFAULT_CURRENCIES,
  DEFAULT_USER_BALANCES,
  MESSAGES,
  ANIMATION_DELAYS
} from '../constants'

const CurrencySwapForm = ({ onShowMessage }) => {
  const theme = useTheme()
  
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [exchangeRates, setExchangeRates] = useState({})
  const [userBalances, setUserBalances] = useState({})
  const [currencies, setCurrencies] = useState([])
  
  const [fromCurrency, setFromCurrency] = useState(DEFAULT_CURRENCIES.FROM)
  const [toCurrency, setToCurrency] = useState(DEFAULT_CURRENCIES.TO)
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  
  const [fromError, setFromError] = useState('')
  const [toError, setToError] = useState('')

  const loadExchangeRates = async () => {
    try {
      onShowMessage(MESSAGES.LOADING_EXCHANGE_RATES, 'info')
      
      const priceData = await fetchExchangeRates()
      const latestPrices = processPriceData(priceData)
      const { rates, currencies: availableCurrencies } = calculateExchangeRates(latestPrices)
      
      setCurrencies(availableCurrencies)
      setExchangeRates(rates)
      
      if (availableCurrencies.includes(DEFAULT_CURRENCIES.FROM) && availableCurrencies.includes(DEFAULT_CURRENCIES.TO)) {
        setFromCurrency(DEFAULT_CURRENCIES.FROM)
        setToCurrency(DEFAULT_CURRENCIES.TO)
      }
      
      onShowMessage(MESSAGES.SUCCESS_LOADED_CURRENCIES(availableCurrencies.length), 'success')
      
    } catch (error) {
      console.error('Failed to load exchange rates:', error)
      onShowMessage(MESSAGES.FAILED_LOAD_EXCHANGE_RATES, 'error')
    }
  }

  const simulateWalletConnection = async () => {
    onShowMessage(MESSAGES.CONNECTING_WALLET, 'info')
    await sleep(ANIMATION_DELAYS.WALLET_CONNECTION)
    
    setIsWalletConnected(true)
    setUserBalances(DEFAULT_USER_BALANCES)
    onShowMessage(MESSAGES.WALLET_CONNECTED, 'success')
  }



  const handleFromAmountChange = (value) => {
    setFromAmount(value)
    const amount = parseFloatSafe(value)
    const calculated = calculateSwapAmount(amount, fromCurrency, toCurrency, exchangeRates)
    setToAmount(formatAmount(calculated))
    validateForm(value, toAmount, fromCurrency, toCurrency)
  }

  const handleToAmountChange = (value) => {
    setToAmount(value)
    const amount = parseFloatSafe(value)
    const calculated = calculateSwapAmount(amount, toCurrency, fromCurrency, exchangeRates)
    setFromAmount(formatAmount(calculated))
    validateForm(fromAmount, value, fromCurrency, toCurrency)
  }

  const handleFromCurrencyChange = (currency) => {
    if (currency !== fromCurrency) {
      onShowMessage(MESSAGES.CHANGED_FROM_CURRENCY(currency), 'info')
    }
    
    setFromCurrency(currency)
    if (fromAmount) {
      const calculated = calculateSwapAmount(parseFloatSafe(fromAmount), currency, toCurrency, exchangeRates)
      setToAmount(formatAmount(calculated))
    }
    validateForm(fromAmount, toAmount, currency, toCurrency)
  }

  const handleToCurrencyChange = (currency) => {
    if (currency !== toCurrency) {
      onShowMessage(MESSAGES.CHANGED_TO_CURRENCY(currency), 'info')
    }
    
    setToCurrency(currency)
    if (fromAmount) {
      const calculated = calculateSwapAmount(parseFloatSafe(fromAmount), fromCurrency, currency, exchangeRates)
      setToAmount(formatAmount(calculated))
    }
    validateForm(fromAmount, toAmount, fromCurrency, currency)
  }

  const swapCurrencies = () => {
    const tempCurrency = fromCurrency
    const tempAmount = fromAmount
    
    setFromCurrency(toCurrency)
    setToCurrency(tempCurrency)
    setFromAmount(toAmount)
    setToAmount(tempAmount)
    
    validateForm(toAmount, tempAmount, toCurrency, tempCurrency)
    onShowMessage(MESSAGES.CURRENCIES_SWAPPED, 'info')
  }

  const validateForm = (fromVal, toVal, fromCurr, toCurr) => {
    const { isValid, errors } = validateSwapForm(fromVal, toVal, fromCurr, toCurr, userBalances)
    setFromError(errors.fromError)
    setToError(errors.toError)
    return isValid
  }

  const performSwap = async () => {
    if (!validateForm(fromAmount, toAmount, fromCurrency, toCurrency)) {
      return
    }
    
    setIsLoading(true)
    onShowMessage(MESSAGES.PROCESSING_SWAP, 'info')
    
    try {
      await sleep(ANIMATION_DELAYS.SWAP_PROCESSING)
      
      const fromAmt = parseFloatSafe(fromAmount)
      const toAmt = parseFloatSafe(toAmount)
      
      setUserBalances(prev => ({
        ...prev,
        [fromCurrency]: prev[fromCurrency] - fromAmt,
        [toCurrency]: prev[toCurrency] + toAmt
      }))
      
      onShowMessage(MESSAGES.SWAP_SUCCESS(fromAmt, fromCurrency, toAmt, toCurrency), 'success')
      
      setFromAmount('')
      setToAmount('')
      setFromError('')
      setToError('')
      
    } catch (error) {
      onShowMessage(MESSAGES.SWAP_FAILED, 'error')
    } finally {
      setIsLoading(false)
    }
  }





  useEffect(() => {
    loadExchangeRates()
    simulateWalletConnection()
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="body2" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary' }}>
          You Pay
        </Typography>
        <Paper sx={{ p: 2.5, backgroundColor: '#f8fafc', border: '2px solid #e2e8f0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={getTokenIconPath(fromCurrency)}
              alt={fromCurrency}
              sx={{ width: 32, height: 32, mr: 1.5 }}
            />
            <FormControl fullWidth>
              <Select
                value={fromCurrency}
                onChange={(e) => handleFromCurrencyChange(e.target.value)}
                IconComponent={ArrowDownIcon}
                sx={{ '& .MuiSelect-select': { py: 1 } }}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField
            fullWidth
            type="number"
            value={fromAmount}
            onChange={(e) => handleFromAmountChange(e.target.value)}
            placeholder="0.0"
            variant="outlined"
            error={!!fromError}
            helperText={fromError}
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Balance:
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {formatBalance(userBalances[fromCurrency])}
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', my: -1.5, position: 'relative', zIndex: 2 }}>
        <IconButton
          onClick={swapCurrencies}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            width: 48,
            height: 48,
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            '&:hover': {
              backgroundColor: 'primary.dark',
              transform: 'scale(1.1)',
              boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
            },
          }}
        >
          <SwapIcon />
        </IconButton>
      </Box>

      <Box>
        <Typography variant="body2" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary' }}>
          You Receive
        </Typography>
        <Paper sx={{ p: 2.5, backgroundColor: '#f8fafc', border: '2px solid #e2e8f0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={getTokenIconPath(toCurrency)}
              alt={toCurrency}
              sx={{ width: 32, height: 32, mr: 1.5 }}
            />
            <FormControl fullWidth>
              <Select
                value={toCurrency}
                onChange={(e) => handleToCurrencyChange(e.target.value)}
                IconComponent={ArrowDownIcon}
                sx={{ '& .MuiSelect-select': { py: 1 } }}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField
            fullWidth
            type="number"
            value={toAmount}
            onChange={(e) => handleToAmountChange(e.target.value)}
            placeholder="0.0"
            variant="outlined"
            error={!!toError}
            helperText={toError}
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Balance:
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {formatBalance(userBalances[toCurrency])}
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Paper sx={{ p: 2, backgroundColor: '#f1f5f9' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Exchange Rate:
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatExchangeRate(fromCurrency, toCurrency, exchangeRates)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Slippage:
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              0.5%
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Button
        variant="contained"
        size="large"
        onClick={performSwap}
        disabled={!isFormValid(isWalletConnected, fromAmount, fromError, toError) || isLoading}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <WalletIcon />}
        sx={{
          py: 1.5,
          fontSize: 18,
          fontWeight: 600,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        {getButtonText(isWalletConnected, fromAmount, fromError, toError)}
      </Button>
    </Box>
  )
}

export default CurrencySwapForm 