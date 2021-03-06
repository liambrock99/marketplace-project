import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';

const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
}); 

const login = async (body) => {
  return fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body
  });
}

export default function LoginForm() {

  let history = useHistory();
  const [error, setError] = useState(null);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={async (values) => {
        const body = JSON.stringify(values);
        const response = await login(body);
        if (response.ok) {
          history.push('/');
        } else {
          const json = await response.json();
          setError(json.message);
        }
      }}
    >
      <Form className='form'>
        <h1>Login</h1>
        <Field 
          name='email' 
          type='email' 
          placeholder='Email'
        />
        <ErrorMessage 
          name='email'
          component='div' 
          className='form-error' 
        />
        <Field 
          name='password' 
          type='password' 
          placeholder='Password'
        />
        <ErrorMessage 
          name='password'
          component='div'
          className='form-error'
        />
        <button type='submit'>Submit</button>
        {error ? <div>{error.message}</div> : null}
      </Form>
    </Formik>
  )
}