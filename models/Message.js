const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  from: String,
  to: String,
  subject: String,
  body: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);