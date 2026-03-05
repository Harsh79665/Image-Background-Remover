from flask import Flask, request, send_file, jsonify, send_from_directory
from flask_cors import CORS
import io
from rembg import remove
from PIL import Image
import os

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

@app.route('/remove-background', methods=['POST'])
def remove_background():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No image selected"}), 400

    try:
        # Read the image
        input_image = Image.open(file.stream)
        
        # Convert to RGBA if not already
        if input_image.mode != 'RGBA':
            input_image = input_image.convert('RGBA')

        # Remove background using rembg
        output_image = remove(input_image)

        # Save the result to a byte steam
        img_io = io.BytesIO()
        output_image.save(img_io, 'PNG')
        img_io.seek(0)

        return send_file(img_io, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"}), 200

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    # Default Flask port is 5000
    app.run(debug=True, port=5000)
