import axios from 'axios'
import {StatusCodes} from 'http-status-codes'
import {toast} from 'react-toastify'

const BASE_URL = 'http://ec2-3-89-222-10.compute-1.amazonaws.com:8082/api/v1/'
const TIMEOUT = 5000

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


