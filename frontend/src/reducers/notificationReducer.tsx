import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from ".."


import { Notification, NotificationStyle } from "../types"


const placeHolder: Notification = {
  style: NotificationStyle.placeholder,
  message: ""
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: placeHolder,
  reducers: {
    Notify(state: (Notification), action: PayloadAction<Notification>) {
      const test = action.payload
      return state = test
    },
    resetNotification(state) {

      return state = placeHolder

    }
  }
})

export const { Notify, resetNotification } = notificationSlice.actions

let timeoutID: ReturnType<typeof setTimeout>

export const setNotification = (content: string, time: number) => {
  return async (dispatch: AppDispatch) => {
    clearTimeout(timeoutID)
    const timeInMS = time * 1000
    dispatch(Notify({style: NotificationStyle.info, message: content}))

    timeoutID = setTimeout(() => {
      dispatch(resetNotification())
    }, timeInMS)

  }
}

export const setSuccesfulNotification = (content: string, time: number) => {
  return async (dispatch: AppDispatch) => {
    clearTimeout(timeoutID)
    const timeInMS = time * 1000
    dispatch(Notify({style: NotificationStyle.success, message: content}))

    timeoutID = setTimeout(() => {
      dispatch(resetNotification())
    }, timeInMS)

  }
}
export const setErrorfulNotification = (content: string, time: number) => {
  return async (dispatch: AppDispatch) => {
    clearTimeout(timeoutID)
    const timeInMS = time * 1000
    dispatch(Notify({style: NotificationStyle.error, message: content}))

    timeoutID = setTimeout(() => {
      dispatch(resetNotification())
    }, timeInMS)

  }
}
export default notificationSlice.reducer
