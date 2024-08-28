import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "../context/authcontext.js";
import { useMessage } from "../context/messagecontext.js";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

export function Header() {
  const { auth, setAuth } = useAuth();
  const { setMessage } = useMessage();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    setMessage("");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Feather Wrath
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/" end activeClassName="active">
              Home
            </Nav.Link>

            {auth.user && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/user/dashboard"
                  activeClassName="active"
                >
                  Dashboard
                </Nav.Link>
              </>
            )}

            <Nav.Link as={NavLink} to="/about-us" activeClassName="active">
              About Us
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact-us" activeClassName="active">
              Contact Us
            </Nav.Link>
            {!auth.user ? (
              <>
                <Nav.Link as={NavLink} to="/signup" activeClassName="active">
                  Signup
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" activeClassName="active">
                  Login
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                as={NavLink}
                to="/login"
                onClick={handleLogout}
                activeClassName="active"
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
