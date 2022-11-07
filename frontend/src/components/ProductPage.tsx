import { CartUpdate, Product, cartItem } from "../types";
import { addToCart, updateUserCart } from "../reducers/cartReducer"
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer"
import { AppDispatch } from "..";
import { RootState } from ".."

interface Props {
  product: Product
}

const ProductPage = ({ product }: Props) => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector(
    (state: RootState) => state.user)
  const cart = useSelector(
    (state: RootState) => state.cart)



  const addedToCart = cart.find(c => c.product.id === product.id)


  const responsiveStock = addedToCart ? product.stock - addedToCart.amount : product.stock

  const handleAddToCart = async (product: Product) => {
    if (responsiveStock) {

      user
        ? await dispatch(updateUserCart({ userId: user.id, product: product }))
        : await dispatch(addToCart(product))

      await dispatch(setNotification(`${product.name} added to cart.`, 3))


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
    <button onClick={() => handleAddToCart(product)}>add to cart</button>
  </>
}

export default ProductPage