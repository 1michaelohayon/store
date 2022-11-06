import Main from "./components/Main";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeProducts } from './reducers/productReducer'
import { AppDispatch } from ".";
import AppBar from "./components/AppBar";
import Cart from "./components/Cart";
import SignIn from "./components/SiginIn";
import ProductPage from "./components/ProductPage";
import { useSelector } from "react-redux";
import { RootState } from ".";
import { assignUser } from "./reducers/userReducer";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


const App = () => {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const loggedUnderJSON = window.localStorage.getItem('loggedStoreUser')
    if (loggedUnderJSON) {
      const user = JSON.parse(loggedUnderJSON)
      dispatch(assignUser(user))
    }
  }, [dispatch])



  useEffect(() => {
    dispatch(initializeProducts())
  }, [dispatch])

  const notification = useSelector(
    (state: RootState) => state.notification)

  const products = useSelector(
    (state: RootState) => state.products)


  const productsRoutes = products.map(
    p => <Route key={p.id} path={`/${p.type}/${p.id}`} element={<ProductPage product={p} />} />
  )

  return (
    <>
      <AppBar />
      {notification}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/cart" element={<Cart />} />
        {productsRoutes}
      </Routes>
    </>
  )
}
export default (
  <Router>
    < App />
  </Router>
);
