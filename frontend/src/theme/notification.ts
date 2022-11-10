import styled from "styled-components";
import theme from ".";


const PlaceHolder = styled.div`
padding: 0.6rem;

`
const Success = styled.div`
background: ${theme.colors.success};
color: ${theme.colors.secondryColor};
font-size: ${theme.fontSizes.body};
font-weight: ${theme.fontWeights.bold};
text-align: center;
`



const Info = styled.div`
background: ${theme.colors.info};
color: ${theme.colors.primaryColor};
font-size: ${theme.fontSizes.body};
font-weight: ${theme.fontWeights.bold};

text-align: center;
`


const Error = styled.div`
background: ${theme.colors.error};
color: ${theme.colors.primaryColor};
font-size: ${theme.fontSizes.body};
font-weight: ${theme.fontWeights.bold};

text-align: center;
`


const style = {
  Success,
  Info,
  Error,
  PlaceHolder

}

export default style