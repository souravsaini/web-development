const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth")

router.get("/signout", signout);

router.post("/signup",[
  //validations
  check("name").isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
  check("email").isEmail().withMessage('email is required'),
  check("password").isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
], signup);

router.post("/signin",[
  //validations
  check("email").isEmail().withMessage('email is required'),
  check("password").isLength({ min: 5 }).withMessage('password field is required'),
], signin);

//router.get('/testroute', isSignedIn, (req, res) => {
//  res.send("A protected route")
//});

module.exports = router;
