const express = require ('express');
const morgan = require ('morgan');
const dotenv = require ('dotenv');
dotenv.config ();

const AppError = require ('./utils/appError');
const globalErrorHandler = require ('./controllers/errorController');
const tourRouter = require ('./routes/tourRoutes');
const userRouter = require ('./routes/userRoutes');

const app = express ();

//middleware
if (process.env.NODE_ENV === 'development') {
  app.use (morgan ('dev')); //http request logger middleware
}

app.use (express.json ());

//routes
app.use ('/api/v1/tours', tourRouter);
app.use ('/api/v1/users', userRouter);

//catch all route
app.all ('*', (req, res, next) => {
  next (new AppError (`can't find ${req.originalUrl} on this server`, 404)); //anything passed inside next() will be considered as error and other middlewares will be skipped
  //only global errr handling middleware will be called.
});

//global error handling middleware
app.use (globalErrorHandler);

module.exports = app;
