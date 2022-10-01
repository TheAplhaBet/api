const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_KEY } = require('../../config.json');
const User = require('../../models/user');

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      new User({
        _id: uuid.v4(),
        email: req.body.email,
        password: hash
      }).save().then((result) => {
        res.status(200).json({
          message: 'User Created'
        });
        console.log(result);
      }).catch((err) => {
        console.error(err);
        res.status(500).json({
          error: err
        });
      });
    };
  });
});

router.post('/login', async (req, res, next) => {
  await User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth Failed'
        });
      };

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth Failed'
          });
        };

        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0]._id
          }, JWT_KEY, {
            expiresIn: '1h'
          });
          return res.status(200).json({
            message: 'Auth Successful',
            token: token
          })
        };

        res.status(401).json({
          message: 'Auth Failed'
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;