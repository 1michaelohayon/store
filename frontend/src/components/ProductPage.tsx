import { Product } from "../types";
import { addToCart } from "../reducers/cartReducer"
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer"
import { AppDispatch } from "..";
import { RootState } from ".."


interface Props {
  product: Product
}

const ProductPage = ({ product }: Props) => {
  const dispatch: AppDispatch = useDispatch()
  const cart = useSelector(
    (state: RootState) => state.cart)

  const inCart = cart.find(c => c.product.id === product.id)
  
  const responsiveStock = inCart ? product.stock - inCart.amount : product.stock

  const handleAddToCart = (product: Product) => {
    if (responsiveStock){
      dispatch(addToCart(product))
      dispatch(setNotification(`${product.name} added to cart.`, 3))
    } else {
      dispatch(setNotification(`${product.name} is out of stock`, 3))

    }
  }


  return <>
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <p>{product.specifications?.dimensions}</p>
    <p>{product.specifications?.weight}</p>
    <p>{responsiveStock}</p>
    <p>{product.type}</p>
    <button onClick={() =>handleAddToCart(product)}>add to cart</button>
  </>
}

export default ProductPage