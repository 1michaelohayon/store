import ProductList from "./ProductList"
import style from "../theme/main"
import { useSelector } from "react-redux"
import { RootState } from ".."

const { MainContainer } = style;

const Main = () => {
  const products = useSelector(
    (state: RootState) => state.searchFilter === ""
      ? state.products
      : state.products.filter(p => p.name
          .toLowerCase()
          .includes(state.searchFilter.toLowerCase())))


  return <>
    <MainContainer>
      <ProductList products={products} />
    </MainContainer>
  </>


}

export default Main

