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

export const getUserFlights = async (req, res) => {
    try {
        const userId = req.params.userId;
        const flights = await Flight.find({ user: userId });

        if (!flights) {
            res.status(404).json({ message: 'No flights found for this user.' });
            return;
        }

        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user flights.', error: error.message });
    }
};
