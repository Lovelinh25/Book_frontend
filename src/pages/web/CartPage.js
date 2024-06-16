import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, get, resetCartPageMessage } from "../../store";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import routeConfig from "../../config/routeConfig";

const CartPage = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.currentUser != null) {
      const fetchCarts = async () => {
        await dispatch(get(user.currentUser.token));
      };
      fetchCarts();
    }
  }, []);

  const handleDelete = async (cartId) => {
    if (window.confirm("Are you sure you want to delete this cart?")) {
      const result = await dispatch(
        deleteCart({ cartId, token: user.currentUser.token })
      );
      if (result.meta.requestStatus === "fulfilled") {
        setShowMessage(true);
      } else {
        console.log("something went wrong");
        console.log(result);
      }
    }
  };

  useEffect(() => {
    return async () => {
      await dispatch(resetCartPageMessage());
    };
  }, []);
  console.log(cart);
  return (
    <Container className="pb-5">
      {cart.currentCart && (
        <>
          <h5>Welcome, {user.currentUser.username}</h5>

          <h3>In your cart: {cart?.currentCart?.cartItems.length}</h3>

          <Link to={routeConfig.productList}>Continue shopping</Link>
          {showMessage && (
            <Alert variant={cart.isSuccess ? "success" : "danger"}>
              {cart.cartPageMessage}
            </Alert>
          )}
          <Table className="table table-bordered table-striped">
            <thead className="bg-dark text-white">
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Delete</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {cart?.currentCart.cartItems &&
                cart?.currentCart.cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product?.name}</td>
                    <td>{item.product?.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Button
                        onClickCapture={() => handleDelete(item.id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </td>
                    <td>{item.product?.price * item.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center">
            <Link to={routeConfig.order} className="btn btn-info">
              Place Order
            </Link>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
