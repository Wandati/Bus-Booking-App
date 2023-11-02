import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function BookingById() {
  const [bus, setbuses] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://127.0.0.1:5500/buses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setbuses(data);
      });
  }, [id]);

  return (
    <div>
      <h1 className="text-center">Please Confirm Your Booking details Here</h1>
       
    </div>
  );
}

export default BookingById;
