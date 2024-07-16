// backend/services/documentProcessing.js
const { extractText, classifyDocument, identifyMarkers } = require('./pythonService');
const Document = require('../models/documentModel');
const { saveMarkers, getMarkers } = require('./markerService');

const processDocument = async (filePath) => {
  const text = await extractText(filePath);
  const documentType = await classifyDocument(text);
  const markers = await identifyMarkers(text, documentType);

  const document = new Document({ type: documentType, text });
  await document.save();

  const savedMarkers = await saveMarkers(markers, document._id);

  return { documentId: document._id, markers: savedMarkers };
};

module.exports = { processDocument, getMarkers };
