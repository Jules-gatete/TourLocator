import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faHome, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">TourLocator</div>
    <ul className="navbar-links">
      <li><a href="#home"><FontAwesomeIcon icon={faHome} /> Home</a></li>
      <li><a href="#about"><FontAwesomeIcon icon={faInfoCircle} /> About</a></li>
      <li><a href="#contact"><FontAwesomeIcon icon={faEnvelope} /> Contact</a></li>
    </ul>
  </nav>
);

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2024 TourLocator. All rights reserved.</p>
  </footer>
);

const App = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setError(null);
      },
      (error) => {
        setError(`Error retrieving location: ${error.message}`);
      }
    );
  };

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <div className="home-message">
          <h1>Welcome to TourLocator</h1>
          <p>Your ultimate companion for discovering your exact location while traveling!</p>
        </div>
        <div className="card">
          <h2 className="card-title">Find Your Location</h2>
          <p className="card-description">Click the button below to get your current coordinates.</p>
          <button className="btn" onClick={getLocation}>
            Get Location <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginLeft: '5px' }} />
          </button>
          {error && <p className="error-message">{error}</p>}
          {location && (
            <div className="location-info">
              <p>Latitude: {location.latitude.toFixed(6)}</p>
              <p>Longitude: {location.longitude.toFixed(6)}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;