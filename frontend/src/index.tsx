import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'

import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer'
import notificationSlice from './reducers/notificationReducer'
import searchFilterReducer from './reducers/searchFilterReducer'
import userReducer from './reducers/userReducer'


const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    notification: notificationSlice,
    searchFilter: searchFilterReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

console.log('inital store state', store.getState())

store.subscribe(() => {
  const storeNow = store.getState()
  console.log('storeNow:', storeNow)
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    {App}
  </Provider>
);


//reportWebVitals();
