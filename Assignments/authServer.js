// Import express and dotenv to manage environment variables
require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken"); // Import JSON Web Token library

app.use(express.json()); // Middleware to parse JSON bodies

// Store refresh tokens in memory (in production, use a database)
let refreshTokens = [];

// Endpoint to generate a new access token using a refresh token
app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401); // No token provided
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403); // Token not found

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    // Generate a new access token for the user
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

// Endpoint to delete (logout) a refresh token
app.delete("./logout", (req, res) => {
  // Remove the token from the list of valid refresh tokens
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204); // No content, successful logout
});

// Endpoint to login and receive access and refresh tokens
app.post("/login", (req, res) => {
  // In a real app, authenticate the user here

  const username = req.body.username;
  const user = { name: username };

  // Generate access and refresh tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken); // Store the refresh token
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

// Helper function to generate an access token with a short expiry
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" });
}

// Start the server on port 4000
app.listen(4000);
