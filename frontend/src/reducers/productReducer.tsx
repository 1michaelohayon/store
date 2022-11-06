import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import productsService from "../services/products"
import { Product } from "../types"
import { AppDispatch } from ".."


const productSlice = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {
    setProducts: (_state, action: PayloadAction<Product[]>) => {
      return (action.payload)
    },
  },
})

export const { setProducts } = productSlice.actions


export const initializeProducts = () => {
  return async (dispatch: AppDispatch) => {
    const products: Product[] = await productsService.getAll()
    dispatch(setProducts(products))
  }
}


export default productSlice.reducer