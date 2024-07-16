// database/models/markerModel.js
const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  type: { type: String, required: true },
  location: { type: String, required: true },
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Marker', markerSchema);
