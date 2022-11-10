import axios from 'axios'
import { CartUpdate } from '../types'
import { apiBaseUrl } from '../constants'
import { Credentials } from '../types'

const baseUrl = `${apiBaseUrl}users`


const getUser = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (creds: Credentials) => {
  const response = await axios.post(baseUrl, creds)
  return response.data
}


const updateCart = async ({ userId, inCart }: CartUpdate) => {
  const product = {
    product: inCart.product.id,
    amount: inCart.amount
  }
  const response = await axios.put(
    `${baseUrl}/${userId}/inCart`, { inCart: product }
  )
  return response.data
}



const deleteFromCart = async ({ userId, productId }: { userId: string, productId: string }) => {

  const response = await axios.delete(`${baseUrl}/${userId}/inCart/${productId}`)

  return response.data

}



const userService = {
  updateCart,
  deleteFromCart,
  getUser,
  create
}
export default userService

