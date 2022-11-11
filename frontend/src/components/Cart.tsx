import { addToCart, removeFromCart } from "../reducers/cartReducer"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "..";
import { RootState } from "..";
import { CartListing } from "../types"
import { setNotification } from "../reducers/notificationReducer";
import { useResponsiveStock, useAlreadyInCart} from "../hooks";
import style from "../theme/cart";
import { PrimaryButton } from "../theme";
import { formatPrice } from "../util";


const {
  SecondaryCartButton,
  CartContainer,
  CartImage,
  Specifications,
  CartItemContainer,
  ButtonContainer,
  Container,
} = style


const Cart = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch()

  const cart = useSelector(
    (state: RootState) => state.cart)

  if (cart.length === 0) {
    return <div>cart is empty</div>
  }

  const total: number = cart.reduce((prev, cur) => prev + cur.amount * Number(cur.product.price), 0)

  return <Container>
    <CartContainer>
      {cart.map(listing => <CartItem
        key={listing.product.id}
        product={listing.product}
        amount={listing.amount} />)}

    <tr>
      <td>
      </td>
      <td>
      </td>
      <td>
        <PrimaryButton onClick={() => dispatch(setNotification("Thanks for checking out my project. Check out more at:  https://github.com/1michaelohayon", 30))}>Checkout</PrimaryButton>
      </td>
      <td>
      </td>
      <td>
        {formatPrice(total)}
      </td>
    </tr>
    </CartContainer>
  </Container>
}

export default Cart


const CartItem = ({ product, amount }: CartListing): JSX.Element => {
  const dispatch: AppDispatch = useDispatch()
  const responsiveStock = useResponsiveStock(product)
  const alreadyInCart = useAlreadyInCart(product);


  const user = useSelector(
    (state: RootState) => state.user)

    const handleAddToCart = () => dispatch(addToCart(user, responsiveStock,alreadyInCart,  product))
    const handleRemove = () => dispatch(removeFromCart(user, product, amount))

  return <CartItemContainer>
    <td>
      <CartImage src={product.photo} alt={product.name} />
    </td>

    <td>{product.name}: <br />
      <Specifications>
        {product.specifications?.dimensions} <br />
        {product.specifications?.weight} kg
      </Specifications> 
    </td>
    <td>
      {amount}
    </td>
    <ButtonContainer>
      <SecondaryCartButton onClick={() => handleAddToCart()}>+</SecondaryCartButton>
      <SecondaryCartButton onClick={handleRemove}>-</SecondaryCartButton>
    </ButtonContainer>
    <td>
      {formatPrice(Number(product.price) * amount)}
    </td>
  </CartItemContainer>
}