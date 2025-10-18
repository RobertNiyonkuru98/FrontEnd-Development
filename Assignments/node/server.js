// Import express and dotenv to manage environment variables
require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken"); // Import JSON Web Token library

app.use(express.json()); // Middleware to parse JSON bodies

// Example data: list of posts with associated usernames
const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
];

// GET endpoint to fetch posts for the authenticated user
app.get("/posts", authenticateToken, (req, res) => {
  // Only return posts that belong to the authenticated user
  res.json(posts.filter((post) => post.username === req.user.name));
});

// Middleware function to authenticate JWT tokens
function authenticateToken(req, res, next) {
  // Get the Authorization header value (format: "Bearer <token>")
  const authHeader = req.headers["authorization"];
  // Extract the token part from the header
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // No token, unauthorized

  // Verify the token using the secret from environment variables
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token, forbidden
    req.user = user; // Attach user info to request object
    next(); // Continue to the next middleware or route handler
  });
}

// Start the server on port 3000
app.listen(3000);
