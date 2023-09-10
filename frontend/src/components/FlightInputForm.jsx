import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const FlightInputForm = ({ onAddFlight }) => {
  const [aircraft, setAircraft] = useState('');
  const [startTime, setStartTime] = useState('');
  const [stopTime, setStopTime] = useState('');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('');

  const clearForm = () => {
  setAircraft('');
  setStartTime('');
  setStopTime('');
  setNotes('');
  setDuration('');
  };


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
    // Clear form fields after submission
    setAircraft('');
    setStartTime('');
    setStopTime('');
    setNotes('');
    setDuration('');
  };

 return (
  <Form onSubmit={handleSubmit} className="mb-4">
    <h2>Add a New Flight</h2>
    
    <Form.Group controlId="aircraft" className="mb-3">
      <Form.Label>Aircraft</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter aircraft model or name"
        value={aircraft}
        onChange={(e) => setAircraft(e.target.value)}
        autoFocus
        required
      />
    </Form.Group>

    <Row>
      <Col md={6}>
        <Form.Group controlId="startTime" className="mb-3">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="stopTime" className="mb-3">
          <Form.Label>Stop Time</Form.Label>
          <Form.Control
            type="datetime-local"
            value={stopTime}
            onChange={(e) => setStopTime(e.target.value)}
            required
          />
        </Form.Group>
      </Col>
    </Row>

    <Form.Group controlId="notes" className="mb-3">
      <Form.Label>Notes</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Any additional notes about the flight"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="duration" className="mb-4">
      <Form.Label>Duration (in minutes)</Form.Label>
      <Form.Control
        type="number"
        value={duration}
        readOnly
      />
    </Form.Group>

    <Button variant="primary" type="submit" className="mr-2">
      Add Flight
    </Button>
    <Button variant="light" onClick={clearForm}>
      Clear
    </Button>
  </Form>
);}


export default FlightInputForm;
