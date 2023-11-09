import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ADasboard({ setUserRole, userRole }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      fetch("http://127.0.0.1:5500/check_user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserRole(data["User_Role"]);
          // console.log(data);
        });
    } else {
      // console.log("Hello World");
    }
  }, [token, setUserRole]);
  useEffect(() => {
    if (!token || userRole !== "Admin") {
      navigate("/");
    }
  }, [token, navigate, userRole]);
  return (
    <div className="container text-center">
      <h1 className="mt-4">Welcome Admin!</h1>
      <Link className="btn btn-outline-dark m-2" to="/users">
        View Users
      </Link>
      <Link className="btn btn-outline-dark" to="/ad_routes">
        View Routes
      </Link>
    </div>
  );
}

export default ADasboard;
