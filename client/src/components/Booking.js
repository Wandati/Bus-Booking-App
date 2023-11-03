import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://127.0.0.1:5500/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then((data) => {
          setBookings(data.bookings);
          console.log(data);
        })
        .catch((error) => {
          setError(error.message);
          console.log(error);
        });
    } else {
      // If user is not logged in, redirect to home page
      navigate("/");
      // alert("You Must Be Logged in to View This Page");
    }
  }, [navigate]); // Include navigate in the dependency array to prevent stale closure

  if (bookings.length === 0) {
    return (
      <>
        <h1 className="text-center">No bookings Found...</h1>
        <p className="text-center">
          Make A Booking{" "}
          <Link className="text-decoration-none text-dark" to="/routes">
            <strong>Here</strong>
          </Link>
        </p>
      </>
    );
  }

  return (
    <>
      <h2 className="text-center mt-2">Your Bookings</h2>
      <div className="row mt-4 mb-4">
        {bookings.map((book) => (
          <div className="col-4 mt-4" key={book.booking_id}>
            <div className="card">
              <div className="card-body">
                <p className="card-text mt-2">
                  <strong>From:</strong>
                  {book.start_point}.
                </p>
                <p className="card-text">
                  <strong>To:</strong>
                  {book.end_point}.
                </p>
                <p className="card-text">
                  <strong>Price:</strong>
                  {book.price}.
                </p>
                <p className="card-text">
                  <strong>Seat_No:</strong>
                  {book.seat_number}.
                </p>
                <p className="card-text">
                  <strong>Confirmed:</strong>
                  {book.is_confirmed ? "Yes" : "No"}.
                </p>
                <button className="btn btn-dark btn-sm m-2">Update</button>
                <button className="btn btn-dark btn-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Booking;
