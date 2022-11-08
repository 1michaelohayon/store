import styled from "styled-components";
import theme from ".";


const PlaceHolder = styled.div`
padding: 1.4rem;

`
const Success = styled.div`
border: solid;
border-radius: ${theme.roundness};
border-color: ${theme.colors.success};
font-size: ${theme.fontSizes.subheading};
font-weight:${theme.fontWeights.bold};
display: flex;
justify-content: center;
margin-left: 20rem;
margin-right: 20rem;
padding: 0.3rem;
`



const Info = styled.div`
border: solid;
border-radius: ${theme.roundness};
border-color: ${theme.colors.info};
font-size: ${theme.fontSizes.subheading};
font-weight:${theme.fontWeights.bold};
display: flex;
justify-content: center;
margin-left: 20rem;
margin-right: 20rem;
padding: 0.3rem;
`


const Error = styled.div`
border: solid;
border-radius: ${theme.roundness};
border-color: ${theme.colors.error};
font-size: ${theme.fontSizes.subheading};
font-weight:${theme.fontWeights.bold};
display: flex;
justify-content: center;
margin-left: 20rem;
margin-right: 20rem;
padding: 0.3rem;
`


const style = {
  Success,
  Info,
  Error,
  PlaceHolder

}

export default style