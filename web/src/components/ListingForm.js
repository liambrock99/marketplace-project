import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const listingSchema = Yup.object({
  title: Yup.string(),
  description: Yup.string(),
  category: Yup.string(),
  price: Yup.number(),
});

const submit = async (values) => {

  const body = JSON.stringify(values);

  const response = await fetch('/listing/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  });

  if (!response.ok) {
    console.log('NOT OK');
  }

  const json = await response.json();
  console.log(json);
};

const NewListingForm = () => {
  return (
    <Formik
      initialValues={{ 
        title: '', 
        description: '',
        category: '',
        price: 0, 
      }}
      validationSchema={listingSchema}
      onSubmit={submit}
    >
      <Form>
        <label htmlFor='title'>Title</label>
        <Field name='title' type='text'/>
        <ErrorMessage name='title'/>

        <label htmlFor='description'>Description</label>
        <Field name='description' as="textarea"/>
        <ErrorMessage name='description'/>
        
        <label htmlFor='category'>category</label>
        <Field name='category' type='text'/>
        <ErrorMessage name='category'/>

        <label htmlFor='price'>Price</label>
        <Field name='price' type='number'/>
        <ErrorMessage name='price'/>

        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  )
}

export default NewListingForm