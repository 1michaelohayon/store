
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


@media (max-width: 800px) {
  overflow-y: scroll;
  padding-top 1rem;
padding-bottom 1rem;
}
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
padding: 1em 1.5em;
border: 1.5px solid ${theme.colors.secondryColor};
border-radius: ${theme.roundness};
cursor: pointer;
margin-left:10px;
margin-right: 10px;

@media (max-width: 800px) {
  border: 1px solid ${theme.colors.secondryColor};
  margin-left: 0px;
  margin-right: 0px;
  padding: 0.25em 1em;
}
`

const style = {
  TabsContainer,
  Tab,
  TabButton,
  Container,
  Title

}


export default style

