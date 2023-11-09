import React from "react";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
const About = ({ setUserRole }) => {
  const token = localStorage.getItem("token");
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
  return (
    <div className="text-center mb-5 mt-2">
      <h1 className="mb-5">About Us</h1>
      <p>
        Welcome to our Bus Booking Service App! We strive to provide a seamless
        and convenient bus booking experience for our users.
      </p>

      <p>
        With our app, you can easily search for bus routes, check for seat
        availability and make secure online bookings.
      </p>

      <p>
        Feel free to reach out to us if you have any questions or feedback. Your
        Travel, Our Priority!!
      </p>
    </div>
  );
};

export default About;
