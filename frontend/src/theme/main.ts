
import styled from "styled-components"
import theme from "."

const MainContainer = styled.div`
background: ${theme.colors.primaryBackgroundColor};
display: flex;
margin-left:7%;
margin-right:7%;
justify-content: space-between;
@media (max-width: 900px){
  margin-left:0%;
  margin-right:0%
`

const style = {
  MainContainer,
}


export default style