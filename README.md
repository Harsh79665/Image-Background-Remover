# AI Image Background Remover

A modern, fast, and high-quality web application that automatically removes the background from any uploaded image using cutting-edge AI (U²-Net model via `rembg`).

## Features
- **Instant AI Background Removal:** Powered by Python and `rembg`.
- **Premium UI/UX:** Built with glassmorphism design principles.
- **Dark/Light Mode:** Seamlessly toggle between themes (saved locally).
- **Comparison Slider:** Interactive before-and-after image viewer.
- **Drag & Drop:** Easy image uploading.
- **Local Processing:** Your images are processed directly on your local machine—no remote API limits or privacy concerns.

## Tech Stack
- **Frontend:** HTML5, CSS3 (Custom Variables), Vanilla JavaScript.
- **Backend:** Python, Flask, Flask-CORS.
- **AI Engine:** `rembg` (onnxruntime).

## Requirements
- **Python 3.12** (Recommended). 
  *(Note: Python 3.14 is currently unsupported by some of the required AI sub-dependencies).*

## How to Run locally

### 1. Set up the Environment
It is highly recommended to use a virtual environment. Open your terminal in the project directory and run:

```bash
# Create a virtual environment using Python 3.12
py -3.12 -m venv venv

# Activate it (Windows)
.\venv\Scripts\activate

# Install the dependencies
pip install -r requirements.txt
# Or manually: pip install flask flask-cors rembg pillow onnxruntime
```

### 2. Start the Server
With your virtual environment activated, start the Flask backend:
```bash
python app.py
```
*Note: The very first time you run this, it may take 1-2 minutes to download the ~170MB high-quality AI model (u2net).*

### 3. Open the App
Once the server prints `* Running on http://127.0.0.1:5000`, open your web browser and go to:
**[http://127.0.0.1:5000/](http://127.0.0.1:5000/)**

## Important Notes
- Ensure all static UI files (`index.html`, `style.css`, `script.js`) are in the same folder as `app.py`. The Flask server is configured to serve them directly.

---
*Created by Harsh Patel*
