//import axios library
const axios = require('axios');

exports.homeRoutes = (req, res) => {
    // render index view
    res.render('index');
}

exports.add_user = (req, res) => {
    //render the add_user view
    res.render('add_user');
}

exports.login = (req, res) => {
    //render the login view
    res.render('login');
}
exports.get_profile = (req, res) => {
    //render the get_profile view
    res.render('get_profile');
}

exports.update_user = (req, res) => {
    //render the update_user view
    res.render('update_user');
}


