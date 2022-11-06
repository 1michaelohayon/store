import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = ''

const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    filterInput(state = initialState, action: PayloadAction<string>) {
      const content = action.payload
      return state = content
    },
    resetFilter(state) {
      return state = initialState

    }
  }
})

export const { filterInput, resetFilter } = searchFilterSlice.actions
export default searchFilterSlice.reducer