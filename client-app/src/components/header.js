import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <div className="header">
      <div className="title">
        <h1>Feather Wrath</h1>
      </div>
      <div className="nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <h2>Home</h2>
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <h2>Sign up</h2>
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <h2>Login</h2>
        </NavLink>
        <NavLink
          to="/contact-us"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <h2>Contact us</h2>
        </NavLink>
      </div>
    </div>
  );
}
