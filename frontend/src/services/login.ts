import axios from 'axios'
import { Credentials } from '../types'
import { apiBaseUrl } from '../constants'
const baseUrl = `${apiBaseUrl}login`


const login = async (credentials: Credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
const loginService = { login }
export default loginService 

