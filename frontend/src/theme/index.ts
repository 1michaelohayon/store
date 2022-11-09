import styled from "styled-components"

const theme = {
  roundness: "0.36rem",
  colors: {
    primaryColor: "black",
    secondryColor: "white",
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
`

export const  PrimaryInputField = styled.input`

`
export const PrimaryButton = styled.button`
background: ${theme.colors.secondryColor};
font-size: 1em;
border: 2px solid black;
border-radius: ${theme.roundness};
cursor: pointer;
`


export default theme