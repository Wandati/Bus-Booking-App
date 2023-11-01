import React from "react";

function Booking() {
  const [booking, setBooking] = useState();
  useEffect(() => {
    fetch("http:127.0.0.1:5500/buses")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBooking(data);
      });
  });

  return <div>Booking</div>;
}

export default Booking;
