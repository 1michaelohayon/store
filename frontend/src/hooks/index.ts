import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { assignUser } from "../reducers/userReducer"
import { setUserCart } from "../reducers/cartReducer"
import userService from "../services/user"
import { AppDispatch, RootState } from ".."
import { useNavigate } from "react-router-dom"
import { Product } from "../types"
import { logout } from "../reducers/userReducer"


export const useFetchUser = () => {
  const dispatch: AppDispatch = useDispatch()


  useEffect(() => {
    const loggedUnderJSON = window.localStorage.getItem('loggedStoreUser')
    if (loggedUnderJSON) {
      const user = JSON.parse(loggedUnderJSON)
      dispatch(assignUser(user))
      const setCart = async () => {
        const getUpdatedUser = await userService.getUser(user.id)
        await dispatch(setUserCart(getUpdatedUser.inCart))
      }
      setCart()
    }
  }, [dispatch])


}

export const useFetchUserAndNavigate = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(
    (state: RootState) => state.user)


  useEffect(() => {
    if (user) {
      navigate("/")
      const setCart = async () => {
        const getUpdatedUser = await userService.getUser(user.id)
        await dispatch(setUserCart(getUpdatedUser.inCart))
      }
      setCart()
    }
  }, [dispatch, navigate, user])
}



export const useResponsiveStock = (product: Product) => {
  const cart = useSelector(
    (state: RootState) => state.cart)

  const addedToCart = cart.find(c => c.product.id === product.id)
  const responsiveStock = addedToCart ? product.stock - addedToCart.amount : product.stock

  return responsiveStock

}

export const useLogout = () => {

  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    navigate("/")
    dispatch(logout())
  }, [dispatch, navigate])
}