import React, { useState, useEffect } from 'react';
import FlightInputForm from '../components/FlightInputForm';
import FlightLogbook from '../components/FlightLogbook';

const FlightScreen = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchUserFlights = async () => {
      try {
        // Replace :userId with the actual user ID from the authentication context or token
        const response = await fetch('/api/flights/user/:userId');
        const data = await response.json();

        if (response.ok) {
          setFlights(data);

        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user flights:', error);
      }
    };

    fetchUserFlights();
  }, []);  // The empty dependency array ensures this effect runs only once when the component mounts

  const handleAddFlight = async (flight) => {
    try {
        const response = await fetch('/api/flights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include any authentication headers if required
            },
            body: JSON.stringify(flight)
        });

        const data = await response.json();

        if (response.ok) {
            setFlights([...flights, data]);
            fetchUserFlights();  // Refetch the flights after adding a new one

        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error adding flight:', error);
    }
  };

  useEffect(() => {
    console.log(flights);
}, [flights]);


  return (
    <div>
      <FlightInputForm onAddFlight={handleAddFlight} />
      <FlightLogbook flights={flights} />
    </div>
  );
};

export default FlightScreen;
