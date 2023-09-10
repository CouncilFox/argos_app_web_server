import React, { useState, useEffect } from 'react';
import FlightInputForm from '../components/FlightInputForm';
import FlightLogbook from '../components/FlightLogbook';
import { Row, Col } from 'react-bootstrap';

const FlightScreen = () => {
  // State to store the list of flights
  const [flights, setFlights] = useState([]);

  // Function to decode the JWT and extract the userId
const getUserIdFromToken = () => {
    const userInfo = localStorage.getItem('userInfo'); // Get the userInfo item from local storage
    if (!userInfo) return null;
    
    const parsedUserInfo = JSON.parse(userInfo); // Parse the JSON string to an object
    return parsedUserInfo._id; // Return the _id field as the userId
};


  // Function to fetch flights for the logged-in user
  const fetchUserFlights = async () => {
    try {
      const userId = getUserIdFromToken();
      if (!userId) {
        console.error('User ID not found in token.');
        return;
      }

      const response = await fetch(`/api/flights/user/${userId}`);
      const data = await response.json();

      console.log('Hit fetchUserFlights')  
      console.log(data)  

      // If the request is successful, update the flights state
      if (response.ok) {
        setFlights(data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching user flights:', error);
    }
  };

  // Effect to fetch user flights when the component mounts
  useEffect(() => {
    fetchUserFlights();
  }, []);  // Empty dependency array ensures this effect runs only once when the component mounts

  // Function to add a new flight
  const handleAddFlight = async (flight) => {
    try {
      const response = await fetch('/api/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // TODO: Include any authentication headers if required
        },
        body: JSON.stringify(flight)
      });

      const data = await response.json();

      // If the flight is added successfully, update the flights state and refetch the flights
      if (response.ok) {
        setFlights([...flights, data]);
        fetchUserFlights();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error adding flight:', error);
    }
  };

  // Effect to log the flights whenever they change (for debugging purposes)
  useEffect(() => {
    console.log('Flight:')
    console.log(flights);
  }, [flights]);

return (
  <Row>
    {/* For larger screens (md and up), use half the screen (6 of 12 columns) */}
    {/* For smaller screens, take the full width (12 columns) */}
    <Col xs={12} md={6}>
      <FlightInputForm onAddFlight={handleAddFlight} />
    </Col>

    <Col xs={12} md={6}>
      <FlightLogbook flights={flights} />
    </Col>
  </Row>
);}

export default FlightScreen;
