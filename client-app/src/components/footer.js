import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

export function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row className="text-center">
          <Col>
            <h4>Since 2001</h4>
            <h2>@ Copyright Mohamed Shakeel Industries</h2>
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col>
            <p>All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
