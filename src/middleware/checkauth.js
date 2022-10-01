const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../config.json');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_KEY);
    res.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Auth Failed'
    });
  };
};