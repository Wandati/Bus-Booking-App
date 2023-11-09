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
  const token = localStorage.getItem("token");
  // const[role,setRole]=useState('')
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
          // console.log(data);
        });
    } else {
      // console.log("Hello World");
    }
  }, [token, setUserRole]);

  useEffect(() => {
    fetch("https://bus-tracker.onrender.com/routes")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
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
        `https://bus-tracker.onrender.com/routes/?start=${start}&stop=${stop}`
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        // console.log(data[0].route_id);
        setRouteDetails(data);
        console.log(routeDetails)
        if (data[0].route_id) {
          navigate(`/routes/${data[0].route_id}`);
        } else {
          console.error("Route ID not found in the fetched data");
        }
      } else {
        console.error("Failed to fetch route details");
        // alert("Route Does not exist...");
        setError("Route Does Not Exist..");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="container text-center">
        <h5 className="mt-3">
          Welcome to BusTrack, our easy and convenient bus booking service!
          Whether you're planning a weekend getaway or a longer trip, we've got
          you covered. Choose from various pickup locations, including popular
          cities and scenic spots. Our buses are comfortable, driven by experts,
          and come with modern amenities. You can pick your preferred departure
          time and book your seat hassle-free. Enjoy transparent pricing and
          real-time availability. Our team is here to help you every step of the
          way. Book your bus ticket now and embark on a smooth and enjoyable
          journey!"
        </h5>

        <button className=" btn btn-dark   text-white mt-2">
          <Link className="text-decoration-none text-white" to="/signup">
            Get Started With Us Here
          </Link>
        </button>
        <h2 className="mt-4 mb-4">Our Buses</h2>
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/d2a1d197300713.Y3JvcCwzOTc3LDMxMTAsNTcwLDEzNw.jpg"
                className="img-fluid w-100 mb-3 h-25"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Matatu_Manyanga.jpg"
                className="d-block w-100"
                alt="Bus"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/59b81d96247659.Y3JvcCw0MTQ2LDMyNDMsNjA1LDQyMA.jpg"
                className="d-block w-100"
                alt="Bus"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <h2 className="mt-1 mb-2">Book Your Ticket Here </h2>
        {error && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            {error}{" "}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        <form onSubmit={(e) => fetchRouteDetails(e)}>
          <div className="mb-3">
            <label htmlFor="select-from" className="form-label">
              Choose a Pickup Location
            </label>
            <select
              className="form-select"
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

          <div className="mb-3">
            <label htmlFor="select-to" className="form-label">
              Choose a Destination
            </label>
            <select
              className="form-select"
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

          <button className="btn btn-outline-dark btn-sm">Find Buses</button>
        </form>

        <h3 className="mt-3 mb-5">
          Click{" "}
          <Link className=" text-dark" to="/routes">
            Here
          </Link>{" "}
          To view All The Routes
        </h3>

        {/* <form onSubmit={(e) => fetchRouteDetails(e)}>
          <div className="row">
            <div className="col-sm-4">
              <select
                className="form-select mb-3"
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
            <div className="col-sm-4">
              <select
                className="form-select mb-3"
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
            <div className="col-sm-4">
              <button className="btn btn-outline-dark btn-sm mt-3">
                Find Buses
              </button>
            </div>
          </div>
        </form> */}

        {/* <h1 className="text-center mt-4">BOOK YOUR TICKET TODAY!!!</h1>
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
        </div> */}

        {/* <div className="booking-form-container">
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
              </form> */}
        {/* </div>
          </div> */}
        {/* <a href="#" className="btn btn-primary float-right mt-5">
            Find Buses
          </a> */}
      </div>
      {/* </div> */}
    </>
  );
}

export default Home;
