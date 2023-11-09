import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import "./App.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Home({ setUserRole }) {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupLocations, setPickupLocations] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [routeDetails, setRouteDetails] = useState([]);
  const token = localStorage.getItem("token")
  // const[role,setRole]=useState('')
  const [error, setError] = useState("");
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
          console.log(data);
        });
    } else {
      console.log("Hello World");
    }
  }, [token,setUserRole]);
  useEffect(() => {
    fetch("http://127.0.0.1:5500/routes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPickupLocations(data);
        setDestinations(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlePickupLocationChange = (e) => {
    const selectedLocationId = e.target.value;
    const selectedLocationName = e.target.options[e.target.selectedIndex].text;
    setPickupLocation({
      id: selectedLocationId,
      start_point: selectedLocationName,
    });
  };

  const handleDestinationChange = (e) => {
    const selectedDestinationId = e.target.value;
    const selectedDestinationName =
      e.target.options[e.target.selectedIndex].text;
    setDestination({
      id: selectedDestinationId,
      end_point: selectedDestinationName,
    });
  };

  const start = encodeURIComponent(pickupLocation.start_point);
  const stop = encodeURIComponent(destination.end_point);
  const fetchRouteDetails = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:5500/routes/?start=${start}&stop=${stop}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data[0].route_id); // Log the response data to check its structure
        setRouteDetails(data);
        if (data[0].route_id) {
          navigate(`/routes/${data[0].route_id}`);
        } else {
          console.error("Route ID not found in the fetched data");
        }
      } else {
        console.error("Failed to fetch route details");
        // alert("Route Does not exist...");
        setError("Route Does Not Exist..");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <h1 className="text-center mt-4">BOOK YOUR TICKET TODAY!!!</h1>
      <div className="home-container">
        <div className="card-container">
          <div className="card" style={{ width: "100%", height: "100vh" }}>
            <img
              src="https://i.ytimg.com/vi/MSPj9fWEQEU/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGE8gWyhlMA8=&rs=AOn4CLAXNT-tIq-yNHzorZLbwV1cVFnX1A"
              alt="Bus"
            />
            <div className="card-body">
              <p className="mt-3">
                <strong>
                  Welcome to our easy and convenient bus booking service!
                  Whether you're planning a weekend getaway or a longer trip,
                  we've got you covered. Choose from various pickup locations,
                  including popular cities and scenic spots. Our buses are
                  comfortable, driven by experts, and come with modern
                  amenities. You can pick your preferred departure time and book
                  your seat hassle-free. Enjoy transparent pricing and real-time
                  availability. Our team is here to help you every step of the
                  way. Book your bus ticket now and embark on a smooth and
                  enjoyable journey!"
                </strong>
              </p>
            </div>
          </div>
          <p className="mt-2">
            <strong>
              Get Started With Us{" "}
              <Link className="text-dark" to="/signup">
                Here
              </Link>
            </strong>
          </p>
        </div>

        <div className="booking-form-container">
          <h2>Booking Form</h2>
          <div
            className="card shadow mb-5 bg-white rounded"
            style={{ width: "100%", height: "100vh" }}
          >
            <div className="card-body">
              <p className="card-title text-center shadow mb-5 rounded">
                Travel Booking Form
              </p>
              {error && (
                <div
                  className="alert alert-danger alert-dismissible"
                  role="alert"
                >
                  {error}{" "}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}
              <div className="icons text-center">
                <i className="fa fa-plane fa-2x" aria-hidden="true"></i>
                <i className="fa fa-taxi fa-2x" aria-hidden="true"></i>
                <i className="fa fa-train fa-2x" aria-hidden="true"></i>
              </div>
              <hr />
              <p className="searchText">
                <strong>Search For Affordable Buses</strong>
              </p>

              <form onSubmit={(e) => fetchRouteDetails(e)}>
                <div className="row">
                  <div className="col-sm-6">
                    <select
                      className="browser-default custom-select mb-4"
                      id="select-from"
                      value={pickupLocation.id || ""}
                      onChange={handlePickupLocationChange}
                    >
                      <option value="" disabled>
                        Choose a Pickup Location
                      </option>
                      {pickupLocations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.start_point}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <select
                      className="browser-default custom-select mb-4"
                      id="select-to"
                      value={destination.id || ""}
                      onChange={handleDestinationChange}
                    >
                      <option value="" disabled>
                        Choose a Destination
                      </option>
                      {destinations.map((destination) => (
                        <option key={destination.id} value={destination.id}>
                          {destination.end_point}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="btn btn-outline-dark btn-sm p-2">
                    Find Buses
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <a href="#" className="btn btn-primary float-right mt-5">
            Find Buses
          </a> */}
        </div>
      </div>
    </>
  );
}

export default Home;
