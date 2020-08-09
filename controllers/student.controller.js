const Student = require('../models/student.model');

exports.getData = (req, res, next) => {
  Student.findOne({ id: req.params.id })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Not found!' });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        message: 'Wrong ID or Internal error',
      });
    });
};
