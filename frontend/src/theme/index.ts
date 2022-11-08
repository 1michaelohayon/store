import styled from "styled-components"

const theme = {
  roundness: "0.36rem",
  colors: {
    primaryBackgroundColor: "white",
    secondryBackgroundColor: "black",
    primaryTextColor: "black",
    secondryTextColor: "white",
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


export const  PrimaryInputField = styled.input`
font-size: ${theme.fontSizes.subheading};
padding: 0.3rem;
margin-bottom: 1.5rem;
margin-left: 3rem;
borderRadius: ${theme.roundness}
borderWidth: 1rem;
borderColor: ${theme.colors.lowEmphasis}

@media (max-width: 900px){
 margin-left: auto;
 margin-right: auto;
}
`
export const PrimaryButton = styled.button`
  appearance: button;
  background-color: ${theme.colors.primaryColor};
  background-image: none;
  border: 1px solid #000;
  border-radius: ${theme.roundness};
  box-shadow: #fff 4px 4px 0 0,#000 4px 4px 0 1px;
  box-sizing: border-box;
  color: ${theme.colors.secondryTextColor};
  cursor: pointer;
  display: inline-block;
  font-family: ${theme.font};
  font-size: ${theme.fontSizes.small};
  font-weight: ${theme.fontWeights.normal};
  line-height: 20px;
  margin: 0 5px 10px 0;
  overflow: visible;
  padding: 12px 40px;
  text-align: center;
  text-transform: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}

&:focus {
  text-decoration: none;
}

&hover {
  text-decoration: none;
}

&:not([disabled]):active {
  box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
  transform: translate(4px, 4px);
}

@media (min-width: 768px) {
  .button-50 {
    padding: 12px 50px;
  }
}
`


export default theme