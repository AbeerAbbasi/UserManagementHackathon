const Userdb = require('../model/model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty' });
        return;
    }

    //convert name and email to all lower case
    const name = req.body.name.toLowerCase();
    const email = req.body.email.toLowerCase();
    
    const existingUser = await Userdb.findOne({ email: email });  // Use the lowercase email here
    if (existingUser) {
        return res.status(400).send({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password with 10 salt rounds
    // Create new user
    const user = new Userdb({
        name: name,
        email: email,
        password: hashedPassword
    });

    // Save user in the database
    user.save()
        .then(data => {
            res.status(201).send({ message: 'User added successfully' });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}

// User login
exports.login = async (req, res) => {
    //const { email, password } = req.body;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    // Validate input
    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required' });
    }

    try {
        const user = await Userdb.findOne({ email });
        if (!user) { // Assuming plain password check
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token in the response
        return res.json({ token }); 
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send({ message: 'Server error' });
    }
};


// Get user profile with JWT verification
exports.get_profile = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header


    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user from the database
        const user = await Userdb.findById(decoded.id).select('-password'); // Exclude password from response

        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // Return user profile information
        res.send(user);
    } catch (error) {
        res.status(400).send({ message: 'Invalid token.' });
    }
};

// Update user profile with JWT verification
exports.update_user = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header

    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        const user = await Userdb.findByIdAndUpdate(decoded.id, req.body, { new: true, runValidators: true }).select('-password');

        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        res.send(user); // Return updated user profile information
    } catch (error) {
        res.status(400).send({ message: 'Invalid token.' });
    }
};