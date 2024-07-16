# document_processing/document_classification.py
def classify_document(text):
    if 'invoice' in text.lower():
        return 'Invoice'
    elif 'resume' in text.lower():
        return 'Resume'
    else:
        return 'Article'
