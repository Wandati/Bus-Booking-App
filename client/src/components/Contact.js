import React from "react";
import { useEffect } from "react";
function ContactUs({setUserRole}) {
  const token=localStorage.getItem("token")
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
  }, [token,setUserRole]);
  return (
    <div className="text-center mb-5 mt-2">
      <h1 className="mb-5">Contact Us</h1>
      <p>
        If you have any questions or feedback, please feel free to contact us:
      </p>

      <div>
        <strong>Email:</strong>{" "}
        <a
          className="text-decoration-none text-dark"
          href="kenyanhuan@gmail.com"
        >
          huan@gmailcom
        </a>
      </div>

      <div>
        <strong>Phone:</strong>{" "}
        <a className="text-decoration-none text-dark" href="tel:+2547897653">
          +2547-456-789
        </a>
      </div>

      <div>
        <strong>Address:</strong> 111 Main Street, City, Country
      </div>
    </div>
  );
}

export default ContactUs;
