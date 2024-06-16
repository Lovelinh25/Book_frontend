import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import routeConfig from '../../config/routeConfig';
import { BASE_URL, CONFIG } from '../../config/axiosConfig';
import { useSelector } from 'react-redux';

const CategoryListPage = () => {
  const user = useSelector((state) => state.user);
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

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await axios.delete(
        `${BASE_URL}/api/admin/category/${id}`,
        CONFIG(user.currentUser.token)
      );

      setCategories((state) => {
        return state.filter((c) => c.id !== id);
      });
    }
  }

  return (
    <Container>
      <h4 className='mt-2'>List of category</h4>

      <Link className='btn btn-primary my-2' to={routeConfig.categoryCreate}>
        Add category
      </Link>

      <Table className='table table-bordered table-striped'>
        <thead className='bg-dark text-white'>
          <tr>
            <th>Name</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {categories &&
            categories.map((c, index) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>
                  <Link
                    to={routeConfig.categoryUpdate.replace(':categoryId', c.id)}
                    className='btn btn-info'
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <Button onClick={() => handleDelete(c.id)} variant='danger'>
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

export default CategoryListPage;
