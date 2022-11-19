import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-nav">
          {!localStorage.getItem('token')?<form role="search">
          <Link className="btn btn-light mx-1" to="/login" role="button">Login</Link>
          <Link className="btn btn-light mx-1" to="/signup" role="button">Signup</Link>
          </form> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
    </div>
    </nav>
  );
}

export default Navbar;
