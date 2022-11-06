import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from ".."


type notification = null | string


const notificationSlice = createSlice({
  name: 'notifications',
  initialState: "",
  reducers: {
    voteNotification(state: notification, action: PayloadAction<string>) {

      return state = action.payload
    },
    resetNotification(state) {

      return state = ""

    }
  }
})

export const { voteNotification, resetNotification } = notificationSlice.actions

let timeoutID: ReturnType<typeof setTimeout>

export const setNotification = (content: string, time: number) => {
  return async (dispatch: AppDispatch) => {
    clearTimeout(timeoutID)
    const timeInMS = time * 1000
    dispatch(voteNotification(content))

    timeoutID = setTimeout(() => {
      dispatch(resetNotification())
    }, timeInMS)

  }
}

export default notificationSlice.reducer
