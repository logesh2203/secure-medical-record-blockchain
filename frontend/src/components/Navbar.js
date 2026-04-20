import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link className="brand" to="/">
          Secure Medical Records
        </Link>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              {user?.name ? <span className="user-pill">{user.name}</span> : null}
              {user?.role ? <span className="user-pill">{user.role}</span> : null}
              <Link to="/dashboard">Dashboard</Link>
              <button className="button secondary" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
