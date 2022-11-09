
import styled from "styled-components"
import theme from "."


const Container = styled.header`
display:flex;
justify-content: center;
background: ${theme.colors.primaryColor};
width: 100%;
margin: 0 !important;
padding: 0 !important;

}
`


const Title = styled.h1`
margin: 0 !important;
`

const TabsContainer = styled.tbody`
display: flex;
list-style: none;

margin: 0 !important;


`

const Tab = styled.tr`

`
const TabButton = styled.button`
background: ${theme.colors.primaryColor};
font-size: 1em;
color: ${theme.colors.secondryColor};
padding: 0.25em 1em;
border: 1px solid ${theme.colors.secondryColor};
border-radius: ${theme.roundness};
cursor: pointer;
`

const style = {
  TabsContainer,
  Tab,
  TabButton,
  Container,
  Title

}


export default style

