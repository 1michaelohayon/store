import { Product } from "../types";
import style from "../theme/productList"
import { useNavigate } from "react-router-dom"
import { filterInput } from "../reducers/searchFilterReducer"
import { useDispatch } from "react-redux";
import { PrimaryInputField } from "../theme";
import { formatPrice } from "../util";

const { ProductContainer, Container, FrontImage, SearchFieldContainer } = style


interface Props {
  products: Product[]
}

const ProductList = ({ products }: Props): JSX.Element => {
 
  return (
    <div>
      <SearchFieldContainer>
      <Filter />
      </SearchFieldContainer>
      <Container>
        {products.map((p: Product) => 
          <ProductListing key={p.id} product={p} />
        )}
      </Container>
    </div>
  )
}

export default ProductList;


const ProductListing = ({ product }: { product: Product }) => {
  const navigate = useNavigate()

  return <ProductContainer
  onClick={() => navigate(`${product.type}/${product.id}`)}
>
    <FrontImage src={product.photo} alt={product.name}/>
    <div><h3>{product.name}</h3> <div>{product.available ? formatPrice(product.price): "coming soon..."}</div></div>
    </ProductContainer>
}

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    dispatch(filterInput(event.currentTarget.value))
  }
  return (
    <SearchFieldContainer>
    <PrimaryInputField onChange={handleChange} placeholder="Search"/>
    </SearchFieldContainer>
  )
}
