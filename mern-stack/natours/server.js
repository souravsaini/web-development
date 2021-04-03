const mongoose = require ('mongoose');
const app = require ('./app');

process.on ('uncaughtException', err => {
  console.log ('UNACUGHT EXCEPTION', err.name, err.message);
  process.exit (1);
});

const DB = process.env.DB.replace ('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect (DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then (() => console.log ('DB connection successful'));

const port = 3000;
const server = app.listen (process.env.PORT || port, () => {
  console.log (`app running on port ${port}`);
});

process.on ('unhandledRejection', err => {
  console.log ('UNHANDLED EXCEPTION', err.name, err.message);
  server.close (() => {
    process.exit (1);
  });
});
