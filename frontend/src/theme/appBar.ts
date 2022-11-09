
import styled from "styled-components"
import theme from "."


const Container = styled.header`
display:flex;
justify-content: center;
background: ${theme.colors.primaryColor};
width: 100%;
padding-top 2rem;
padding-bottom 2rem;
position: static; 

}
`


const Title = styled.h1`
`

const TabsContainer = styled.tbody`
display: flex;
list-style: none;



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

