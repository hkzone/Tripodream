/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const apiRouter = require('./apiRoutes');

// Start up an instance of app
const app = express();

//For HEROKU
app.enable('trust proxy');

// 1) GLOBAL MIDDLEWARES

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100KB' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Set security HTTP headers
app.use(helmet());

//Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour',
});
app.use('/api', limiter);

//Data sanitization against XSS
app.use(xss());

//compress response bodies
app.use(compression());

//2) ROUTES

// view route
app.get('/', (req, res) => {
  res.sendFile('/dist/index.html');
});

//API routes
app.use('/api', apiRouter);

// 3)Setup Server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

// 4)For heroku deployment
const shutdown = (signal) => (err) => {
  console.log(`${signal}...`);
  if (err) console.error(err.stack || err);
  setTimeout(() => {
    console.log('...waited 5s, exiting.');
    process.exit(err ? 1 : 0);
  }, 5000).unref();
};
process
  .on('SIGTERM', shutdown('SIGTERM'))
  .on('SIGINT', shutdown('SIGINT'))
  .on('uncaughtException', shutdown('uncaughtException'));
