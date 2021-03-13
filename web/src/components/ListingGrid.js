import { useState, useEffect } from 'react';
import axios from 'axios';
import ListingCard from './ListingCard';
import styled from 'styled-components';

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
`

function ListingGrid(props) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/listings?page=1&limit=5')
      .then(res => setListings(res.data.listings))
      .catch(err => console.error(err));
  }, []);

  return (
    <Grid>
      {listings.map((listing, i) => 
        <ListingCard 
          key={i} 
          title={listing.title} 
          price={listing.price}
        />)}
    </Grid>
  );
}

export default ListingGrid;