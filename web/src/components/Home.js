import styled from "styled-components";
import { Formik, Form } from 'formik';
import HomeGallery from './HomeGallery'

const Header = styled.header`
  width: 100%;
  background-color: #0065ff;
  max-height: 750px;
  padding: 120px 50px;
  box-sizing: border-box;
`
const Title = styled.h1`
  font-size: 3rem;
  color: white;
  text-align: center;
  padding: 0;
  margin-bottom: 2.5rem;
`
const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  text-align: center;
  padding: 0;
  margin-bottom: 4rem;
`
const StyledField = styled.input`
  width: 50%;
  height: 1.5rem;
  border-radius: 5px;
`
const StyledButton = styled.button`
  height: 1.5rem;
  border-radius: 5px;
  background-color: white;
`

function Home() {
  return (
    <>
      <Header>
        <Title>A Marketplace</Title>
        <Subtitle>Find parts locally for your next build</Subtitle>
        <Formik
          initialValues={{ query: '' }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form style={{textAlign: "center"}}>
            <StyledField name='query' type='text'/>
            <StyledButton type='submit'>Search</StyledButton>
          </Form>
        </Formik>
      </Header>
      <HomeGallery/>
    </>
  );
}


export default Home;