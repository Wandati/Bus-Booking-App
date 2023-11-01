import React from 'react';

const BusRoute = () => {
    const routes = [
        { id: 1, source: 'Nairobi', destination: 'Mombasa', distance: 250 },
        { id: 2, source: 'Naivasha', destination: 'Limuru', distance: 100 },
        { id: 3, source: 'Nakuru', destination: 'Kisumu', distance: 400 },

        // Add more routes as needed
    ];

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