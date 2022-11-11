import Main from "./components/Main";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeProducts } from './reducers/productReducer'
import { AppDispatch } from ".";
import AppBar from "./components/AppBar";
import Cart from "./components/Cart";
import SignIn from "./components/SiginIn";
import SignUp from "./components/SignUp";
import ProductPage from "./components/ProductPage";
import { useSelector } from "react-redux";
import { RootState } from ".";
import { useFetchUser } from "./hooks";
import { useLogout } from "./hooks";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import style from "./theme/notification"
import { NotificationStyle } from "./types";
import { AppContainer } from "./theme";
const { Success, Info, Error, PlaceHolder } = style

const App = () => {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeProducts())
  }, [dispatch])

  useFetchUser()

  const notification = useSelector(
    (state: RootState) => state.notification)

  const products = useSelector(
    (state: RootState) => state.products)


  const productsRoutes = products.map(
    p => <Route key={p.id} path={`/${p.type}/${p.id}`} element={<ProductPage product={p} />} />
  )

  return (
    <AppContainer>
      <AppBar />
      {notification.style === NotificationStyle.placeholder
        ? <PlaceHolder></PlaceHolder>
        : notification.style === NotificationStyle.success
          ? <Success>{notification.message}</Success>
          : notification.style === NotificationStyle.error
            ? <Error>{notification.message}</Error>
            : <Info>{notification.message}</Info>
      }

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/logout" element={<Logout />} />
        {productsRoutes}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContainer>
  )
}
export default (
  <Router>
    < App />
  </Router>
);


const Logout = () => {
  useLogout()
  return <></>
}