import { Product } from "../types";
import { addToCart } from "../reducers/cartReducer"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "..";
import { RootState } from ".."
import { useResponsiveStock } from "../hooks";
import { PrimaryButton } from "../theme"
import { useState } from "react";
import { formatPrice } from "../util"
import style from "../theme/productPage"


const { PrimaryImg, SecondaryImg, Table } = style

interface Props {
  product: Product
}



const ProductPage = ({ product }: Props) => {
  const [primaryPhoto, setPrimaryPhoto] = useState<string | undefined>(product.photo)
  const dispatch: AppDispatch = useDispatch()
  const responsiveStock = useResponsiveStock(product)

  const user = useSelector(
    (state: RootState) => state.user)

  const handleAddToCart = () => dispatch(addToCart(user, responsiveStock, product))


  const thumbnails = product.photo && product.secondaryPhotos
    ? [product.photo, ...product.secondaryPhotos]
    : []


  return <Table>
    <tbody>
      <tr>
        <td>
          <h2>{product.name}</h2>
        </td>
      </tr>
      <tr>
        <td>
          <PrimaryImg src={primaryPhoto} alt={product.name} />
        </td>
        <td>
          {thumbnails.map(t => <SecondaryImg
            onClick={() => setPrimaryPhoto(t)}
            key={t}
            src={t}
          />)}
        </td>
      </tr>
      <tr>
        <td>
          <p>Stock: {!responsiveStock
            ? "out of stock"
            : responsiveStock === 1 ? responsiveStock + " Last one! "
              : responsiveStock}
          </p>

          <p>{formatPrice(product.price)}</p>
        </td>
      </tr>
      <tr>
        <td>
          <PrimaryButton onClick={() => handleAddToCart()}>add to cart</PrimaryButton>
        </td>
      </tr>
      <tr>
        <td>
          <p>{product.description}</p>
        </td>
      </tr>

      <tr>
        <td>
          <p>
            size: {product.specifications?.dimensions} <br />
            Weight: {product.specifications?.weight} kg
          </p>
        </td>
      </tr>
    </tbody>
  </Table>
}

export default ProductPage