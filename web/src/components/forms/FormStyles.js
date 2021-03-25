import styled from 'styled-components';
import { Field, Form } from 'formik';

export const VerticalForm = styled(Form)`
  position: relative;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  max-width: 400px;
  min-width: 350px;
  padding: 50px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
  border-radius: 10px;
  input, button {
    margin: 20px 0;
  }
  h1 {
    color: ${props => props.theme.blue};
    text-align: center;
  }
`

export const Input = styled(Field)`
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

export const Button = styled.button`
  line-height: 45px;
  color: white;
  border-radius: 3px;
  border: none;
  width: 100%;
  background-color: ${props => props.theme.blue};
`