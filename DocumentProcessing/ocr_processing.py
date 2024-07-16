# document_processing/ocr_processing.py
import pytesseract
from PIL import Image

def extract_text(image_path):
    return pytesseract.image_to_string(Image.open(image_path))
