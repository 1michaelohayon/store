import { addToCart, removeFromCart } from "../reducers/cartReducer"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "..";
import { RootState } from "..";
import { CartListing } from "../types"
import { useResponsiveStock } from "../hooks";
import style from "../theme/cart";
import { PrimaryButton } from "../theme";

const {
  SecondaryCartButton,
  CartContainer,
  CartImage,
  Specifications,
  CartItemContainer,
  ButtonContainer,
  Container
} = style


const Cart = (): JSX.Element => {

  const cart = useSelector(
    (state: RootState) => state.cart)

  if (cart.length === 0) {
    return <div>cart is empty</div>
  }

  const total: number = cart.reduce((prev, cur) => prev + cur.amount * Number(cur.product.price), 0)

  return <div>
    <CartContainer>
      {cart.map(listing => <CartItem
        key={listing.product.id}
        product={listing.product}
        amount={listing.amount} />)}
    </CartContainer>
    <Container>
      Total: ${total}
    </Container>
    <Container>
      <PrimaryButton>Checkout</PrimaryButton>
    </Container>
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

  return <CartItemContainer>
    <CartImage src={product.photo} alt={product.name} />
    <div>{product.name}: <br />
      <Specifications>
        {product.specifications?.dimensions} <br />
        {product.specifications?.weight} kg
      </Specifications> <br />
    </div>
    <div>
      {amount}
    </div>
    <ButtonContainer>
      <SecondaryCartButton onClick={() => handleAddToCart()}>+</SecondaryCartButton>
      <SecondaryCartButton onClick={handleRemove}>-</SecondaryCartButton>
    </ButtonContainer>
    ${Number(product.price) * amount}
  </CartItemContainer>
}