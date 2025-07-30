import { toast } from 'react-toastify'

export const createToastId = (message, type = 'info') => {
  return `${type}-${message.replace(/[^a-zA-Z0-9]/g, '')}`
}

export const getToastOptions = (position = 'top-right') => {
  return {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }
}

export const showToast = (message, type = 'info', position = 'top-right') => {
  const toastId = createToastId(message, type)
  const options = { ...getToastOptions(position), toastId }
  
  switch (type) {
    case 'success':
      toast.success(message, options)
      break
    case 'error':
      toast.error(message, options)
      break
    case 'warning':
      toast.warning(message, options)
      break
    default:
      toast.info(message, options)
  }
}

export const showLoadingToast = (message) => {
  return showToast(message, 'info')
}

export const showSuccessToast = (message) => {
  return showToast(message, 'success')
}

export const showErrorToast = (message) => {
  return showToast(message, 'error')
}

export const showWarningToast = (message) => {
  return showToast(message, 'warning')
} 