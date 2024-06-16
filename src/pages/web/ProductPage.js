import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { add, resetProductPageMessage } from '../../store';
import { BASE_URL } from '../../config/axiosConfig';

const ProductPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [showMessage, setShowMessage] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`${BASE_URL}/api/product`);
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (bookId, quantity) => {
    const result = await dispatch(
      add({ bookId, quantity, token: user.currentUser.token })
    );

    if (result.meta.requestStatus === 'fulfilled') {
      setShowMessage(true);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetProductPageMessage());
    };
  }, []);

  return (
    <Container>
      {showMessage && (
        <Alert className='mt-3' variant={cart.isSuccess ? 'success' : 'danger'}>
          {cart.productPageMessage}
        </Alert>
      )}
      <Row className='mt-5'>
        {products &&
          products.map((p) => (
            <Col
              key={p.id}
              md={3}
              className='border mr-3 rounded border-dark pb-3'
            >
              <div>
                <div
                  style={{ maxHeight: 300 }}
                  className='d-flex align-items-center justify-content-center'
                >
                  <Image
                    src={`${BASE_URL}/productImages/${p.imageName}`}
                    rounded
                    style={{ height: '300px' }}
                  />
                </div>
                <div>
                  <h5>Book title: {p.productName}</h5>
                  <p>Description: {p.description}</p>
                  <p>Category: {p.categoryName}</p>
                  <p>Price: {p.price}</p>
                  <p>Quantity: {p.quantity}</p>
                </div>
                <div>
                  <Button
                    onClick={() => handleAddToCart(p.id, p.quantity)}
                    className='btn btn-danger btn-block'
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ProductPage;
