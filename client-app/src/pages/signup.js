import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../context/messagecontext.js";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const Signup = () => {
  // State variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [alertVariant, setAlertVariant] = useState(""); // State for alert variant
  const navigate = useNavigate();
  const { message, setMessage } = useMessage();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, phone, address);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        { name, email, password, phone, address }
      );

      if (response.status === 200) {
        console.log("Sending success");
        console.log(response.data.message);
        setMessage(response.data.message);
        setAlertVariant("success"); // Set alert variant to success
        // Reset form fields
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAddress("");
        // Navigate to login page
        navigate("/login");
      } else {
        console.log("Sending failure");
        console.log(response.data.message);
        setMessage(response.data.message);
        setAlertVariant("danger"); // Set alert variant to danger
      }
    } catch (error) {
      console.error(
        "Error occurred:",
        error.response ? error.response.data.message : error.message
      );
      setMessage(error.response ? error.response.data.message : error.message);
      setAlertVariant("danger"); // Set alert variant to danger
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center mb-4">
            <h2>Sign Up</h2>
          </div>
          {message && <Alert variant={alertVariant}>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
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

export default Signup;
