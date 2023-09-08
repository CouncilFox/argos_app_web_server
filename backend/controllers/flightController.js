import Flight from '../models/flightModel.js';

export const addFlight = async (req, res) => {
    const { aircraft, startTime, stopTime, notes, duration } = req.body;

    const flight = new Flight({
        user: req.user._id,
        aircraft,
        startTime,
        stopTime,
        notes,
        duration
    });

    const savedFlight = await flight.save();

    res.status(201).json(savedFlight);
};


