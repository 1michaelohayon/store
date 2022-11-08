
import styled from "styled-components"
import theme from "."

const Container = styled.ul`
list-style: none;
padding: 0;
gap: 0.7rem;
justify-content: center;
display: flex;
flex-wrap: wrap;
position:absolute;


@media (max-width: 600px) {
  list-style: none;
  padding: 0;
  gap: 0.7rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;

}

`
const ProductContainer = styled.li`
  width: 30%;
  height: auto;
  align-self: center;
  flex: 0 0 auto;
cursor: pointer;

@media (max-width: 700px) {
  width: 30%;
  height: auto;
  align-self: center;
  flex: 0 0 90%;

}
`
const FrontImage = styled.img`
object-fit: cover;
float: up;
width: 25rem;
height: 25rem;

border-radius: ${theme.roundness};
box-shadow: 0.5px 0.5px 3px black;

@media (max-width: 600px) {
  width: 24rem;
  height: 24rem;
  filter: blur(0px);
  border-radius: 1.5%;

  box-shadow: 1.5px 1.5px 7px black;
}

@media (max-width: 900px) {
  width: 22rem;
  height: 22rem;
}


`

const SearchFieldContainer = styled.div`
display: flex;

margin: 1rem;
`


const style = {
  Container,
  ProductContainer,
  FrontImage,
  SearchFieldContainer
}


export default style