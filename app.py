# app.py
import os
from flask import Flask, request, jsonify, send_from_directory
import pytesseract
from PIL import Image
import cv2
import numpy as np
import base64
from io import BytesIO

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'  # Adjust the path as needed

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    data = request.json['image']
    image_data = base64.b64decode(data)
    img = Image.open(BytesIO(image_data))
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], 'captured_image.png')
    img.save(file_path)
    
    return jsonify({'filename': 'captured_image.png'}), 200

@app.route('/process/<filename>', methods=['GET'])
def process_file(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
    # Perform OCR
    img = cv2.imread(file_path)
    text = pytesseract.image_to_string(img)

    # Dummy document type detection and section identification
    # In a real scenario, you'd use a trained ML model here
    doc_type = 'Invoice' if 'Invoice' in text else 'Other'
    sections = [{'text': 'Total Amount', 'position': (100, 200)}] if doc_type == 'Invoice' else []

    return jsonify({'doc_type': doc_type, 'sections': sections}), 200

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
