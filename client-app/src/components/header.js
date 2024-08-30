import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authcontext.js";
import { useMessage } from "../context/messagecontext.js";

export function Header() {
  const { auth, setAuth } = useAuth();
  const { setMessage } = useMessage();

  /*
  
  Logout handling function
  
  */
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
    <table className="header">
      <tbody>
        <tr>
          <td>
            <div className="branding poppins-light">
              <h1>Feather Wrath</h1>
            </div>
          </td>
          <td>
            <div className="nav">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                <div className="nav-text poppins-light">Home</div>
              </NavLink>

              <div className="dropdown">
                <button
                  className="btn nav-text poppins-light dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </button>
                {!auth.user ? (
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink to="/signup" className="dropdown-item">
                        <div className="nav-text poppins-light">Sign Up</div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login" className="dropdown-item">
                        <div className="nav-text poppins-light">Login</div>
                      </NavLink>
                    </li>
                  </ul>
                ) : (
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink to="/user/dashboard" className="dropdown-item">
                        <div className="nav-text poppins-light">Dashboard</div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        onClick={handleLogout}
                        className="dropdown-item"
                      >
                        <div className="nav-text poppins-light">Logout</div>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </div>

              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                <div className="nav-text poppins-light">Contact Us</div>
              </NavLink>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
