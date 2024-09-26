//import required models
const express = require('express'); //express framework
const route = express.Router(); //create new router instance
const services = require('../services/render'); //import rendering services
const controller = require('../controller/controller'); //import controller functions

// Define routes for rendering pages
route.get('/', services.homeRoutes);
route.get('/add-user', services.add_user);
route.get('/login', services.login);
route.get('/update_profile', services.update_user);
route.get('/get_profile', services.get_profile);

//API routes for user-related operations
route.get('/api/users/profile', controller.get_profile); //user profile data
route.post('/api/users/register', controller.create); //user registration
route.post('/api/users/login', controller.login); //user login
route.put('/api/users/profile', controller.update_user); //Update user profile endpoint

//export the routes for use in other parts of the application
module.exports = route;

