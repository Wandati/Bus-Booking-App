import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
function LoginForm({ setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const user = {
        email: values.email,
        password: values.password,
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
            const { token, User_Role, Name } = await response.json();
            setUserRole(User_Role);
            // console.log(User_Role);
            alert(`Welcome ${Name}`);
            localStorage.setItem("token", token);
            setIsLoggedIn(true);
            navigate("/");
          } else {
            setErrors("Invalid Username or Password!");
          }
        })
        // .then((data) => console.log(data))
        .catch((error) => {
          // Handle network or server errors
          setErrors("There Was an Issue logging in", error);
        });
    },
  });

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
      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className={`form-control ${
              formik.touched.email && formik.errors.email ? "is-invalid" : ""
            }`}
            id="email"
            placeholder="name@example.com"
            {...formik.getFieldProps("email")}
          />
          <label htmlFor="email">Email address</label>
          {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className={`form-control ${
              formik.touched.password && formik.errors.password
                ? "is-invalid"
                : ""
            }`}
            id="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
          <label htmlFor="password">Password</label>
          {formik.touched.password && formik.errors.password && (
            <div className="invalid-feedback">{formik.errors.password}</div>
          )}
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