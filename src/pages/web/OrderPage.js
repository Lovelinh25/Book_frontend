import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { BASE_URL, CONFIG } from "../../config/axiosConfig";
import { resetCart } from "../../store";

const orderSchema = Yup.object({
  name: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required"),
  mobileno: Yup.string().required("Mobile phone is required"),
  address: Yup.string().required("Address is required"),
  paymentmode: Yup.string().required("Payment method is required"),
  price: Yup.string().required("Price is required"),
});
const OrderPage = () => {
  const [message, setMessage] = useState();
  const [status, setStatus] = useState();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: user.currentUser.username,
      email: user.currentUser.email,
      mobileno: "",
      address: "",
      paymentmode: "",
      price: cart.currentCart.cartItems.reduce((prev, curr) => {
        return prev + curr.product.price * curr.quantity;
      }, 0),
    },
    validationSchema: orderSchema,
    onSubmit: async (values) => {
      const result = await axios.post(
        `${BASE_URL}/api/order`,
        values,
        CONFIG(user.currentUser.token)
      );

      if (result?.status === "fulfilled") {
        setMessage("Order successfully");
        setStatus(true);
        dispatch(resetCart());
      } else {
        setMessage("Something went wrong");
        setStatus(false);
      }
    },
  });

  return (
    <Container>
      <Form
        className="container p-3 border border-dark rounded mt-5 bg-info text-white"
        onSubmit={formik.handleSubmit}
      >
        {message && (
          <Alert variant={status ? "success" : "danger"}>{message}</Alert>
        )}
        <Row>
          <Col md="6">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
              />
              <span className="text-danger">
                {formik.touched.email && formik.errors.email}
              </span>
            </Form.Group>
          </Col>

          <Col md="6">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
              />
              <span className="text-danger">
                {formik.touched.name && formik.errors.name}
              </span>
            </Form.Group>
          </Col>

          <Col md="12">
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange("address")}
                onBlur={formik.handleBlur("address")}
              />
              <span className="text-danger">
                {formik.touched.address && formik.errors.address}
              </span>
            </Form.Group>
          </Col>

          <Col md="6">
            <Form.Group>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                id="mobileno"
                name="mobileno"
                value={formik.values.mobileno}
                onChange={formik.handleChange("mobileno")}
                onBlur={formik.handleBlur("mobileno")}
              />
              <span className="text-danger">
                {formik.touched.mobileno && formik.errors.mobileno}
              </span>
            </Form.Group>
          </Col>

          <Col md="6">
            <Form.Select
              aria-label="Select payment method"
              value={formik.values.paymentmode}
              onChange={formik.handleChange("paymentmode")}
              onBlur={formik.handleBlur("paymentmode")}
            >
              <option>Select payment method</option>
              <option value="CASH_ON_DELIVERY">Cash on delivery (COD)</option>
              <option value="CARD">Credit card</option>
            </Form.Select>
            <span className="text-danger">
              {formik.touched.paymentmode && formik.errors.paymentmode}
            </span>
          </Col>

          <Col md="6">
            <Form.Group>
              <Form.Label>Total price</Form.Label>
              <Form.Control
                disabled
                type="text"
                id="price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange("price")}
                onBlur={formik.handleBlur("price")}
              />
              <span className="text-danger">
                {formik.touched.price && formik.errors.price}
              </span>
            </Form.Group>
          </Col>

          <Col md="6 d-flex align-items-center justify-content-center">
            <Button type="submit" variant="dark">
              Order now
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default OrderPage;
