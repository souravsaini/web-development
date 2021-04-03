const express = require ('express');
const app = express ();
const morgan = require ('morgan');
const mongoose = require ('mongoose');

const productRoutes = require ('./api/routes/products');
const orderRoutes = require ('./api/routes/orders');
const userRoutes = require ('./api/routes/users');

//body parser middleware
app.use (express.json ());

//CORS middleware
app.use ((req, res, next) => {
  res.header ('Access-Control-Allow-Origin', '*');
  res.header (
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header (
      'Access-Control-Allow-Methods',
      'PUT, POST, DELETE, PATCH, GET'
    );
    return res.status (200).json ({});
  }
  next ();
});

mongoose.connect (
  'mongodb://localhost:27017/restapi-shop',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log ('DB is connected');
  }
);

//logging middleware
app.use (morgan ('dev'));
app.use ('/uploads', express.static ('uploads'));

app.use ('/products', productRoutes);
app.use ('/orders', orderRoutes);
app.use ('/user', userRoutes);

//error handling middleware
app.use ((req, res, next) => {
  const error = new Error ('not found');
  error.status = 404;
  next (error);
});

app.use ((error, req, res, next) => {
  res.status (error.status || 500).json ({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
