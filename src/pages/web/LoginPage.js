import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import routeConfig from './../../config/routeConfig';
import { login, resetLoginPageMessage } from '../../store/user/userSlice';
import { useEffect } from 'react';

const loginSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});
const LoginPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const loginResult = await dispatch(login(values));

      if (loginResult.meta.requestStatus === 'fulfilled') {
        navigate(routeConfig.home);
      }
    },
  });

  useEffect(() => {
    return () => {
      dispatch(resetLoginPageMessage());
    };
  }, [dispatch]);

  return (
    <Container fluid className='d-flex justify-content-center mt-5'>
      <Form className='border rounded p-3 w-25' onSubmit={formik.handleSubmit}>
        <h4 className='text-center'>LOGIN</h4>

        {user.loginPageMessage && (
          <Alert variant={user.isSuccess ? 'success' : 'danger'}>
            {user.loginPageMessage.toString()}
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
          Login
        </Button>

        <p className='mt-2'>
          Not a member? <Link to={routeConfig.register}>Sign up now</Link>
        </p>
      </Form>
    </Container>
  );
};

export default LoginPage;
