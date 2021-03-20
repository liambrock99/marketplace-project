import styled from "styled-components";
import HomeGallery from './HomeGallery'
import SearchForm from './forms/SearchForm'
import Navbar from './Navbar';

const Banner = styled.div`
  background-color: ${props => props.theme.blue};
  h1, h2 {
    color: white;
    text-align: center;
  }

  padding: 150px 150px;

`
function Home() {
  return (
    <>
      <Navbar/>
      <Banner>
        <h1>A Marketplace</h1>
        <h2>Find parts locally for your next build</h2>
        <SearchForm/>
      </Banner>
      <HomeGallery/>
    </>
  );
}


export default Home;