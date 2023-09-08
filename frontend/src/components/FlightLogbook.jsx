import React from 'react';
import { Table } from 'react-bootstrap';

const FlightLogbook = ({ flights }) => {
  return (
    <div>
      <h2>Your Flight Logbook</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Aircraft</th>
            <th>Start Time</th>
            <th>Stop Time</th>
            <th>Duration (minutes)</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{flight.aircraft}</td>
              <td>{flight.startTime}</td>
              <td>{flight.stopTime}</td>
              <td>{flight.duration}</td>
              <td>{flight.notes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FlightLogbook;
