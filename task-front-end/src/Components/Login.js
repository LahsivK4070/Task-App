import React, { useState } from "react";
import "../App.css";
import {useNavigate, Link} from "react-router-dom";

const Login = (props) => {
  const [cred, setCred] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
    };

    let navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
          localStorage.setItem("token", json.authToken);
          props.showAlert("Logged in Successfully", "success");
            navigate("/");
        } else {
          props.showAlert("Invalid Credentials", "danger");
        }
    }
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              className="form-control"
              id="InputEmail"
              value={cred.email}
              name="email"
              onChange={handleChange}
              aria-describedby="emailHelp"
              placeholder="Enter email..."
              autoFocus={true}
            />
          </div>
          <div>
            <input
              type="password"
              className="form-control"
              id="InputPassword"
              value={cred.password}
              name="password"
              onChange={handleChange}
              placeholder="Enter password..."
            />
          </div>
          <div className="form-check"></div>
          <button type="submit" className="btn btn-primary login-btn">
            Submit
          </button>
          <p className="signup-ques">New User? <Link to="/signup">SignUp</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
