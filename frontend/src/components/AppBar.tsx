import style from "../theme/appBar"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from ".."

const { TabsContainer, Tab, TabButton, Container, } = style

const AppBar = (): JSX.Element => {

  const cart = useSelector(
    (state: RootState) => state.cart)
  const user = useSelector(
    (state: RootState) => state.user)

  const inCart: string = cart.reduce((prev, current) => prev + current.amount, 0).toString()

  const isUserLogged = user
    ? <AppBarTab title={"Logout"} destination="/logout" />
    : <>
      <AppBarTab title={"Signup"} destination="/register" />
      <AppBarTab title={"Login"} destination="/login" />
    </>



  return (
    <Container>
      <table>
        <TabsContainer>
          <AppBarTab title={"Products"} destination="" />
        <AppBarTab title={"Other"} destination="" />
          {isUserLogged}
          <AppBarTab title={`Cart ${inCart}`} destination="/cart" />
        </TabsContainer>
      </table>
    </Container>
  )
}

export default AppBar



interface TabProps {
  title: string
  destination: string
}
const AppBarTab = ({ title, destination }: TabProps) => (
  <Tab>
    <td>
      <Link to={destination}>
        <TabButton>{title}</TabButton>
      </Link>
    </td>
  </Tab>
)


