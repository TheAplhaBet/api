const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const { mongooseURI } = require('../config.json');

app.use(express.json())

const userRoutes = require('./routes/user');
const guildRoutes = require('./routes/guilds');

app.use(morgan('dev'))

app.use('/users', userRoutes);
app.use('/dashboard', guildRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
});

app.listen(3000, () => {
  console.log('Server online on port 3000');
  mongoose.connect(mongooseURI, () => {
    console.log('Mongoose connected')
  });
});