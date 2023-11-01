import React, { useEffect, useState } from "react";

function Bus() {
  const [bus, setBus] = useState();
  useEffect(() => {
    fetch("http:127.0.0.1:5500/buses")
      .then((res) => res.json())
      .then((data) => {
      console.log(data)
      setBus(data)});
  });
  return <div>Bus</div>;
}

export default Bus;
