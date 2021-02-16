import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const signupSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
}); 

const signup = async (values) => {

  const body = JSON.stringify(values);

  const response = await fetch('/signup', {
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

const SignupForm = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '', 
        firstName: '', 
        lastName: '',}}
      validationSchema={signupSchema}
      onSubmit={signup}
    >
      <Form>
        <label htmlFor='email'>Email</label>
        <Field name='email' type='email'/>
        <ErrorMessage name='email'/>

        <label htmlFor='password'>Password</label>
        <Field name='password' type='password'/>
        <ErrorMessage name='password'/>

        <label htmlFor='firstName'>First Name</label>
        <Field name='firstName' type='text'/>
        <ErrorMessage name='firstName'/>

        <label htmlFor='lastName'>Last Name</label>
        <Field name='lastName' type="text"/>
        <ErrorMessage name='lastName'/>

        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  )
}

export default SignupForm