// Importing the Flight model from the models directory
import Flight from '../models/flightModel.js';

// Function to add a new flight record
export const addFlight = async (req, res) => {
    // Destructuring the flight details from the request body
    const { aircraft, startTime, stopTime, notes, duration } = req.body;

    // Creating a new flight instance using the Flight model
    // The user ID is taken from the request object, which is likely populated by some authentication middleware
    const flight = new Flight({
        user: req.user._id,
        aircraft,
        startTime,
        stopTime,
        notes,
        duration
    });

    // Saving the flight instance to the database
    const savedFlight = await flight.save();

    // Sending a 201 (Created) status code along with the saved flight data
    res.status(201).json(savedFlight);
};

// Function to get all flight records for a specific user
export const getUserFlights = async (req, res) => {
    try {
        // Extracting the user ID from the request parameters
        const userId = req.params.userId;

        // Fetching all flights from the database where the user field matches the provided user ID
        const flights = await Flight.find({ user: userId });

        // If no flights are found, send a 404 (Not Found) status code with an appropriate message
        if (!flights || flights.length === 0) {
            res.status(404).json({ message: 'No flights found for this user.' });
            return;
        }

        // Sending the fetched flights as the response
        res.json(flights);
    } catch (error) {
        // If there's an error (e.g., database error), send a 500 (Internal Server Error) status code with an error message
        res.status(500).json({ message: 'Error fetching user flights.', error: error.message });
    }
};
