require("dotenv").config()

const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");

//DB Connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then( () => {
  console.log("DB connected!")
}).catch( () => {
  console.log("DB connection failed!")
});

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api", authRoutes);

//Port
const port = process.env.PORT || 3000;

//Starting the server
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
