// Import required modules
const express = require('express');
const bodyParser = require('body-parser');


// Create an Express application
const app = express();
app.use(express.static("public"));

// Use bodyParser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


// In-memory storage for user data (replace this with a database in a real application)
const users = [];

// Set up a simple route for the homepage
app.get('/', (req, res) => {
    res.render("index.ejs")
  });

// Define a route for the sign-up form
app.post('/signup', (req, res) => {
  // Extract user data from the request body
  const { username, email, password } = req.body;

  // Validate user data (add more validation as needed)
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

      // Check if the email is already registered
  // Check if the email is already registered
if (users.some(user => user.email === email)) {
  // Render the user.ejs template with emailExists set to true
  return res.render("user.ejs", { emailExists: true });
}



  // Create a new user object and add it to the in-memory storage
  const newUser = { username, email, password };
  users.push(newUser);

  // Respond with a success message
  res.render("user.ejs");
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`); 
});
