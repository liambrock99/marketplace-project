import { useState } from 'react';
import { Input, Button, VerticalForm } from './FormStyles';
import { Formik, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import { LoginSchema } from '../../yup/schema';
import { useAuth } from '../../useAuth';
import { loginHandler } from '../../api';


export default function LoginForm() {

  const history = useHistory();
  const { login } = useAuth();
  const [ error, setError ] = useState();

  async function submit(values) {
    try {
      const { email, password } = values;
      const response = await loginHandler(email, password);
      login(response.data.user);
      history.push('/');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={submit}
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
        { error ? error : null }
        <Button type='submit'>Log in</Button>
      </VerticalForm>
    </Formik>
  )
}