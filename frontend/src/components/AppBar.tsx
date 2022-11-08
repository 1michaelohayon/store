import style from "../theme/appBar"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from ".."

const { TabsContainer, Tab, TabButton, CartContainer, Container, Title } = style

const AppBar = (): JSX.Element => {

  const cart = useSelector(
    (state: RootState) => state.cart)
  const user = useSelector(
    (state: RootState) => state.user)

  const inCart: string = cart.reduce((prev, current) => prev + current.amount, 0).toString()

  const isUserLogged = user
    ? <AppBarTab title={"Account"} destination="/login" />
    : <AppBarTab title={"Login"} destination="/login" />


  return (
    <div>
      <Container>
        <Title>Store</Title>
        <TabsContainer>
          <AppBarTab title={"Products"} destination="" />
          <AppBarTab title={"Other"} destination="" />
          {isUserLogged}
        </TabsContainer>
        <CartContainer>
          <AppBarTab title={`cart ${inCart}`} destination="/cart" />
        </CartContainer>
      </Container>
    </div>
  )
}

export default AppBar



interface TabProps {
  title: string
  destination: string
}
const AppBarTab = ({ title, destination }: TabProps) => (
  <Tab>
    <Link to={destination}>
      <TabButton>{title}</TabButton>
    </Link>
  </Tab>
)


