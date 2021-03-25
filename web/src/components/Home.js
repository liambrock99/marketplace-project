import styled from "styled-components";
// import HomeGallery from './HomeGallery'
import SearchForm from './forms/SearchForm'
import Navbar from './Navbar';

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.blue};
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
    </>
  );
}


export default Home;