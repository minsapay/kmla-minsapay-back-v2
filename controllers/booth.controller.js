const Booth = require('../models/booth.model');
const Student = require('../models/student.model');

exports.getData = (req, res, next) => {
  Booth.findOne({ id: req.body.id })
    .then((booth) => {
      if (booth.password === req.body.password) {
        res.status(200).json(booth);
      } else {
        res.status(404).json({ message: 'Incorrect password!' });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        message: 'Incorrect ID or Internal error',
      });
    });
};

exports.recordPayment = (req, res, next) => {
  Booth.findById(req.body._id).then((booth) => {
    const refund = req.body.refund || booth.admin;
    const price = refund ? req.body.price : -req.body.price;

    const payment = {
      booth: booth.name,
      item: req.body.item,
      price,
    };

    booth.income -= price;
    booth.save();

    Student.update(
      { id: req.body.id },
      { $push: { history: payment }, $inc: { leftover: price } }
    )
      .then((result) => {
        if (result) {
          res.status(200).json({
            message: 'Recording Successful!',
            updatedIncome: booth.income,
          });
        } else {
          res.status(404).json({ message: 'failed!' });
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          message: 'Wrong ID or Internal error',
        });
      });
  });
};
