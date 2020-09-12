var express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const config = require("./config/key");

const { User } = require("./models/user");
const { auth } = require("./middleware/auth");
const app = express();


mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {
  console.log("DB connected");
})
.catch(err => console.log(err));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("hello world!")
});

app.get("/api/user/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role
  })
})

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save( (err, userData) => {
    if(err)
      return res.status(400).json({ success: false})
  });
  return res.status(200).json({ success: true});
});

app.post("/api/users/login", (req, res) => {
  //find the email
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user)
      return res.status(403).json({
        loginSuccess: false,
        message: "Auth failed, email not found"
      })

      //compare the password
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch) {
          return res.status(403).json({
            loginSuccess: false,
            message: "Auth failed, wrong password"
          })
        }
        //generate token
        user.generateToken( (err, user) => {
          if(err)
            return res.status(400).send(err);
          res.cookie("x_auth", user.token).status(200).json({
            loginSuccess: true,
            message: "Auth succeeded"
          })
        })
      })
  })
})

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id}, { token: ""}, (err, user) => {
    if(err)
      return res.json({
        success: false,
        err
      })
    return res.status(200).json({
      success: true
    })
  })
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
