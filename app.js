require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Database.'))
  .catch(() => console.log('Connection Error.'));

let boothRouter = require('./routes/booth.routes');
let studentRouter = require('./routes/student.routes');

const app = express();

app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  express.static(path.join(__dirname, './static'), { dotfiles: 'allow' })
);

app.use('/booth', boothRouter);
app.use('/student', studentRouter);

// Made by expressjs
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
