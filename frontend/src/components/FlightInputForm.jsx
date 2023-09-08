import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const FlightInputForm = ({ onAddFlight }) => {
  const [aircraft, setAircraft] = useState('');
  const [startTime, setStartTime] = useState('');
  const [stopTime, setStopTime] = useState('');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('');

 useEffect(() => {
    if (startTime && stopTime) {
      const start = new Date(startTime);
      const stop = new Date(stopTime);
      const difference = (stop - start) / (1000 * 60); // difference in minutes
      setDuration(difference);
    }
  }, [startTime, stopTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddFlight({ aircraft, startTime, stopTime, notes, duration });
  };



  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="aircraft">
        <Form.Label>Aircraft</Form.Label>
        <Form.Control 
          type="text" 
          value={aircraft} 
          onChange={(e) => setAircraft(e.target.value)} 
        />
      </Form.Group>

      <Row>
        <Col>
          <Form.Group controlId="startTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control 
              type="datetime-local" 
              value={startTime} 
              onChange={(e) => setStartTime(e.target.value)} 
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="stopTime">
            <Form.Label>Stop Time</Form.Label>
            <Form.Control 
              type="datetime-local" 
              value={stopTime} 
              onChange={(e) => setStopTime(e.target.value)} 
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="notes">
        <Form.Label>Notes</Form.Label>
        <Form.Control 
          type="text" 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
        />
      </Form.Group>

      <Form.Group controlId="duration">
        <Form.Label>Duration (in minutes)</Form.Label>
        <Form.Control 
          type="number" 
          value={duration} 
          readOnly
        />
      </Form.Group>

      <Button variant="primary" type="submit">Add Flight</Button>
    </Form>
  );
};

export default FlightInputForm;
