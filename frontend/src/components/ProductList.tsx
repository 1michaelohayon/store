import { Product } from "../types";
import style from "../theme/productList"
import { useNavigate } from "react-router-dom"
import { filterInput } from "../reducers/searchFilterReducer"
import { useDispatch } from "react-redux";
const { ProductContainer, Container } = style


interface Props {
  products: Product[]
}

const ProductList = ({ products }: Props): JSX.Element => {
  const navigate = useNavigate()
  return (
    <div>
      <Filter />
      <h1>List of products..</h1>
      <Container>
        {products.map((p: Product) => <ProductContainer
          key={p.id}
          onClick={() => navigate(`${p.type}/${p.id}`)}
        >
          <ProductListing product={p} />
        </ProductContainer>

        )}
      </Container>
    </div>
  )
}

export default ProductList;


const ProductListing = ({ product }: { product: Product }) => {
  if (!product.available) {
    return (
      <div>
        <h2>{product.name}</h2>
        <p>currently unavailble</p>
      </div>
    )
  }

  return <>
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <p>{product.specifications?.dimensions}</p>
    <p>{product.specifications?.weight}</p>
    <p>{product.stock}</p>
    <p>{product.type}</p>
  </>
}

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    dispatch(filterInput(event.currentTarget.value))
  }
  return (
    <div>
      Search <input onChange={handleChange} />
    </div>
  )
}
