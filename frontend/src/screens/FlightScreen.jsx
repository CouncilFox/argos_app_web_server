import React, { useState } from 'react';
import FlightInputForm from '../components/FlightInputForm';
import FlightLogbook from '../components/FlightLogbook';

const FlightScreen = () => {
  const [flights, setFlights] = useState([]);

  const handleAddFlight = (flight) => {
    // Here, you'd make an API call to your backend to save the flight.
    // For now, we'll just add it to the local state.
    setFlights([...flights, flight]);
  };

  return (
    <div>
      <FlightInputForm onAddFlight={handleAddFlight} />
      <FlightLogbook flights={flights} />
    </div>
  );
};

export default FlightScreen;
