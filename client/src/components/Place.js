import React, { useEffect } from "react";

function Place() {
  const [routes, setRoutes] = React.useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5500/routes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRoutes(data);
      });
  }, []);

  return (
    <div>
      <h1>Routes</h1>
      <ul>
        {routes.map((route) => (
          <li key={route.id}>{route.departure_time}</li>
        ))}
      </ul>
    </div>
  );
}

export default Place;
