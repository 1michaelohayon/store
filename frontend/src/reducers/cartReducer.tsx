import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../types"
import { AppDispatch } from ".."
import { CartListing } from "../types"


const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartListing[],
  reducers: {
    addProduct: (state, action: PayloadAction<CartListing>) => {
      const cartListing = action.payload
      const findDuplicate = (listing: CartListing) => state.find(c => c.product.id === listing.product.id);
      const productInCart = findDuplicate(cartListing)

      productInCart
        ? productInCart.amount += cartListing.amount
        : state.push(cartListing);

    },
    removeProduct: (state, action: PayloadAction<CartListing>) => {
      const productId = action.payload.product.id
      const target = state.find(c => c.product.id === productId)

      if (target && target.amount > 1) {
        target.amount--

      } else if (target && target.amount <= 1) {
        const removedFromCart = state.filter(c => c.product.id !== productId)
        return state = removedFromCart
      }

    }
  },
})

export const { addProduct, removeProduct } = cartSlice.actions


export const addToCart = (product: Product) => {
  return async (dispatch: AppDispatch) => {
    dispatch(addProduct({ product, amount: 1 }))
  }
}

export const removeFromCart = (product: CartListing) => {
  return async (dispatch: AppDispatch) => {
    dispatch(removeProduct(product))
  }
}

export default cartSlice.reducer