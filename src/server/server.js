/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const apiRouter = require('./apiRoutes');

// Start up an instance of app
const app = express();

/* Middleware*/

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100KB' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

// view route
app.get('/', (req, res) => {
  res.sendFile('/dist/index.html');
});

//API routes
app.use('/api', apiRouter);
