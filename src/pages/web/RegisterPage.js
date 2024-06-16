import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Alert, Button, Container } from 'react-bootstrap';
import * as Yup from 'yup';

import { register, resetRegisterPageMessage } from '../../store';
import routeConfig from '../../config/routeConfig';
import { useEffect } from 'react';

const registerShema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must has at lease 6 characters'),
});
const RegisterPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: registerShema,
    onSubmit: async (values) => {
      console.log(values);
      const result = await dispatch(register(values));

      if (result.meta.requestStatus === 'fulfilled') {
        navigate(routeConfig.login);
      }
    },
  });

  useEffect(() => {
    return () => {
      dispatch(resetRegisterPageMessage());
    };
  }, [dispatch]);

  return (
    <Container fluid className='d-flex justify-content-center mt-5'>
      <Form className='border rounded p-3 w-25' onSubmit={formik.handleSubmit}>
        <h4 className='text-center'>SIGN UP</h4>
        {user.registerPageMessage && (
          <Alert variant={user.isSuccess ? 'success' : 'danger'}>
            {user.registerPageMessage}
          </Alert>
        )}

        <Form.Group className='mb-2'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            id='username'
            name='username'
            placeholder='Enter your username'
            value={formik.values.username}
            onChange={formik.handleChange('username')}
            onBlur={formik.handleBlur('username')}
          />
          <span className='text-danger'>
            {formik.touched.username && formik.errors.username}
          </span>
        </Form.Group>

        <Form.Group className='mb-2'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            value={formik.values.email}
            onChange={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
          />
          <span className='text-danger'>
            {formik.touched.email && formik.errors.email}
          </span>
        </Form.Group>

        <Form.Group className='mb-2'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password'
            value={formik.values.password}
            onChange={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
          />
          <span className='text-danger'>
            {formik.touched.password && formik.errors.password}
          </span>
        </Form.Group>

        <Button type='submit' className='btn btn-primary btn-block'>
          Register
        </Button>

        <p className='mt-2'>
          Already has an account? <Link to={routeConfig.login}>Login now</Link>
        </p>
      </Form>
    </Container>
  );
};

export default RegisterPage;
