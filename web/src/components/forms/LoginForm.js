import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import { LoginSchema } from '../../yup/schema';
import axios from 'axios';
import { UserContext } from '../../App';


const Input = styled(Field)`
  padding: 2px 10px;
  line-height: 45px;
  border: 2px solid ${props => props.theme.grey};
  border-radius: 3px;
  background-color: ${props => props.theme.lightGrey};
  width: 100%;
  :focus {
    outline: 0;
    border-color: ${props => props.theme.blue}
  }
`
const Submit = styled.button`
  line-height: 46.5px;
  color: white;
  border-radius: 5px;
  border: 1.5px solid ${props => props.theme.blue};
  border-radius: 3px;
  background-color: ${props => props.theme.blue};
  width: 100%;
`

const StyledForm = styled(Form)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
  border-radius: 5px;
  position: relative;
  left: 50%;
  top: 200px;
  transform: translateX(-50%);
  width: 500px;
  padding: 50px 50px;
  input, button {
    margin: 20px 0;
  }
  h1 {
    color: ${props => props.theme.blue};
    text-align: center;
  }
`

function loginHandler({ email, password }) {
  return axios.post('http://localhost:5000/users/login', {
    email,
    password,
  }, { withCredentials: true,})
}

export default function LoginForm() {

  const history = useHistory();
  const { toggleLoggedIn } = useContext(UserContext);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={values => {
        loginHandler(values)
          .then(response => {
            console.log(response);
            toggleLoggedIn();
            history.push('/');
          })
          .catch(error => console.error(error));
      }}
      validationSchema={LoginSchema}
    >
      <StyledForm>
        <h1>Log in</h1>
        <Input 
          name='email' 
          type='email' 
          placeholder='Email'
        />
        <ErrorMessage 
          name='email'
        />
        <Input 
          name='password' 
          type='password' 
          placeholder='Password'
        />
        <ErrorMessage 
          name='password'
        />
        <Submit type='submit'>Submit</Submit>
      </StyledForm>
    </Formik>
  )
}