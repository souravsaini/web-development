const express = require ('express');

const {signup, login, deleteUser} = require ('../controllers/users');
const isAuth = require ('../middleware/auth');

const router = express.Router ();

router.post ('/signup', signup);

router.post ('/login', login);

router.delete ('/:id', isAuth, deleteUser);

module.exports = router;
