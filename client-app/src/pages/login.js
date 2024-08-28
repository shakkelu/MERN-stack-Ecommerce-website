import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authcontext.js";
import { useMessage } from "../context/messagecontext.js";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVariant, setAlertVariant] = useState(""); // State for alert variant
  const { auth, setAuth } = useAuth();
  const { message, setMessage } = useMessage();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );

      if (response.status === 200) {
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        setMessage(response.data.message);
        setAlertVariant("success"); // Set alert variant to success
        setEmail("");
        setPassword("");
        navigate("/");
        localStorage.setItem("auth", JSON.stringify(response.data));
      } else {
        setMessage(response.data.message);
        setAlertVariant("danger"); // Set alert variant to danger
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.message : error.message);
      setAlertVariant("danger"); // Set alert variant to danger
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center mb-4">
            <h2>Login</h2>
          </div>
          {message && <Alert variant={alertVariant}>{message}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
