import axios from 'axios'
import { CartItem } from '../types'
import { apiBaseUrl } from '../constants'
import { Credentials } from '../types'

const baseUrl = `${apiBaseUrl}users`

let token: string | null = null
const setToken = (newToken: string) => token = `bearer ${newToken}`


const getUser = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (creds: Credentials) => {
  const response = await axios.post(baseUrl, creds)
  return response.data
}


const setCart = async (cartItem: CartItem[]) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(
    `${baseUrl}/inCart`, cartItem, config)

  return response.data
}

const deleteFromCart = async (productId: string) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/inCart/${productId}`, config)
  return response.data

}



const userService = {
  setToken,
  deleteFromCart,
  getUser,
  create,
  setCart
}
export default userService

