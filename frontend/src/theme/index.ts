import styled from "styled-components"

const theme = {
  roundness: "0.36rem",
  colors: {
    primaryColor: "#000001",
    secondryColor: "#ffffff ",
    lowEmphasis: "gray",
    error: "#f7401c",
    info: "#d19844",
    success: "#009e81",
  },
    fontSizes: {
      small: "0.8em",
      body: "1em",
      subheading: "1.5em",
    },
    font: "Arial",
    fontWeights: {
      normal: '400',
      bold: '700',
    },
}


export const AppContainer = styled.div`
background: ${theme.colors.secondryColor}; 
margin: 0 !important;
padding: 0 !important;
text-align: center;

`

export const  PrimaryInputField = styled.input`
border-radius: ${theme.roundness};
padding: 14px;
font-size: 17px;
margin-top: 5px;
border-color: ${theme.colors.primaryColor};
margin-bottom: 30px;
`
export const PrimaryButton = styled.button`
background: ${theme.colors.secondryColor};
font-size: 1em;
padding: 15px;
border: 2px solid ${theme.colors.primaryColor};
font-color: ${theme.colors.primaryColor};
border-radius: ${theme.roundness};
cursor: pointer;
`


export default theme