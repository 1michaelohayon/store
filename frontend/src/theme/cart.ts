import styled from "styled-components";
import theme from ".";
const Container = styled.div`
display: flex;
justify-content: center;
margin: 1.5rem;

`
const CartContainer = styled.ul`
margin-left: auto;
margin-right: auto;
width: 40em
`
const CartItemContainer = styled.li`
display: flex;
justify-content: space-between;
border: solid;
border-width: 0.1rem;
padding: 1.5rem;
padding-right: 5rem;
padding-left: 5rem;
margin: 1rem;
`

const CartImage = styled.img`
object-fit: cover;
float: left;
width: 5rem;
height: 5rem;
border-radius: ${theme.roundness};
`

const Specifications = styled.div`
color: ${theme.colors.lowEmphasis};
font-size: 0.8em;
`
const ButtonContainer = styled.div`
`

const SecondaryCartButton = styled.button`
  appearance: button;
  background-color: ${theme.colors.primaryColor};
  background-image: none;
  border: 1px solid #000;
  border-radius: ${theme.roundness};
  box-shadow: #fff 4px 4px 0 0,#000 4px 4px 0 1px;
  box-sizing: border-box;
  color: ${theme.colors.secondryTextColor};
  cursor: pointer;
  display: inline-block;
  font-family: ${theme.font};
  font-size: ${theme.fontSizes.subheading};
  font-weight: ${theme.fontWeights.normal};
  line-height: 20px;
  width: 1rem;
  height: 1.rem;
  margin: 0 5px 10px 0;
  overflow: visible;
  align-self: start;  
  text-align: center;
  text-transform: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}

&:focus {
  text-decoration: none;
}

&hover {
  text-decoration: none;
}

&:not([disabled]):active {
  box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
  transform: translate(4px, 4px);
}

@media (min-width: 768px) {
  .button-50 {
    padding: 12px 50px;
  }
}
`

const style = {
  SecondaryCartButton,
  CartContainer,
  CartItemContainer,
  ButtonContainer,
  CartImage,
  Container,
  Specifications
}
export default style