const mongoose = require('mongoose');

const boothSchema = mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  password: { type: String, required: true },
  history: [],
  income: { type: Number, required: true },
  isAdmin: { type: Boolean },
});

module.exports = mongoose.model('Booth', boothSchema);
