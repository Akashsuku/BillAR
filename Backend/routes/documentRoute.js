// backend/routes/documentRoutes.js
const express = require('express');
const multer = require('multer');
const { processDocument, getMarkers } = require('../services/documentProcessing');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('document'), async (req, res) => {
  try {
    const file = req.file;
    const result = await processDocument(file.path);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:documentId/markers', async (req, res) => {
  try {
    const { documentId } = req.params;
    const markers = await getMarkers(documentId);
    res.json(markers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
