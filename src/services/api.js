import axios from 'axios'
import {StatusCodes} from 'http-status-codes'
import {toast} from 'react-toastify'

const BASE_URL = 'https://api.cyberbox.art/api/v1/'
const TIMEOUT = 15000

const ErrorCodeMapping = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true
}

const shouldDisplayError = (response) => ErrorCodeMapping[response.status]

export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  })

  api.interceptors.response.use((response) => response,
    (error) => {
      if (error.response && shouldDisplayError(error.response)) toast.warn(error.response.data.error)
      throw error
    }
  )

  return api
}


