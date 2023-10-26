import React from 'react';

const Home = () => {
    return (
        <div className="container">
            <div className="jumbotron">
                <h1>Welcome to our BusTrack App</h1>

                <p className="lead">Easily reserve your bus tickets with no hassle!</p>
                <p>Using this app, you can effortlessly search for bus routes, verify seat availability and securely complete online reservations.</p>
                <p>Discover a dependable and convenient mode of travel by bus. Commence your journey with us now!</p>

                <button className="btn btn-primary">Book Now</button>
            </div>
        </div>
    );
};

export default Home;