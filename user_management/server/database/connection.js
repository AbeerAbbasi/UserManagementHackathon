// Import the mongoose library for MongoDB interactions
const mongoose = require('mongoose');
// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using the connection URI from environment variables
        const con = await mongoose.connect(process.env.MONGO_URI);
        // Log a success message with the host name of the connected databas
        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (err) {
        // If there is an error during connection, log the error message
        console.error(err);
        // Exit the process with a failure cod
        process.exit(1);
    }
};
// Export the connectDB function for use in other files
module.exports = connectDB;

