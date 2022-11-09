import styled from "styled-components";
import theme from ".";
const Container = styled.table`
display: flex;
justify-content: center;
border-collapse: separate;
border-spacing: 0 1em;
`
const CartContainer = styled.tbody`

`
const CartItemContainer = styled.tr`
box-shadow: 0.5px 0.5px 7px black;
border-radius: ${theme.roundness};

`

const CartImage = styled.img`
margin: 0.2rem;
width: 5rem;
height 5rem;
object-fit: cover;
border-radius: ${theme.roundness};


`

const Specifications = styled.div`
color: ${theme.colors.lowEmphasis};
font-size: ${theme.fontSizes.small}
`
const ButtonContainer = styled.td`

`

const SecondaryCartButton = styled.button`
background: ${theme.colors.secondryColor};
font-size: 1em;
border: 2px solid ${theme.colors.primaryColor};
border-radius: ${theme.roundness};
cursor: pointer;
`

const style = {
  SecondaryCartButton,
  CartContainer,
  CartItemContainer,
  ButtonContainer,
  CartImage,
  Container,
  Specifications,
 
}
export default style