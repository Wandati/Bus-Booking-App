import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
function Payment({ userRole }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!token || userRole !== "Customer") {
      navigate("/");
    }
  }, [token, navigate, userRole]);
  const handlePayment = () => {
    fetch(`http://127.0.0.1:5500/confirm_booking?booking_id=${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {
        console.log(data);
        alert("Payment Successful...");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to confirm payment. Please try again.");
      });
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Please Confirm Your Payment Here</h2>

      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Phone Number
        </label>
        <input
          type="tel"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder=""
        />
      </div>
      <button onClick={handlePayment} className="btn btn-success mb-5">
        Confirm Payment
      </button>
    </div>
  );
}

export default Payment;
