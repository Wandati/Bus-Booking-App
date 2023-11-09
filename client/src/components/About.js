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
          // console.log(data);
        });
    } else {
      // console.log("Hello World");
    }
  }, [token, setUserRole]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">About Us</h2>
      <p>
        Welcome to BusTrack, your go-to platform for hassle-free bus bookings!
        At BusTrack, we're dedicated to providing you with a seamless and
        enjoyable travel experience. Whether you're planning a weekend getaway
        or a long journey, we've got you covered.
      </p>
      <p>
        Our mission is to simplify bus travel by offering a user-friendly online
        booking system. With a wide network of bus operators, we ensure
        availability, convenience, and safety for every passenger. We pride
        ourselves on reliable service and affordable fares.
      </p>
      <p>
        At BusTrack, we value your time and comfort. Our easy-to-use website and
        mobile app allow you to browse routes, check bus schedules, and secure
        your seat with just a few clicks. We prioritize your safety and
        well-being, partnering with trusted bus operators who adhere to
        stringent safety standards.
      </p>
      <p>
        Thank you for choosing BusTrack for your travel needs. We look forward
        to serving you and making your journey a memorable one. Safe travels!
      </p>
    </div>
  );
};

export default About;