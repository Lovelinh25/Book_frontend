import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

import { useSelector } from 'react-redux';
import routeConfig from '../../config/routeConfig';
import { useFormik } from 'formik';
import { BASE_URL, CONFIG } from '../../config/axiosConfig';

// use for both create and update category
// depend on if id exists or not
const categorySchema = Yup.object({
  id: Yup.number(),
  name: Yup.string().required('Category name is required'),
});
const CategoryUpdatePage = () => {
  const user = useSelector((state) => state.user);
  const [showMessage, setShowMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [message, setMessage] = useState('');
  const { categoryId } = useParams();

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
    },
    validationSchema: categorySchema,
    onSubmit: async (values, { resetForm }) => {
      let response;
      if (categoryId) {
        response = await axios.put(
          `${BASE_URL}/api/admin/category`,
          values,
          CONFIG(user.currentUser.token)
        );
      } else {
        response = await axios.post(
          `${BASE_URL}/api/admin/category`,
          values,
          CONFIG(user.currentUser.token)
        );
        resetForm();
      }

      setShowMessage(true);
      if (response.status === 200) {
        setIsSuccess(true);
        setMessage(`${categoryId ? 'Update' : 'Add'} category successfullly`);
      } else {
        setMessage('Something went wrong');
        setIsSuccess(false);
      }
    },
  });

  useEffect(() => {
    async function fetchCategoryById() {
      const response = await axios.get(
        `${BASE_URL}/api/admin/category/${categoryId}`,
        CONFIG(user.currentUser.token)
      );

      formik.setValues({
        id: categoryId || '',
        name: response.data.name,
      });
    }

    if (categoryId) {
      fetchCategoryById();
    }
  }, []);

  return (
    <Container>
      <h4 className='my-3'>{categoryId ? 'Update' : 'Add'} Category</h4>

      <Form className='w-50' onSubmit={formik.handleSubmit}>
        {showMessage && (
          <Alert variant={isSuccess ? 'success' : 'danger'}>{message}</Alert>
        )}

        <Form.Group className='mb-3'>
          <Form.Control
            type='hidden'
            id='id'
            name='id'
            value={formik.values.id}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Control
            type='text'
            id='name'
            name='name'
            placeholder='Enter category name'
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          <span className='text-danger'>
            {formik.touched.name && formik.errors.name}
          </span>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Save
        </Button>

        <hr />

        <Link to={routeConfig.categoryList}>Back to list</Link>
      </Form>
    </Container>
  );
};

export default CategoryUpdatePage;
