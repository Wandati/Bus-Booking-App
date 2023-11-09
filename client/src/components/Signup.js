import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
function SignUpForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Customer",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      fetch("https://bus-tracker.onrender.com/sign_up", {
        // Use the correct endpoint URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Send user object as JSON
      })
        .then((response) => {
          if (response.status === 201) {
            alert("Signup Successful..");
            navigate("/login");
          } else if (response.status === 401) {
            setError("Username already exists...");
          } else {
            setError(response.json);
          }
        })
        .catch((error) => {
          setError("An error occurred during signup. Please try again.");
        });

      // navigate("/login");
    },
  });

  return (
    <div className="container text-center mt-5 mb-2">
      <h1 className="mb-4">Sign Up</h1>
      {error && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          {error}{" "}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating">
          <input
            type="text"
            className={`form-control ${
              formik.errors.username ? "is-invalid" : ""
            }`}
            id="username"
            placeholder="Enter username"
            {...formik.getFieldProps("username")}
          />
          <label htmlFor="username">Username</label>
          <div className="invalid-feedback">{formik.errors.username}</div>
        </div>
        <div className="form-floating mt-2">
          <input
            type="email"
            className={`form-control ${
              formik.errors.email ? "is-invalid" : ""
            }`}
            id="email"
            placeholder="Enter email"
            {...formik.getFieldProps("email")}
          />
          <label htmlFor="email">Email address</label>
          <div className="invalid-feedback">{formik.errors.email}</div>
        </div>
        <div className="form-floating mt-2">
          <input
            type="password"
            className={`form-control ${
              formik.errors.password ? "is-invalid" : ""
            }`}
            id="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
          <label htmlFor="password">Password</label>
          <div className="invalid-feedback">{formik.errors.password}</div>
        </div>
        <div className="form-floating mt-2">
          <input
            type="password"
            className={`form-control ${
              formik.errors.confirmPassword ? "is-invalid" : ""
            }`}
            id="confirmPassword"
            placeholder="Confirm Password"
            {...formik.getFieldProps("confirmPassword")}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="invalid-feedback">
            {formik.errors.confirmPassword}
          </div>
        </div>
        <div className="form-group mt-2 ">
          <label className="mb-2" htmlFor="role">
            Sign Up Options
          </label>
          <select
            className="form-control"
            id="role"
            {...formik.getFieldProps("role")}
          >
            <option value="Customer">Customer</option>
            <option value="BusOwner">Bus Owner</option>
          </select>
        </div>
        <button type="submit" className="btn btn-dark mt-2 mb-2">
          Signup
        </button>
        <p>
          Already Have An Account? Login{" "}
          <Link className="text-dark" to="/login">
            Here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
