import {  addToCart, removeFromCart } from "../reducers/cartReducer"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "..";
import { RootState } from "..";
import { CartListing } from "../types"
import { useResponsiveStock } from "../hooks";

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
  const responsiveStock = useResponsiveStock(product)
  const user = useSelector(
    (state: RootState) => state.user)

  const handleAddToCart = () => dispatch(addToCart(user, responsiveStock, product))
  const handleRemove = () => dispatch(removeFromCart(user, product, amount))

  return <div>
    <button onClick={() => handleAddToCart()}>+</button>
    <button onClick={handleRemove}>-</button>

    <p>{product.name} amount:{amount}</p>
  </div>
}