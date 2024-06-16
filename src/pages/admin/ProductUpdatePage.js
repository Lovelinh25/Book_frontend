import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import routeConfig from '../../config/routeConfig';
import axios from 'axios';
import * as Yup from 'yup';

import { BASE_URL, CONFIG } from '../../config/axiosConfig';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

// use for both create and update product
// depend on if id exists or not
const productSchema = Yup.object({
  id: Yup.number(),
  name: Yup.string().required('Product name is required'),
  categoryId: Yup.string().required('Category id is required'),
  quantity: Yup.number().required('Quantity is required'),
  price: Yup.number().required('Price is required'),
  image: Yup.mixed(),
  description: Yup.string(),
});
const ProductUpdatePage = () => {
  const user = useSelector((state) => state.user);
  const { productId } = useParams();
  const [showMessage, setShowMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        `${BASE_URL}/api/admin/category`,
        CONFIG(user.currentUser.token)
      );

      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      categoryId: '',
      quantity: '',
      price: '',
      image: {},
      description: '',
    },
    validationSchema: productSchema,
    onSubmit: async (values, { resetForm }) => {
      let response;

      const formData = new FormData();
      formData.append(
        'ProductDto',
        JSON.stringify({
          id: productId || null,
          name: values.name,
          categoryId: values.categoryId,
          quantity: values.quantity,
          price: values.price,
          description: values.description,
        })
      );

      if (values.image) {
        formData.append('ProductImage', values.image);
      }

      if (productId) {
        response = await axios.put(
          `${BASE_URL}/api/admin/product/update/${productId}`,
          formData,
          CONFIG(user.currentUser.token)
        );
      } else {
        response = await axios.post(
          `${BASE_URL}/api/admin/product/add`,
          formData,
          CONFIG(user.currentUser.token)
        );
        resetForm();
      }

      setShowMessage(true);
      if (response.status === 200) {
        setIsSuccess(true);
        setMessage(`${productId ? 'Update' : 'Add'} product successfullly`);
      } else {
        setMessage('Something went wrong');
        setIsSuccess(false);
      }
    },
  });

  useEffect(() => {
    async function fetchProductById() {
      const response = await axios.get(
        `${BASE_URL}/api/admin/product/${productId}`,
        CONFIG(user.currentUser.token)
      );

      formik.setValues({
        id: productId || '',
        name: response.data.productName,
        categoryId: response.data.categoryId,
        quantity: response.data.quantity,
        price: response.data.price,
        image: response.data.imageName,
        description: response.data.description,
      });
    }

    if (productId) {
      fetchProductById();
    }
  }, []);

  return (
    <Container>
      <h4 className='my-3'>{productId ? 'Update' : 'Add'} Product</h4>

      {showMessage && (
        <Alert variant={isSuccess ? 'success' : 'danger'}>{message}</Alert>
      )}

      <Form className='w-50' onSubmit={formik.handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Control
            type='text'
            id='name'
            name='name'
            placeholder='Enter product name'
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          <span className='text-danger'>
            {formik.touched.name && formik.errors.name}
          </span>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Control
            type='text'
            id='price'
            name='price'
            placeholder='Enter price'
            value={formik.values.price}
            onChange={formik.handleChange('price')}
            onBlur={formik.handleBlur('price')}
          />
          <span className='text-danger'>
            {formik.touched.price && formik.errors.price}
          </span>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Control
            type='text'
            id='quantity'
            name='quantity'
            placeholder='Enter quantity'
            value={formik.values.quantity}
            onChange={formik.handleChange('quantity')}
            onBlur={formik.handleBlur('quantity')}
          />
          <span className='text-danger'>
            {formik.touched.quantity && formik.errors.quantity}
          </span>
        </Form.Group>

        <Form.Select
          className='mb-3'
          aria-label='Select category'
          id='categoryId'
          name='categoryId'
          placeholder='Enter categoryId'
          value={formik.values.categoryId}
          onChange={formik.handleChange('categoryId')}
          onBlur={formik.handleBlur('categoryId')}
        >
          <option>Select category</option>
          {categories &&
            categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </Form.Select>
        <span className='text-danger'>
          {formik.touched.categoryId && formik.errors.categoryId}
        </span>

        <Form.Group className='mb-3'>
          <Form.Control
            type='file'
            name='image'
            onChange={(event) => {
              formik.setFieldValue('image', event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur('image')}
          />
        </Form.Group>
        <span className='text-danger'>
          {formik.touched.image && formik.errors.image}
        </span>

        <Form.Group className='mb-3'>
          <Form.Control
            type='text'
            id='description'
            name='description'
            placeholder='Enter description'
            value={formik.values.description}
            onChange={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
          />
          <span className='text-danger'>
            {formik.touched.description && formik.errors.description}
          </span>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Save
        </Button>

        <hr />

        <Link to={routeConfig.productList}>Back to list</Link>
      </Form>
    </Container>
  );
};

export default ProductUpdatePage;
