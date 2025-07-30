import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container
} from '@mui/material'
import { SwapHoriz as SwapIcon } from '@mui/icons-material'
import CurrencySwapForm from './components/CurrencySwapForm'
import { ToastContainer } from 'react-toastify'
import { showToast } from './utils'
import { TOAST_POSITIONS } from './constants'

function App() {

  const showMessage = (message, type = 'info') => {
    showToast(message, type, TOAST_POSITIONS.TOP_RIGHT)
  }

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <SwapIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1.5 }} />
              <Typography variant="h1" component="h1">
                Currency Swap
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Swap your assets between different currencies
            </Typography>
          </Box>

          <CurrencySwapForm onShowMessage={showMessage} />
        </CardContent>
      </Card>

      <ToastContainer
        position={TOAST_POSITIONS.TOP_RIGHT}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        enableMultiContainer={false}
        toastStyle={{
          borderRadius: '16px',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
        }}
      />
    </Container>
  )
}

export default App 