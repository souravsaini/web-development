const { check, validationResult} = require("express-validator");
const User = require("../models/user");

exports.signout = (req, res) => {
  console.log("REQ BODY:", req.body);
  res.json({
    message: "User signout works"
  })
}

exports.signup = (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()[0].msg });
  }

  const user = new User(req.body)
  user.save( (err, user) => {
    if(err) {
      return err.status(400).json({
        err: "Not able to save user in DB"
      })
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    })
  })
}
