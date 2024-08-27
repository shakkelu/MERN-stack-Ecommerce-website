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

              {!auth.user ? (
                <>
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
                </>
              ) : (
                <>
                  <NavLink
                    to="/user/dashboard"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    <div className="nav-text poppins-light">Dashboard</div>
                  </NavLink>
                  <NavLink
                    to="/login"
                    onClick={handleLogout}
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    <div className="nav-text poppins-light">Logout</div>
                  </NavLink>
                </>
              )}

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
