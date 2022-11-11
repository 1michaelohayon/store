import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product, User } from "../types"
import { AppDispatch } from ".."
import { CartListing } from "../types"
import userService from "../services/user"
import { setNotification, setErrorfulNotification, setSuccesfulNotification } from "./notificationReducer"
import { handleManyRequests } from "../util"


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

    },
    setCart: (_state, action: PayloadAction<CartListing[]>) => {
      return action.payload
    }
  },

})

export const { addProduct, removeProduct, setCart } = cartSlice.actions


export const setUserCart = (cart: CartListing[]) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setCart(cart))
  }
}



export const addToCart = (user: (User | null), responsiveStock: number, alreadyInCart: any, product: Product) => {
  return async (dispatch: AppDispatch) => {

    if (responsiveStock) {
      if (user) {
        try {
          userService.setToken(user.token)
          const update = alreadyInCart
            ? await userService.updateCart({ product: alreadyInCart.product.id, amount: alreadyInCart.amount + 1 })
            : await userService.addToCart({ product: product.id, amount: 1 })
          dispatch(setCart(update))
        } catch (error) {
          console.log(error);
        }
      } else {
        dispatch(addProduct({ product, amount: 1 }))
      }

      await dispatch(setSuccesfulNotification(`${product.name} added to cart.`, 3))

    } else {
      dispatch(setErrorfulNotification(`${product.name} is out of stock`, 3))

    }
  }
}


export const removeFromCart = (user: (User | null), product: Product, amount: number) => {
  return async (dispatch: AppDispatch) => {
    if (user) {
      userService.setToken(user.token)
      const update = amount > 1
        ? await userService.updateCart({ product: product.id, amount: amount - 1 })
        : await userService.deleteFromCart(product.id)

      console.log(update ? true : false)
      
      update ?  dispatch(setCart(update)) : dispatch(removeProduct({ product, amount }))

    } else {
      dispatch(removeProduct({ product, amount }))

    }
    dispatch(setNotification(`${product.name} removed.`, 3))
  }
}



export default cartSlice.reducer

