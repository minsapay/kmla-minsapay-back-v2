const mongoose = require('mongoose');

const boothSchema = mongoose.Schema({
  name: { type: String, required: true },
  admin: { type: Boolean },
  id: { type: String, required: true },
  income: { type: Number, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Booth', boothSchema);
