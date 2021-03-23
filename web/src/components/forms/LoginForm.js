import React, { useContext } from 'react';
import { Input, Button, VerticalForm } from './FormStyles';
import { Formik, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import { LoginSchema } from '../../yup/schema';
import axios from 'axios';
import { UserContext } from '../../App';

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
      <VerticalForm>
        <h1>Log in</h1>
        <Input 
          name='email' 
          type='email' 
          placeholder='Email'
        />
        <ErrorMessage name='email'/>
        <Input 
          name='password' 
          type='password' 
          placeholder='Password'
        />
        <ErrorMessage name='password'/>
        <Button type='submit'>Log in</Button>
      </VerticalForm>
    </Formik>
  )
}