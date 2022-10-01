const express = require('express');
const checkauth = require('../middleware/checkauth');
const router = express.Router();

router.get('/', checkauth, (req, res, next) => {
  res.status(200).json({
    message: 'Auth Successful'
  });
  res.send(req.body);
});

module.exports = router;