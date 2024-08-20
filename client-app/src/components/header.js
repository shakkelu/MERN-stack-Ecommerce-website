import { NavLink } from "react-router-dom";

export function Header() {
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
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                <div className="nav-text poppins-light">Sign Up</div>
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                <div className="nav-text poppins-light">Login</div>
              </NavLink>
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
