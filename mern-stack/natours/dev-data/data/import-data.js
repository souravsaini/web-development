const mongoose = require ('mongoose');
const fs = require ('fs');
const dotenv = require ('dotenv');
dotenv.config ();
const Tour = require ('../../models/tourModel');

const DB = process.env.DB.replace ('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect (DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then (() => console.log ('DB connection successful'));

const tours = JSON.parse (
  fs.readFileSync (`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create (tours);
    console.log ('data successfully loaded');
  } catch (err) {
    console.log (err.message);
  }
  process.exit ();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany ();
    console.log ('data successfully deleted');
  } catch (err) {
    console.log (err.message);
  }
  process.exit ();
};

if (process.argv[2] === '--import') {
  importData ();
}
if (process.argv[2] === '--delete') {
  deleteData ();
}
