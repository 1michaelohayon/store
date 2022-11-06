import { Product } from "../types";
import { addToCart } from "../reducers/cartReducer"
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer"
import { AppDispatch } from "..";


interface Props {
  product: Product
}

const ProductPage = ({ product }: Props) => {
  const dispatch: AppDispatch = useDispatch()

  const handleAddToCart = (product: Product) => {

    dispatch(addToCart(product))
    dispatch(setNotification(`${product.name} added to cart.`, 3))
  }


  return <>
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <p>{product.specifications?.dimensions}</p>
    <p>{product.specifications?.weight}</p>
    <p>{product.stock}</p>
    <p>{product.type}</p>
    <button onClick={() =>handleAddToCart(product)}>add to cart</button>
  </>
}

export default ProductPage