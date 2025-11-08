import { toast, ToastOptions } from 'react-toastify'

export const notify = (
  message: string,
  type: 'success' | 'failure' | 'info',
  config?: Partial<ToastOptions>
) => {
  switch (type) {
    case 'success':
      toast.success(message, config)
      break

    case 'failure':
      toast.error(message, config)
      break

    case 'info':
      toast.info(message, config)
      break

    default:
      break
  }
}
