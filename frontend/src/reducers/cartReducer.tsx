import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product, User } from "../types"
import { AppDispatch } from ".."
import { CartListing } from "../types"
import { CartUpdate } from "../types"
import userService from "../services/user"
import { setNotification } from "./notificationReducer"
import { useResponsiveStock } from "../hooks"

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
    addProductToUser: (state, action: PayloadAction<CartUpdate>) => {
      const update = action.payload

      const findDuplicate = (listing: CartListing) => state.find(c => c.product.id === listing.product.id);
      const productInCart = findDuplicate(update.inCart)

      if (productInCart) {
        productInCart.amount += update.inCart.amount
        update.inCart.amount = productInCart.amount
      } else {
        state.push(update.inCart);
      }
      userService.updateCart(update)
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

    },
    removeFromUserCart: (state, action: PayloadAction<CartUpdate>) => {
      const update = action.payload
      const productId = update.inCart.product.id
      const target = state.find(c => c.product.id === productId)

      if (target && target.amount > 1) {
        target.amount--
        update.inCart.amount = target.amount
        userService.updateCart(update)
      } else if (target && target.amount <= 1) {
        const removedFromCart = state.filter(c => c.product.id !== productId)
        userService.deleteFromCart({ userId: update.userId, productId: productId })
        return state = removedFromCart
      }

    },
    setCart: (_state, action: PayloadAction<CartListing[]>) => {
      return action.payload
    }
  },

})

export const { addProduct, removeProduct, setCart, addProductToUser, removeFromUserCart } = cartSlice.actions


export const setUserCart = (cart: CartListing[]) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setCart(cart))
  }
}

export const addToCart = (user: (User | null), responsiveStock: number, product: Product) => {
  return async (dispatch: AppDispatch) => {
    if (responsiveStock) {

      if (user) {
        const cartUpdate = {
          userId: user.id,
          inCart: { product: product, amount: 1 }
        }
        dispatch(addProductToUser(cartUpdate))

      } else {
        dispatch(addProduct({ product, amount: 1 }))
      }

      await dispatch(setNotification(`${product.name} added to cart.`, 3))

    } else {
      dispatch(setNotification(`${product.name} is out of stock`, 3))

    }
  }
}


export const removeFromCart = (user: (User | null), product: Product, amount: number) => {
  return async (dispatch: AppDispatch) => {
    if (user) {
      const cartUpdate = {
        userId: user.id,
        inCart: { product: product, amount: 1 }
      }
      dispatch(removeFromUserCart(cartUpdate))
    } else {
      dispatch(removeProduct({ product, amount }))

    }
    dispatch(setNotification(`${product.name} removed.`, 3))
  }
}



export default cartSlice.reducer

