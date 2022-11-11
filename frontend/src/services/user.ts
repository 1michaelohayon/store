import axios from 'axios'
import { CartItem, CartListing } from '../types'
import { apiBaseUrl } from '../constants'
import { Credentials } from '../types'

const baseUrl = `${apiBaseUrl}users`

let token: string | null = null
const setToken = (newToken: any) => token = `bearer ${newToken}`


const getUser = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (creds: Credentials) => {
  const response = await axios.post(baseUrl, creds)
  return response.data
}


const updateCart = async (cartItem: CartItem) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(
    `${baseUrl}/inCart`, cartItem, config)

  return response.data
}
const addToCart = async (cartItem: CartItem) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(
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
  updateCart,
  addToCart,
  deleteFromCart,
  getUser,
  create
}
export default userService

