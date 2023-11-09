import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Place({setUserRole}) {
  const [routes, setRoutes] = useState([]);
  const [query, setQuery] = useState("");
  const token=localStorage.getItem("token")
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
          console.log(data);
        });
    } else {
      console.log("Hello World");
    }
  }, [token,setUserRole]);

  useEffect(() => {
    fetch("http://127.0.0.1:5500/routes")
      .then((res) => res.json())
      .then((data) => {
        setRoutes(data);
      });
  }, []);

  const filteredRoutes = routes.filter((route) => {
    return (
      route.start_point.toLowerCase().includes(query.toLowerCase()) ||
      route.end_point.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <>
      <h1 className="text-center">Our Routes</h1>
      <div className="col-6 mx-auto my-auto search-box mb-2 mt-2">
        <div className="input-group form-container">
          <input
            type="text"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control search-input"
            autoFocus="autofocus"
            placeholder="Search For Routes Here"
          />
        </div>
      </div>
      <div className="row mt-4 mb-4">
        {filteredRoutes.map((route) => (
          <div className="col-4 mt-4" key={route.id}>
            <div className="card">
              <div className="card-body">
                <p className="card-text mt-2">
                  <strong>From:</strong>
                  {route.start_point}.
                </p>
                <p className="card-text">
                  <strong>To:</strong>
                  {route.end_point}.
                </p>
                <p className="card-text">
                  <strong>Price:</strong>
                  {route.price}.
                </p>
                <button className="btn btn-dark btn-sm">
                  <Link
                    className="text-decoration-none text-white"
                    to={`/routes/${route.id}`}
                  >
                    Click Here to view the Available Buses
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Place;
