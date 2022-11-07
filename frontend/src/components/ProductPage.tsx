import { Product } from "../types";
import { addToCart } from "../reducers/cartReducer"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "..";
import { RootState } from ".."
import { useResponsiveStock } from "../hooks";

interface Props {
  product: Product
}

const ProductPage = ({ product }: Props) => {
  const dispatch: AppDispatch = useDispatch()
  const responsiveStock = useResponsiveStock(product)

  const user = useSelector(
    (state: RootState) => state.user)

  const handleAddToCart = () => dispatch(addToCart(user, responsiveStock, product))


  return <>
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <p>{product.specifications?.dimensions}</p>
    <p>{product.specifications?.weight}</p>
    <p>{responsiveStock}</p>
    <p>{product.type}</p>
    <button onClick={() => handleAddToCart()}>add to cart</button>
  </>
}

export default ProductPage