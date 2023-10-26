import React from 'react';
import './app.css';


function Home() {
  return (
    <div className="home-container">
  <div className="card-container">
  <div className="card" style={{ width: '100%', height: '100vh' }}>
      <img src="https://i.ytimg.com/vi/MSPj9fWEQEU/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGE8gWyhlMA8=&rs=AOn4CLAXNT-tIq-yNHzorZLbwV1cVFnX1A" />
      <div className="card-body">
        </div>
      </div>
      </div>

      <div className="booking-form-container">
        <h2>Booking Form</h2>
        {/* Add your booking form components here */}
      </div>
    </div>
  );
}

export default Home;
