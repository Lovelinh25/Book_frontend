import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL, CONFIG } from '../../config/axiosConfig';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routeConfig from '../../config/routeConfig';

const ProductListPage = () => {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        `${BASE_URL}/api/admin/product`,
        CONFIG(user.currentUser.token)
      );

      setProducts(response.data);
    };

    fetchCategories();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await axios.delete(
        `${BASE_URL}/api/admin/product/${id}`,
        CONFIG(user.currentUser.token)
      );

      setProducts((state) => {
        return state.filter((c) => c.id !== id);
      });
    }
  }

  return (
    <Container>
      <h4 className='mt-2'>List of product</h4>

      <Link className='btn btn-primary my-2' to={routeConfig.productCreate}>
        Add product
      </Link>

      <Table className='table table-bordered table-striped'>
        <thead className='bg-dark text-white'>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {products &&
            products.map((p, index) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.productName}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>
                <td>
                  <Link
                    to={routeConfig.productUpdate.replace(':productId', p.id)}
                    className='btn btn-info'
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <Button onClick={() => handleDelete(p.id)} variant='danger'>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductListPage;
