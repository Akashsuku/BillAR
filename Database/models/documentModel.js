// database/models/documentModel.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
