// Import the mongoose library for MongoDB interactions
const mongoose = require('mongoose');
// Define a new schema for the User model
var schema = new mongoose.Schema({
    // Define the 'name' field, which is a required string
    name: {
        type: String,
        required: true
    },
    // Define the 'email' field, which is a required and unique string
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Define the 'password' field, which is a required string
    password: {
        type: String,
        required: true
    }
});
// Create the User model using the defined schema
const Userdb = mongoose.model('userdb', schema);
// Export the User model for use in other parts of the applicatio
module.exports = Userdb;