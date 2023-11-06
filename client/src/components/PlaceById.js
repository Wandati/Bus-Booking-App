import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PlaceById() {
  const [routeDetails, setRouteDetails] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRouteDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5500/routes/${id}`);
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

      const response = await fetch("http://127.0.0.1:5500/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingdata),
      });
      const responseJson = await response.json();
      console.log(responseJson);

      if (response.status === 201) {
        alert("Booking has been placed. Proceeding to Payment...");
        navigate(`/payments/${busId}`);
      } else if (response.status === 401) {
        alert("Seating Has Already been booked...");
        // } else if (responseJson.error === "Seat Has Already Been Booked...") {
        //   alert("Seat has already been booked. Please choose another one.");
      } else {
        console.log("There was a problem with your booking.,");
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
      <div className="row mt-2 mb-2">
        {routeDetails[0]?.buses.map((bus) => (
          <div className="col-4 mt-4 mb-4" key={bus.id}>
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
