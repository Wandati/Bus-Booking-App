import React from 'react';

function Home() {
  return (
    <div>
      <h2>Welcome to the Bus Booking App</h2>
      <p>
        Book your bus tickets hassle-free with our user-friendly platform.
        Explore a wide range of routes and find the best deals for your next
        journey.
      </p>

      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="card-link">
            Card link
          </a>
          <a href="#" className="card-link">
            Another link
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
