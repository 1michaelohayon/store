import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import loginService from '../services/login'
import { AppDispatch } from ".."
import {  Credentials, User} from "../types"
import { setNotification } from "./notificationReducer"





const userSlice = createSlice({
  name: 'user',
  initialState: null as (null | User),
  reducers: {
    setUser(_state, action:PayloadAction<User>) {
      return action.payload
    },
    clearUser(state) {
      return (state = null)
    },
  },
})

export const { setUser, clearUser } = userSlice.actions


export const assignUser = (user: User) => {
  return (dispatch: AppDispatch) => {
    dispatch(setUser(user))
    //...Service.setToken(user.token)
  }
}
export const logout = () => {
  return (dispatch: AppDispatch) => {
    window.localStorage.removeItem('loggedStoreUser')
    dispatch(clearUser())
  }
}

export const logIn = (loginObject: Credentials) => {
  return async (dispatch: AppDispatch) => {
    try {
      const user: User = await loginService.login(loginObject)
      window.localStorage.setItem('loggedStoreUser', JSON.stringify(user))
      dispatch(assignUser(user))
    } catch (error) {
      dispatch(setNotification('wrong username or password', 3))
    }
  }
}

export default userSlice.reducer