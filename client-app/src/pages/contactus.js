import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Contactus() {
  return (
    <Container className="my-5">
      <Row>
        <Col md={6} className="mb-4">
          <h2>Contact Us</h2>
          <p>
            We'd love to hear from you! Whether you have a question about our
            products, need support, or just want to give us feedback, feel free
            to reach out to us through the contact form or use the information
            below.
          </p>

          <h4>Our Contact Information:</h4>
          <ul>
            <li>
              <strong>Email:</strong> support@roadstarfashion.com
            </li>
            <li>
              <strong>Phone:</strong> +1 800 123 4567
            </li>
            <li>
              <strong>Address:</strong> 123 Fashion Ave, New York, NY 10001, USA
            </li>
          </ul>
        </Col>

        <Col md={6}>
          <h4>Get in Touch</h4>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Your message" />
            </Form.Group>

            <Button variant="dark" type="submit">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contactus;
