import React from 'react';
import { Input, Button, VerticalForm } from './FormStyles';
import { Formik, ErrorMessage } from 'formik';

export default function SignupForm() {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }}
      onSubmit={values => {
        alert(JSON.stringify(values));
      }}
    >
      <VerticalForm>
        <h1>Sign up</h1>
        <Input
          name='firstName'
          type='text'
          placeholder='First name'
        />
        <ErrorMessage name='firstName'/>
        <Input
          name='lastName'
          type='text'
          placeholder='Last name'
        />
        <ErrorMessage name='lastName'/>
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
        <Button>Sign up</Button>
      </VerticalForm>
    </Formik>
  )
}