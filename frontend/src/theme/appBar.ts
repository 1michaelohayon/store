
import styled from "styled-components"

const Container = styled.div`
background: gray;
display: flex;
flex-diraction: row;
color: white;
padding: 0.7em;
margin: 1em;
justify-content: space-between;
Overflow-y: scroll;
`
const CartContainer =styled.div`
display: flex;
flex-diraction: row;
`

const TabsContainer = styled.div`
display: flex;
flex-diraction: row;
margin-right: 10%;
`
const Tab  = styled.div`
margin: 0.5em;
margin-right: 5%;

`
const TabButton = styled.button`
background: gray;
color: white;
padding: 0.5em;
padding-left: 1em;
padding-right: 1em;



`

const style = {
  TabsContainer,
  CartContainer,
  Tab,
  TabButton,
  Container
  
}


export default style

