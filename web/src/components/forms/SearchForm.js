import styled from 'styled-components';
import { Formik, Field, Form } from 'formik';

const Input = styled(Field)`
  line-height: 40px;
  padding: 0;
  width: 95%;
  border: 1px solid ${props => props.theme.grey};
  background-color: ${props => props.theme.lightGrey};
`
const Submit = styled.button`
  line-height: 40px;
  width: 5%;
  border: 1px solid ${props => props.theme.grey};
  background-color: ${props => props.theme.lightGrey};
`

export default function SearchForm() {
  return (
    <Formik
      initialValues={{ query: '' }}
    >
      <Form>
        <Input
          name='query'
          type='text'
        />
        <Submit type='submit'>Search</Submit>
      </Form>
    </Formik>
  )
}

