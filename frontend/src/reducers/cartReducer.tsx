import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../types"
import { AppDispatch } from ".."
import { CartListing } from "../types"
import { CartUpdate } from "../types"
import userService from "../services/user"


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

export const addToUserCart = (update: { userId: string, product: Product }) => {
  const cartUpdate = {
    userId: update.userId,
    inCart: { product: update.product, amount: 1 }
  }
  return async (dispatch: AppDispatch) => {
    dispatch(addProductToUser(cartUpdate))
  }
}

export const removeInUserCart = (update: { userId: string, product: Product }) => {
  const cartUpdate = {
    userId: update.userId,
    inCart: { product: update.product, amount: 1 }
  }
  return async (dispatch: AppDispatch) => {
    dispatch(removeFromUserCart(cartUpdate))
  }
}


export const setUserCart = (cart: CartListing[]) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setCart(cart))
  }
}
export default cartSlice.reducer