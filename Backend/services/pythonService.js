// backend/services/pythonService.js
const { execFile } = require('child_process');
const path = require('path');

const runPythonScript = (scriptName, args) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '../../document_processing', scriptName);
    execFile('python', [scriptPath, ...args], (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout.trim());
    });
  });
};

const extractText = (filePath) => runPythonScript('ocr_processing.py', [filePath]);
const classifyDocument = (text) => runPythonScript('document_classification.py', [text]);
const identifyMarkers = (text, documentType) => runPythonScript('marker_identification.py', [text, documentType]);

module.exports = { extractText, classifyDocument, identifyMarkers };
