import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../App.css";

const Signup = (props) => {
  const [cred, setCred] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cred.name,
        email: cred.email,
        password: cred.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      props.showAlert("Account Created Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <h2 className="signup-heading">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="form-control"
              id="sname"
              value={cred.name}
              name="name"
              onChange={handleChange}
              aria-describedby="emailHelp"
              placeholder="Enter Username..."
              autoFocus={true}
            />
          </div>
          <div>
            <input
              type="email"
              className="form-control"
              id="semail"
              value={cred.email}
              name="email"
              onChange={handleChange}
              aria-describedby="emailHelp"
              placeholder="Enter Email..."
            />
          </div>
          <div>
            <input
              type="password"
              className="form-control"
              id="spassword"
              value={cred.password}
              name="password"
              onChange={handleChange}
              placeholder="Enter password..."
            />
          </div>
          <div className="form-check"></div>
          <button type="submit" className="btn btn-primary signup-btn">
            Submit
          </button>
          <p className="signup-ques">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
