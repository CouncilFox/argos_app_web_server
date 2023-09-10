import React, { useState, useEffect } from 'react';
import { Card, Button, Dropdown, Container } from 'react-bootstrap';
import { FaPlane, FaClock, FaStickyNote } from 'react-icons/fa';

import './FlightLogbook.css'; // Import your custom CSS for styling

function formatDate(date) {
  const options = { year: '2-digit', month: 'long', day: '2-digit' };
  return date.toLocaleDateString(undefined, options);
}

const FlightLogbook = ({ flights }) => {
  const [sortedFlights, setSortedFlights] = useState([]);
  const [activeFlightIndex, setActiveFlightIndex] = useState(null);

  useEffect(() => {
    handleSort('startTime'); // Default sort method on first render
  }, [flights]);

  const handleSort = (criteria) => {
    const sorted = [...flights].sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
    setSortedFlights(sorted);
  };

  return (
    <Container className="flight-logbook-container">
      <h2 className="flight-logbook-title">Your Flight Logbook</h2>
      <Dropdown onSelect={handleSort} className="flight-logbook-dropdown">
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="startTime">Start Time</Dropdown.Item>
          <Dropdown.Item eventKey="stopTime">Stop Time</Dropdown.Item>
          <Dropdown.Item eventKey="duration">Duration</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {sortedFlights.map((flight, index) => (
        <Card key={index} className={`flight-card ${activeFlightIndex === index ? 'active' : ''}`}>
            <Card.Header className="flight-card-header">
                <Button
                    variant="link"
                    onClick={() => setActiveFlightIndex(activeFlightIndex === index ? null : index)}
                >
                    <FaPlane /> {flight.duration} minute flight of the {flight.aircraft} on {formatDate(new Date(flight.startTime))}
                </Button>
            </Card.Header>
            {activeFlightIndex === index && (
                <Card.Body>
                    <p><strong>Aircraft:</strong> {flight.aircraft}</p>
                    <p><strong>Duration:</strong> {flight.duration} minutes</p>
                    <p><FaStickyNote /> {flight.notes}</p>
                </Card.Body>
            )}
        </Card>
    ))}
    </Container>
  );
};

export default FlightLogbook;
