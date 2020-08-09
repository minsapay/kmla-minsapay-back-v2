const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true },
  history: [],
  leftover: { type: Number, required: true },
});

module.exports = mongoose.model('Student', studentSchema);
