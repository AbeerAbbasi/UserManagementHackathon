Description: The User Management system is a web application built using Node.js, Express, and MongoDB. It allows users to register, log in, view their profile, and update their information. 
The application uses JWT (JSON Web Token) for authentication and secure access to user profile features.

Features Implemented:
1. User Registration
- Users can create a new account by providing their name, email, and password.
- Password is securely hashed before storing it into the database
- The registration form has basic validation for email format and password length.

2. User Login
- Users can log in using their email and password.
- Upon successful login, the server returns a JWT token which is stored in the client for future authenticated requests.

3. User Profile
- After logging in, users can view their profile information (name and email). Passwords are not displayed for security purposes.
- A valid JWT token is required to access the profile page.

4. Update Profile
- Logged-in users can update their profile information, including their name and email.
- The update process also requires a valid JWT token for authentication.

5. Token-based Authentication
- The application uses JWT tokens to manage user sessions.
- Secure endpoints like viewing and updating the user profile require a valid token for access.

6. Responsive UI
- The application uses EJS templates for rendering pages and Bootstrap for styling, ensuring a responsive and user-friendly interface.

Steps Used to Test the Server (after installing MongoDB and Node.js):
- set MONGO_URI in .env file to the current connection string (I have it as Hackathon here).
- ran npm start to start the server, the server was running on http://localhost:3000.
- I attempted to register users with valid input, invalid input, and empty input for name, email, and password. Also tested with emails that already were entered earlier to make sure.
- I checked the local MongoDB Hackathon database to check if input is being entered correctly.
- Tested login, update profile, and user profile the same way.
- Used Postman to test API endpoints and response status codes.
