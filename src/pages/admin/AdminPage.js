import React from 'react';
import { Container } from 'react-bootstrap';
import routeConfig from '../../config/routeConfig';
import CustomCard from '../../components/CustomCard';

const AdminPage = () => {
  return (
    <Container className='d-flex justify-content-between mt-5 w-50'>
      <CustomCard
        header='Category'
        title='Manage all category section here'
        uri={routeConfig.categoryList}
        linkName='Category list'
      />

      <CustomCard
        header='Product'
        title='Manage all product section here'
        uri={routeConfig.productList}
        linkName='Product list'
      />
    </Container>
  );
};

export default AdminPage;
