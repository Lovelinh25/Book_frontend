import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import routeConfig from "../../config/routeConfig";
import { logout } from "../../store";
import axios from "axios";
import { BASE_URL, CONFIG } from "../../config/axiosConfig";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(`${BASE_URL}/api/category`);

      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const handleLogout = async () => {
    const result = await dispatch(logout());
    if (result.meta === null) {
      console.log("something went wrong");
      console.log(result);
    } else {
      navigate(routeConfig.login);
    }
  };

  const handleSearch = async () => {
    console.log(search);
  };

  return (
    <Navbar expand="lg" className="navbar-dark bg-info">
      <Container>
        <Navbar.Brand as={Link} to={routeConfig.home}>
          BookStore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              className="d-flex align-items-center"
              title="Dropdown"
              id="basic-nav-dropdown"
            >
              {categories &&
                categories.map((c) => (
                  <NavDropdown.Item
                    key={c.id}
                    as={Link}
                    to={`product/${c.name}`}
                  >
                    {c.name}
                  </NavDropdown.Item>
                ))}
            </NavDropdown>
            <Nav.Link
              className="d-flex align-items-center"
              as={Link}
              to={routeConfig.product}
            >
              Books
            </Nav.Link>

            <Nav.Link className="d-flex align-items-center">
              <InputGroup className="mb-0">
                <Form.Control
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search by book name"
                  aria-label="Search by book name"
                />
                <Button
                  onClick={() => handleSearch()}
                  className="border-light bg-info"
                  id="button-addon2"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup>
            </Nav.Link>

            {/* no logged in navbar */}
            {!user.isLoggedIn && (
              <>
                <Nav.Link
                  className="d-flex align-items-center"
                  as={Link}
                  to={routeConfig.register}
                >
                  <Button className="btn btn-info border-light">Signup</Button>
                </Nav.Link>
                <Nav.Link
                  className="d-flex align-items-center"
                  as={Link}
                  to={routeConfig.login}
                >
                  <Button className="btn btn-info border-light">Login</Button>
                </Nav.Link>
              </>
            )}

            {/* logged in navbar */}
            {user.isLoggedIn && (
              <>
                <Nav.Link className="d-flex align-items-center active">
                  Welcome back, {user.currentUser.username}!
                </Nav.Link>
                <Nav.Link
                  className="d-flex align-items-center"
                  as={Link}
                  to={routeConfig.cart}
                >
                  <Button className="btn btn-info border-light">
                    <FontAwesomeIcon icon={faCartShopping} />
                  </Button>
                </Nav.Link>
                <Nav.Link
                  className="d-flex align-items-center"
                  as={Link}
                  to={routeConfig.myOrder}
                >
                  <Button className="btn btn-info border-light">
                    My orders
                  </Button>
                </Nav.Link>
                <Nav.Item
                  className="d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <Button className="btn btn-info border-light">Logout</Button>
                </Nav.Item>
              </>
            )}

            {/* logged in navbar */}
            {user.isLoggedIn && user.currentUser.roles.includes("ADMIN") && (
              <>
                <Nav.Link
                  className="d-flex align-items-center"
                  as={Link}
                  to={routeConfig.admin}
                >
                  <Button className="btn btn-info border-light">Admin</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
