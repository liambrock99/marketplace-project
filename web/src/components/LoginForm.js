import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
}); 

const login = async (values) => {

  const body = JSON.stringify(values);

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  });

  if (!response.ok) {
    console.log('NOT OK');
  }

  const json = await response.json();
  console.log(json);
}

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={login}
    >
      <Form>
        <label htmlFor='email'>Email</label>
        <Field name='email' type='email'/>
        <ErrorMessage name='email'/>

        <label htmlFor='password'>Password</label>
        <Field name='password' type='password'/>
        <ErrorMessage name='password'/>

        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  )
}

export default LoginForm