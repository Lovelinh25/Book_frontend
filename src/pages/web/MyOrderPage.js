import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL, CONFIG } from '../../config/axiosConfig';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routeConfig from '../../config/routeConfig';

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        `${BASE_URL}/api/order`,
        CONFIG(user.currentUser.token)
      );

      setOrders(response.data);
    };

    fetchOrders();
  }, []);

  return (
    <Container>
      <h4 className='mt-2'>My orders</h4>

      <Link className='btn btn-primary my-2' to={routeConfig.product}>
        Go shopping
      </Link>

      <Table className='table table-bordered table-striped'>
        <thead className='bg-dark text-white'>
          <tr>
            <th>Order Id</th>
            <th>Payment method</th>
            <th>Total price</th>
            <th>Address</th>
            <th>Mobile No</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {orders &&
            orders.map((o, index) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.payType}</td>
                <td>{o.totalPrice}</td>
                <td>{o.address}</td>
                <td>{o.mobileNo}</td>
                <td>{o.email}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyOrderPage;
