import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartItem, Product, User } from "../types"
import { AppDispatch } from ".."
import { CartListing } from "../types"
import userService from "../services/user"
import { setNotification, setErrorfulNotification, setSuccesfulNotification } from "./notificationReducer"


const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartListing[],
  reducers: {
    setCart: (_state, action: PayloadAction<CartListing[]>) => {
      return action.payload.sort()
    },
    clearCart: (state) => {
      return state = []
    }
  },

})

export const { setCart, clearCart } = cartSlice.actions

export const setUserCart = (cart: CartListing[]) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setCart(cart))
  }
}



export const addToCart = (user: (User | null), responsiveStock: number, product: Product, cart: CartListing[]) => {
  return async (dispatch: AppDispatch) => {
    if (responsiveStock) {
      const findDuplicate = (product: Product) => cart.find((c: CartListing) => c.product.id === product.id);

      const productInCart = findDuplicate(product)
      const filteredCart: CartListing[] = cart
        .filter((c: CartListing) => c?.product.id !== product.id)

      const newCart: CartListing[] = productInCart
        ? [{ product: productInCart.product, amount: productInCart.amount + 1 }, ...filteredCart,]
        : [{ product, amount: 1 }, ...filteredCart]


      if (user) {
        try {
          userService.setToken(user.token)
          const userCart: CartItem[] = newCart
            .map((c: CartListing) => { return { product: c.product.id, amount: c.amount } })

          const update: CartListing[] = await userService.setCart(userCart)
          dispatch(setCart(update))

        } catch (error) {
          console.log(error);
        }
      } else {
        dispatch(setCart(newCart))
      }
      await dispatch(setSuccesfulNotification(`${product.name} added to cart.`, 3))
    } else {
      dispatch(setErrorfulNotification(`${product.name} is out of stock`, 3))

    }
  }
}


export const removeFromCart = (user: (User | null), product: Product, cart: CartListing[]) => {
  const findDuplicate = (product: Product) => cart.find((c: CartListing) => c.product.id === product.id);
  const productInCart = findDuplicate(product)
  const filteredCart: CartListing[] = cart
    .filter((c: CartListing) => c?.product.id !== product.id)

  const newCart: CartListing[] = productInCart && productInCart.amount > 1
    ? [{ product: productInCart.product, amount: productInCart.amount - 1 }, ...filteredCart]
    : filteredCart



  return async (dispatch: AppDispatch) => {
    if (user) {
      try {
        userService.setToken(user.token)
        const userCart: CartItem[] = newCart
          .map((c: CartListing) => { return { product: c.product.id, amount: c.amount } })
        const update = await userService.setCart(userCart)
        dispatch(setCart(update))

      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(setCart(newCart))
    }
    dispatch(setNotification(`${product.name} removed.`, 3))
  }
}



export default cartSlice.reducer

