
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PlaceById({ setUserRole }) {
  const [routeDetails, setRouteDetails] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [errors, setErrors] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch("https://bus-tracker.onrender.com/check_user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserRole(data["User_Role"]);
        });
    }
  }, [token, setUserRole]);

  useEffect(() => {
    const fetchRouteDetails = async () => {
      try {
        const response = await fetch(
          `https://bus-tracker.onrender.com/routes/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setRouteDetails(data);
        } else {
          console.error("Failed to fetch route details");
        }
      } catch (error) {
        console.error("Error fetching route details:", error);
      }
    };

    fetchRouteDetails();
  }, [id]);

  const handleSeatSelect = (e) => {
    setSelectedSeat(e.target.value);
  };

  const handleClick = async (busId) => {
    const bookingdata = {
      bus_id: busId,
      seat_number: parseInt(selectedSeat),
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to make a booking.");
        return;
      }

      const response = await fetch(
        "https://bus-tracker.onrender.com/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingdata),
        }
      );
      const responseJson = await response.json();
      console.log(responseJson);
      const booking_id = responseJson["booking_id"];
      console.log(responseJson["booking_id"]);

      if (response.status === 201) {
        alert("Booking has been placed. Proceeding to Payment...");
        navigate(`/payments/${booking_id}`);
      } else if (response.status === 401) {
        setErrors(
          "Seat Number Has Already Been Booked.Please Choose Another one..."
        );
        setTimeout(() => {
          setErrors("");
        }, 2000);
        // alert("Seating Has Already been booked...");
        // } else if (responseJson.error === "Seat Has Already Been Booked...") {
        //   alert("Seat has already been booked. Please choose another one.");
      } else if (response.status === 403) {
        setErrors("Only Customers Should Make A Booking...");
      } else {
        setErrors("There was a problem with your booking.,");
      }
    } catch (error) {
      console.error("Error occurred while making booking:", error);
    }
  };
  if (!routeDetails) {
    return <div>Loading route details...</div>;
  }

  if (routeDetails.length === 0) {
    return <div>Route not found</div>;
  }

  return (
    <>
      <h1 className="text-center mt-2">
        Available Buses From {routeDetails[0]?.start_point} To{" "}
        {routeDetails[0]?.end_point}
      </h1>
      <h2 className="text-center">Price: {routeDetails[0]?.price}</h2>
      <div className="container">
        {errors && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            {errors}{" "}
            <button
              type="button"
              className="btn-close"
              onClick={() => setErrors("")}
              aria-label="Close"
            ></button>
          </div>
        )}
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-2 mb-2">
        {routeDetails[0]?.buses.map((bus) => (
          <div className="col mt-4 mb-4" key={bus.id}>
            <div className="card">
              <div className="card-body">
                <p className="card-text mt-2">
                  <strong>Bus Driver:</strong> {bus.driver}.
                </p>
                <p className="card-text">
                  <strong>Departure Time:</strong> {bus.Departure_Time}.
                </p>
                <p className="card-text">
                  <strong>Number Plate:</strong> {bus.number_plate}.
                </p>
                <p className="card-text">
                  <strong>Seats Remaining:</strong> {bus.available_seats}.
                </p>
                <p className="card-text">
                  <strong>Owners Contact:</strong> {bus.owner_contact}.
                </p>
                <select className="form-select" onChange={handleSeatSelect}>
                  <option value="" disabled>
                    Select a Seat
                  </option>
                  {Array.from(
                    { length: bus.available_seats },
                    (_, index) => index + 1
                  ).map((seatNumber) => (
                    <option key={seatNumber} value={seatNumber}>
                      Seat {seatNumber}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleClick(bus.id)}
                  className="btn btn-dark btn-sm mt-2"
                >
                  Make A Booking Here
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PlaceById;
