import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function UsersById({ setUserRole, userRole }) {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const [errors, setErrors] = useState(null);
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
  }, [token, setUserRole]);
  useEffect(() => {
    if (!token || userRole !== "Admin") {
      navigate("/");
    }
  }, [token, navigate, userRole]);

  useEffect(() => {
    if (token) {
      // Fetch the list of users from your API endpoint
      fetch(`http://127.0.0.1:5500/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 401) {
            navigate("/");
          } else {
            throw new Error("Failed to fetch users");
          }
        })
        .then((data) => {
          console.log(data);
          setInfo(data);
        })
        .catch((error) => {
          setErrors(error.message);
        });
    } else {
      navigate("/");
    }
  }, [token, navigate, id]);

  return (
    <div className="container">
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

      {info[0]?.Buses && (
        <>
          <h2 className="text-center mt-3">User Buses..</h2>
          <div className="row mt-4 mb-4">
            {info[0]?.Buses.map((bus) => (
              <div className="col-4 mt-4" key={bus.id}>
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Owner: </strong>
                      {bus.Owner}.
                    </p>
                    <p className="card-text mt-2">
                      <strong>Number_Plate: </strong>
                      {bus.number_plate}.
                    </p>
                    <p className="card-text mt-2">
                      <strong>From: </strong>
                      {bus.From}.
                    </p>
                    <p className="card-text mt-2">
                      <strong>To: </strong>
                      {bus.To}.
                    </p>
                    <p className="card-text mt-2">
                      <strong>Capacity: </strong>
                      {bus.no_of_seats}.
                    </p>
                    <p className="card-text mt-2">
                      <strong>Seats Remaining: </strong>
                      {bus.available_seats}.
                    </p>
                    <p className="card-text mt-2">
                      <strong>Departure Time: </strong>
                      {bus.departure_time}.
                    </p>
                    <p className="card-text mt-2">
                      <strong>Driver: </strong>
                      {bus.driver}.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {info[0]?.Bookings && (
        <>
          <h2 className="text-center mt-3">User Bookings..</h2>
          <div className="row mt-4 mb-4">
            {info[0]?.Bookings.map((book) => (
              <div className="col-4 mt-4" key={book.id}>
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <strong>By: </strong>
                      {book.By}.
                    </p>
                    <p className="card-text">
                      <strong>From: </strong>
                      {book.From}
                    </p>
                    <p className="card-text">
                      <strong>To: </strong>
                      {book.To}.
                    </p>

                    <p className="card-text mt-2">
                      <strong>Departure_Time: </strong>
                      {book.departure_time}.
                    </p>
                    <p className="card-text mt-2">
                      <strong>Confirmed: </strong>
                      {book.is_confirmed ? "Yes" : "No"}.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UsersById;
