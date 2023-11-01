import React, { useState } from "react";
import "./app.css";

function Home() {
  return (
    <>
      <h1 className="text-center mt-4">
        <marquee width="50%">BOOK YOUR TICKET TODAY!</marquee>
      </h1>
      <div className="home-container">
        <div className="card-container">
          <div className="card" style={{ width: "100%", height: "100vh" }}>
            <img src="https://i.ytimg.com/vi/MSPj9fWEQEU/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGE8gWyhlMA8=&rs=AOn4CLAXNT-tIq-yNHzorZLbwV1cVFnX1A" />
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
              <div className="row mb-3 mt-3">
                <label className="radiobtn">
                  <input type="radio" name="gender" value="one-way" />
                  One Way
                </label>
                <label className="radiobtn">
                  <input type="radio" name="gender" value="round-trip" />
                  Return Trip
                </label>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <select
                    className="browser-default custom-select mb-4"
                    id="select-from"
                  >
                    <option value="" disabled="" selected>
                      Choose a Pickup Location
                    </option>
                    <option value="1">Nairobi</option>
                    <option value="2">Mombasa</option>
                    <option value="3">Kisumu</option>
                  </select>
                </div>
                <div className="col-sm-6">
                  <select
                    className="browser-default custom-select mb-4"
                    id="select-to"
                  >
                    <option value="" disabled="" selected>
                      Choose a Destination
                    </option>
                    <option value="1">Nakuru</option>
                    <option value="2">Mombasa</option>
                    <option value="3">Nairobi</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <label for="Departure time">Departure:</label>
                  <input
                    type="datetime-local"
                    id="depaturetime"
                    name="depaturetime"
                  />
                </div>
              </div>
            </div>
          </div>
          <a href="#" className="btn btn-primary float-right mt-5">
            Find Buses
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
