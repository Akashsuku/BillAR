// backend/services/markerService.js
const Marker = require('../models/markerModel');

const saveMarkers = async (markers, documentId) => {
  const markerDocs = markers.map(marker => ({
    ...marker,
    documentId: documentId,
  }));
  return Marker.insertMany(markerDocs);
};

const getMarkers = async (documentId) => {
  return Marker.find({ documentId });
};

module.exports = {
  saveMarkers,
  getMarkers,
};
