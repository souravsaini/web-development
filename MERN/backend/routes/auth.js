const express = require("express");
const router = express.Router();
const { check, validationResult} = require("express-validator");
const { signout, signup } = require("../controllers/auth")

router.get("/signout", signout);

router.post("/signup",[
  //validations
  check("name").isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
  check("email").isEmail().withMessage('email is required'),
  check("password").isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
], signup);

module.exports = router;
