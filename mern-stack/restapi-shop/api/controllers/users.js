const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');

const User = require ('../models/user');

exports.signup = (req, res, next) => {
  bcrypt.hash (req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status (500).json ({
        error: err.message,
      });
    } else {
      const user = new User ({
        email: req.body.email,
        password: hash,
      });
      user
        .save ()
        .then (result => {
          res.status (201).json ({
            message: 'user created',
          });
        })
        .catch (err => {
          res.status (500).json ({
            error: err.message,
          });
        });
    }
  });
};

exports.login = (req, res, next) => {
  User.findOne ({email: req.body.email}).then (user => {
    if (!user) {
      return res.status (401).json ({
        message: 'auth failed',
      });
    }
    bcrypt.compare (req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status (401).json ({
          message: 'auth failed',
        });
      }
      if (result) {
        const token = jwt.sign (
          {
            email: user.email,
            userId: user._id,
          },
          'secret',
          {
            expiresIn: '1h',
          }
        );
        return res.status (200).json ({
          message: 'auth successful',
          token,
        });
      }
      return res.status (401).json ({
        message: 'auth failed',
      });
    });
  });
};

exports.deleteUser = (req, res, next) => {
  User.findByIdAndRemove (req.params.id)
    .then (resp => {
      res.status (204).json ({
        message: 'user deleted',
      });
    })
    .catch (err => {
      res.status (500).json ({
        error: err.message,
      });
    });
};
