import theme from ".";
import styled from "styled-components";
const Table = styled.table`
display: flex;
justify-content: center;
border-collapse: separate;
text-align: center;
margin-right: 15rem;
margin-left: 15rem;
@media (max-width: 900px) {
  margin: 0;
}
`

const PrimaryImg = styled.img`
width: 30rem;
height: 30rem;
object-fit: scale-down;


@media (max-width: 800px) {
  width: 17rem;
  height: 17rem;
}
`
const SecondaryImg = styled.img`
cursor: pointer;
border-radius: ${theme.roundness};
width: 5rem;
height: 5rem;
object-fit: cover;
`

const style = {Table, PrimaryImg, SecondaryImg }

export default style