import { Field } from 'formik';
import styled from 'styled-components';

export const Input = styled(Field)`
  display: block;
  padding: 0;
  line-height: 45px;
  border: 1.5px solid ${props => props.theme.grey};
  border-radius: 3px;
  background-color: ${props => props.theme.lightGrey};
  width: 100%;
`
export const Submit = styled.button`
  line-height: 45px;
  color: white;
  border-radius: 5px;
  border: 1.5px solid ${props => props.theme.blue};
  border-radius: 3px;
  background-color: ${props => props.theme.blue};
  width: 100%;
`