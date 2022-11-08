
import styled from "styled-components"
import theme from "."


const Container = styled.div`
border-radius: ${theme.roundness};
background: ${theme.colors.secondryBackgroundColor};
display: flex;
flex-diraction: row;
color: white;
padding: 0.7em;
padding-right: 3em;
padding-left: 3em;
margin: 1em;
margin-right: 7em;
margin-left: 7em;
justify-content: space-between;

@media (max-width: 600px) {
Overflow-y: scroll;
padding: 0em;
padding-right: 0em;
padding-left: 0em;
margin: 0em;
margin-right: 0em;
margin-left: 0em;

}
`
const CartContainer = styled.div`
display: flex;
flex-diraction: row;

`

const Title = styled.h1`
color: inherit;
text-decoration: none;
@media (max-width: 10000px) {
  display: none;
}
`

const TabsContainer = styled.div`
display: flex;
flex-diraction: row;

margin-right: 10%;
`
const Tab = styled.div`

margin: 0.5em;
margin-right: 5%;

`
const TabButton = styled.button`
  background: ${theme.colors.secondryBackgroundColor};
  backface-visibility: hidden;
  border-radius: ${theme.roundness};
  border-style: solid;
  border-width: .125rem;
  border-color: ${theme.colors.secondryColor};
  box-sizing: border-box;
  color: ${theme.colors.secondryTextColor};
  cursor: pointer;
  display: inline-block;
  font-family: Circular,Helvetica,sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -.01em;
  line-height: 1.3;
  padding: .875rem 1.125rem;
  position: relative;
  text-align: left;
  text-decoration: none;
  transform: translateZ(0) scale(1);
  transition: transform .2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

&:not(:disabled):hover {
  transform: scale(1.05);
}

&:not(:disabled):hover:active {
  transform: scale(1.05) translateY(.125rem);
}

&:focus {
  outline: 0 solid transparent;
}

&:focus:before {
  content: "";
  left: calc(-1*.375rem);
  pointer-events: none;
  position: absolute;
  top: calc(-1*.375rem);
  transition: border-radius;
  user-select: none;
}

&:focus:not(:focus-visible) {
  outline: 0 solid transparent;
}

&:focus:not(:focus-visible):before {
  border-width: 0;
}

&:not(:disabled):active {
  transform: translateY(.125rem);
}
`

const style = {
  TabsContainer,
  CartContainer,
  Tab,
  TabButton,
  Container,
  Title

}


export default style

