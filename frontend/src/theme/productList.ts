
import styled from "styled-components"
import theme from "."

const Container = styled.ul`
list-style: none;
display:grid;
padding: 0;
margin:0;
justify-content: center;
gap: 5rem;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`
const ProductContainer = styled.li`
padding: 0;
margin:5%;
cursor: pointer;


}
`
const FrontImage = styled.img`
width: 20rem;
height: 20rem;
object-fit: cover;
border-radius: ${theme.roundness};
box-shadow: 0.5px 0.5px 5px black;
padding: 0;
margin:0;
`

const SearchFieldContainer = styled.div`

`


const style = {
  Container,
  ProductContainer,
  FrontImage,
  SearchFieldContainer
}


export default style