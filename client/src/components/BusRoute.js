import React, { useState, useEffect } from 'react';

    const BusRoute = () => {
        const [routes, setRoutes] = useState([]);

        useEffect(() => {
        fetchRoutes();
    }, []);

    const fetchRoutes = async () => {
        try {
            const response = await fetch('');
            const data = await response.json();
            setRoutes(data);
        } catch (error) {
            console.log(error);
        }
  };

  return (
    <div>
      <h2>Routes</h2>
      <ul>
        {routes.map((route) => (
          <li key={route.id}>
            <p>Source: {route.source}</p>
            <p>Destination: {route.destination}</p>
            <p>Distance: {route.distance} km</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusRoute;