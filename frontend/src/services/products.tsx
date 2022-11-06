import axios from "axios";
import { Product } from "../types";
import { apiBaseUrl } from "../constants"
const baseUrl = `${apiBaseUrl}products`

const getAll = async () => {
  const response = await axios.get<Product[]>(baseUrl)
  return response.data
}

const create = async (newProduct: Product) => {
  const response = await axios.post<Product>(baseUrl, newProduct)
  return response.data

}


const productsService = {
  getAll,
  create
}

export default productsService