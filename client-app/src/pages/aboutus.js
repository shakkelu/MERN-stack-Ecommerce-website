import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

function AboutUs() {
  return (
    <Container className="my-5">
      <Row>
        <Col md={12} className="text-center mb-4">
          <h1>About Us</h1>
          <p>
            Welcome to Feather Wrath, where fashion meets innovation. Discover
            our journey, values, and the dedicated team behind the brand.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Our Story</Card.Title>
              <Card.Text>
                At Road Star, we are passionate about providing high-quality
                fashion that empowers individuals to express their unique style.
                Founded in 2020, our mission is to offer contemporary designs
                that combine comfort, style, and affordability. We believe in
                creating a shopping experience that makes you feel as confident
                as you look.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Our Values</Card.Title>
              <Card.Text>
                <ul>
                  <li>
                    <strong>Quality:</strong> We prioritize the highest quality
                    materials and craftsmanship.
                  </li>
                  <li>
                    <strong>Innovation:</strong> Our designs are inspired by the
                    latest fashion trends and technology.
                  </li>
                  <li>
                    <strong>Sustainability:</strong> We are committed to
                    environmentally friendly practices and ethical sourcing.
                  </li>
                  <li>
                    <strong>Customer Focus:</strong> Your satisfaction is our
                    top priority. We strive to exceed your expectations.
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Meet the Team</Card.Title>
              <Card.Text>
                <p>
                  Our team is made up of dedicated professionals who are
                  passionate about fashion and committed to delivering the best
                  experience for our customers. From our creative designers to
                  our friendly customer service representatives, each team
                  member plays a crucial role in making Road Star a success.
                </p>
                <p>
                  We invite you to connect with us and learn more about the
                  people who make our brand special.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
