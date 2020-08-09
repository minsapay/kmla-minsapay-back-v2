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
    // // 관리자(금융정보부)이면 환불이 가상의 돈을 깎는 거임
    const refund = booth.isAdmin ? !req.body.refund : req.body.refund;

    // 학생 기준으로 돈이 얼마나 청구되는지
    const price = refund ? -req.body.price : req.body.price;

    Student.findOne({ id: req.body.id })
      .then((student) => {
        const boothHistory = {
          student: student.name,
          item: req.body.item,
          price: price,
        };

        const studentHistory = {
          booth: booth.name,
          item: req.body.item,
          price: -price,
        };

        booth.income += price;
        student.leftover -= price;

        booth.history.push(boothHistory);
        student.history.push(studentHistory);

        booth.save();
        student.save();

        res.status(200).json({
          message: 'Recording Successful!',
          updatedIncome: price,
          updatedHistory: boothHistory,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          message: 'Wrong ID or Internal error',
        });
      });
  });
};
