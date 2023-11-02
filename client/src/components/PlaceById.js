import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function PlaceById() {
  const [routeDetails, setRouteDetails] = useState(null);
  const { id } = useParams();

  // const handleBooking=()=>{
  //   const seatNumber = prompt('Please enter your desired seat number:', ''); // Display a prompt to get the seat number from the user
  //   if (seatNumber !== null) {
  //     // Handle the selected seat number, for example, you can use it to make a booking
  //     alert(`You have selected seat number ${seatNumber}. Booking confirmed!`);
  //   } else {
  //     // Handle the case when the user cancels the prompt
  //     alert('Booking canceled.');
  //   }
  // }

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

  if (!routeDetails) {
    return <div>Loading route details...</div>;
  }

  if (routeDetails.length === 0) {
    return <div>Route not found</div>;
  }

  return (
    <>
      <h1 className="text-center mt-2">
        Available Buses From {routeDetails[0].start_point} To{" "}
        {routeDetails[0].end_point}
      </h1>
      <h2 className="text-center">Price: {routeDetails[0].price}</h2>
      <div className="row mt-2 mb-2">
        {routeDetails[0].buses.map((bus) => (
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
                  <strong>Owners_Contact:</strong> {bus.owner_contact}.
                </p>
                <button className="btn btn-dark btn-sm">
                  <Link
                    className="text-decoration-none text-white"
                    to={`/bookings/${bus.id}`}
                    // onClick={handleBooking}
                  >
                    Make A Booking Here
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

export default PlaceById;
