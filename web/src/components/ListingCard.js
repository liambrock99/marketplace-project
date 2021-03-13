import styled from "styled-components";

const Card = styled.div`
  height: 250px;
  width: 250px;
  box-shadow: 0px 4px 6px 0px rgba(50,50,93,0.11) , 0px 1px 3px 0px rgba(0,0,0,0.08); 
`
const CardTitle = styled.h1`
  font-size: 1rem;
`
const CardPrice = styled.h2`
  font-size: 0.9rem;
`

const Image = styled.div`
  height: 75%;
  background-size: contain;
  background-image: url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Fimage-manipulations%2F100%2F13-512.png&f=1&nofb=1');
`

function ListingCard({ title, price }) {
  return (
    <Card>
      <Image/>
      <CardTitle>{title}</CardTitle>
      <CardPrice>${price}</CardPrice>
    </Card>
  );
}

export default ListingCard;