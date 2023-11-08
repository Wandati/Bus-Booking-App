import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

function LoginForm({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    fetch("http://127.0.0.1:5500/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async (response) => {
        if (response.status === 200) {
          const { token } = await response.json();
          localStorage.setItem("token", token);
          setIsLoggedIn(true);
          navigate("/");
        } else {
          setErrors("Invalid email or password");
        }
      })
      .catch((error) => {
        setErrors("An error occurred while logging in", error);
        console.log(errors);
      });
  };

  return (
    <div className="container text-center mt-5 mb-4">
      <h1 className="mb-4">Login</h1>
      {errors && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          {errors}{" "}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button type="submit" className="btn btn-dark mb-2 mt-4">
          Login
        </button>
        <p>
          Don't Have An Account? SignUp{" "}
          <Link className="text-dark" to="/signup">
            Here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;