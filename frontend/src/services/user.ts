import axios from 'axios'
import { CartUpdate } from '../types'
import { apiBaseUrl } from '../constants'
const baseUrl = `${apiBaseUrl}users`



const updateCart = async ({ userId, inCart }: CartUpdate) => {
  const product = {
    product: inCart.product.id,
    amount: inCart.amount
  }
  const response = await axios.put(
    `${baseUrl}/${userId}`, { inCart: product }
  )
  return response.data
}

const userService = {
  updateCart
}
export default userService

