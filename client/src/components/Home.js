import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import "./app.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupLocations, setPickupLocations] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [routeDetails, setRouteDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://127.0.0.1:5500/routes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Assuming data is an array of objects with start_point and end_point properties
        setPickupLocations(data);
        setDestinations(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // useEffect(() => {
  //   // Fetch pickup locations and destinations data from your API endpoint
  //   // Example API call using fetch:
  //   fetch("http://127.0.0.1:5500/routes")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setPickupLocations(data[0].start_point);
  //       setDestinations(data[0].end_point);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   props.history.push(`/routes?start=${pickupLocation}&end=${destination}`);
  // };
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

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   if (pickupLocation && destination) {
  //     props.history.push(
  //       `/routes?start=${pickupLocation.start_point}&end=${destination.end_point}`
  //     );
  //   } else {
  //     // Handle error, show message to user, etc.
  //   }
  // };
  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   if (pickupLocation && destination) {
  //     fetchRouteDetails();
  //   } else {
  //     console.log(pickupLocation.start_point, destination.end_point);
  //     // Handle error, show message to user, etc.
  //   }
  // };
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
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const fetchRouteDetails = () => {
  //   fetch(`http://127.0.0.1:5500/routes/?start=${start}&stop=${stop}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setRouteDetails(data);
  //       console.log(routeDetails);
  //       if (data.route_id) {
  //         navigate(`/routes/${data.route_id}`);
  //       } else {
  //         console.error("Route ID not found in the fetched data");
  //       }
  //     })
  //     .catch((err) => console.log("Error fetching data", err));
  // };

  // const fetchRouteDetails = () => {
  //   fetch(`http://127.0.0.1:5500/routes/?start=${start}&stop=${stop}`)
  //     .then((res) => res.json())
  //     .then((data) => setRouteDetails(data))
  //     .catch((err) => console.log("Error fetching data", err));

  //   console.log(routeDetails);

  //   if (routeDetails) {
  //     navigate(`/routes/${routeDetails.route_id}`);
  //   }
  // };

  // const fetchRouteDetails = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:5500/routes/?start=${start}&stop=${stop}`
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setRouteDetails(data);
  //     } else {
  //       console.error("Failed to fetch route details");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching route details:", error);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch route details when start and stop values change
  //   fetchRouteDetails();
  // }, [start, stop]);

  // useEffect(() => {
  //   // Navigate to the route page when routeDetails is updated
  //   if (routeDetails && routeDetails.route_id) {
  //     navigate(`/routes/${routeDetails.route_id}`);
  //   }
  // }, [routeDetails, navigate]);

  // const fetchRouteDetails = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:5500/routes/?start=${start}&stop=${stop}`
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setRouteDetails(data);
  //     } else {
  //       console.error("Failed to fetch route details");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching route details:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (routeDetails) {
  //     console.log(routeDetails);
  //     navigate(`/routes/${routeDetails.route_id}`);
  //   }
  // }, [routeDetails, navigate]);

  // useEffect(() => {
  //   fetchRouteDetails();
  // }, [start, stop]); // Ensure fetchRouteDetails is called when start or stop changes

  // const start = encodeURIComponent(pickupLocation.start_point);
  // const stop = encodeURIComponent(destination.end_point);
  // const fetchRouteDetails = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:5500/routes/?start=${start}&stop=${stop}`
  //     );
  //     if (response.ok) {
  //       const data = await response.json();

  //       setRouteDetails(data);
  //       console.log(routeDetails);
  //       navigate(`/routes/${routeDetails.route_id}`);
  //     } else {
  //       console.error("Failed to fetch route details");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching route details:", error);
  //   }
  // };

  return (
    <>
      <h1 className="text-center mt-4">
        <marquee width="50%">BOOK YOUR TICKET TODAY!!!</marquee>
      </h1>
      <div className="home-container">
        <div className="card-container">
          <div className="card" style={{ width: "100%", height: "100vh" }}>
            <img
              src="https://i.ytimg.com/vi/MSPj9fWEQEU/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGE8gWyhlMA8=&rs=AOn4CLAXNT-tIq-yNHzorZLbwV1cVFnX1A"
              alt="A bus Image"
            />
            <div className="card-body"></div>
          </div>
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
              <div className="icons text-center">
                <i className="fa fa-plane fa-2x" aria-hidden="true"></i>
                <i className="fa fa-taxi fa-2x" aria-hidden="true"></i>
                <i className="fa fa-train fa-2x" aria-hidden="true"></i>
              </div>
              <hr />
              <p className="searchText">
                <strong>Search For Affordable Buses</strong>
              </p>
              {/* <form onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="col-sm-6">
                    {/* <select
                      className="browser-default custom-select mb-4"
                      id="select-from"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                    > */}
              {/* <select
                      className="browser-default custom-select mb-4"
                      id="select-from"
                      value={pickupLocation.id}
                      onChange={(e) =>
                        setPickupLocation({
                          id: e.target.value,
                          start_point:
                            e.target.options[e.target.selectedIndex].text,
                        })
                      }
                    >
                      <option value="" disabled="" selected>
                        Choose a Pickup Location
                      </option>
                      {pickupLocations &&
                        pickupLocations.map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.start_point}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-sm-6"> */}
              {/* <select
                      className="browser-default custom-select mb-4"
                      id="select-to"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    > */}
              {/* <select
                      className="browser-default custom-select mb-4"
                      id="select-to"
                      value={destinations.id}
                      onChange={(e) =>
                        setDestinations({
                          id: e.target.value,
                          end_point:
                            e.target.options[e.target.selectedIndex].text,
                        })
                      }
                    >
                      <option value="" disabled="" selected>
                        Choose a Destination
                      </option>
                      {destinations &&
                        destinations.map((destination) => (
                          <option key={destination.id} value={destination.id}>
                            {destination.end_point}
                          </option>
                        ))}
                    </select>
                  </div>
                  <button className="btn btn-outline-dark btn-sm">
                    Find Buses
                  </button>
                </div>
              </form> */}
              <form onSubmit={(e) => fetchRouteDetails(e)}>
                <div className="row">
                  <div className="col-sm-6">
                    <select
                      className="browser-default custom-select mb-4"
                      id="select-from"
                      value={pickupLocation.id}
                      onChange={handlePickupLocationChange}
                    >
                      <option value="" disabled="" selected>
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
                      value={destination.id}
                      onChange={handleDestinationChange}
                    >
                      <option value="" disabled="" selected>
                        Choose a Destination
                      </option>
                      {destinations.map((destination) => (
                        <option key={destination.id} value={destination.id}>
                          {destination.end_point}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="btn btn-outline-dark btn-sm">
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
