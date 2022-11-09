import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import loginService from '../services/login'
import { AppDispatch } from ".."
import { Credentials, User } from "../types"
import userService from "../services/user"
import { setSuccesfulNotification, setErrorfulNotification } from "./notificationReducer"
import { AxiosError } from 'axios';



const userSlice = createSlice({
  name: 'user',
  initialState: null as (null | User),
  reducers: {
    setUser(_state, action: PayloadAction<User>) {
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
      dispatch(setErrorfulNotification('Wrong username or password', 5))
    }
  }
}

export const register = (creds: Credentials) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await userService.create(creds)
      console.log(res.username, creds.username, creds.username === res.username)
      if (res.username === creds.username) {
        await dispatch(logIn(creds))
        dispatch(setSuccesfulNotification(`Success! Welcome ${creds.username}`, 7))
      }
    } catch (error: any | AxiosError) {
      let errorMessage = "something bad happpend..."
      if (error) {
        errorMessage = error.response.data.error.toString()
      }
      dispatch(setErrorfulNotification('Error: ' + errorMessage, 5))
    }
  }
}

export default userSlice.reducer