import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Grid = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly; */
  padding: 25px 13%;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`
const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 150px 50px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px 0px rgba(50,50,93,0.11) , 0px 1px 3px 0px rgba(0,0,0,0.08);
  :hover {
    transform: scale(1.02);
  }
  transition: 0.5s ease; 
`
const CardImage = styled.div`
  background-image: url('https://images.pexels.com/photos/40879/cpu-processor-macro-pen-40879.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  background-size: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-position: center;
`
const CardText = styled.div`
  padding: 15px;
`

function HomeGallery(props) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/listings?page=1&limit=5')
      .then(res => setListings(res.data.listings))
      .catch(err => console.error(err));
  }, []);

  return (
    <Grid>
      {listings.map((listing, i) => {
        return (
          <Card key={i}>
            <CardImage/>
            <CardText>{listing.title} ${listing.price}</CardText>
          </Card> 
        )
      })}
    </Grid>
  );
}

export default HomeGallery;