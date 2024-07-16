# document_processing/marker_identification.py
def identify_markers(text, document_type):
    markers = []
    if document_type == 'Invoice':
        markers.append({'type': 'Total Amount', 'location': 'bottom-right'})
    elif document_type == 'Resume':
        markers.append({'type': 'Experience', 'location': 'middle'})
    elif document_type == 'Article':
        markers.append({'type': 'Summary', 'location': 'top'})
    return markers
