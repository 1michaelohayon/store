import { addToCart, removeFromCart, addToUserCart, removeInUserCart } from "../reducers/cartReducer"
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer"
import { AppDispatch } from "..";
import { RootState } from "..";
import { CartListing } from "../types"


const Cart = (): JSX.Element => {

  const cart = useSelector(
    (state: RootState) => state.cart)

  if (cart.length === 0) {
    return <div>cart is empty</div>
  }


  return <div>
    {cart.map(listing => <CartItem
      key={listing.product.id}
      product={listing.product}
      amount={listing.amount} />)}
  </div>
}

export default Cart


const CartItem = ({ product, amount }: CartListing): JSX.Element => {
  const dispatch: AppDispatch = useDispatch()

  const user = useSelector(
    (state: RootState) => state.user)


  const handleAdd = async () => {
    user
      ? await dispatch(addToUserCart({ userId: user.id, product: product }))
      : await dispatch(addToCart(product))

    await dispatch(setNotification(`${product.name} added to cart.`, 3))
  }

  const handleRemove = async () => {
    user
      ? await dispatch(removeInUserCart({ userId: user.id, product: product }))
      : await dispatch(removeFromCart({ product, amount }))
    dispatch(setNotification(`${product.name} removed.`, 3))
  }

  return <div>
    <button onClick={handleAdd}>+</button>
    <button onClick={handleRemove}>-</button>

    <p>{product.name} amount:{amount}</p>
  </div>
}