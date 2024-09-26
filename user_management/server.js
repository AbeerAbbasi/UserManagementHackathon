const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const bodyparser=require('body-parser');
const path=require('path');
const connectDB = require('./server/database/connection');


// Load environment variables from .env file
dotenv.config();
// Log the MongoDB URI to the console for debugging purposes
console.log('MongoDB URI:', process.env.MONGO_URI);
// Initialize the Express application
const app = express();
// Define the port for the server to listen on, defaulting to 8080 if not specified
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));
//connect to MongoDB
connectDB();
//parse using bodyparser
app.use(bodyparser.urlencoded({extended:true}));
//middleware to parse json bodies
app.use(express.json());


//set the view engine
app.set("view engine", "ejs");

//load the assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

//load the routes
app.use('/', require('./server/routes/router'));

// Start the server and listen on the specified PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

