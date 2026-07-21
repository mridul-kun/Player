from flask import Flask, request, jsonify
from flask_cors import CORS
import pyautogui
import time

app = Flask(__name__)
CORS(app)  # allows browser to call this server

pyautogui.FAILSAFE = True  # move mouse to corner to abort

@app.route('/move', methods=['POST'])
def move():
    data = request.json
    pyautogui.moveTo(data['x'], data['y'], duration=0.2)
    return jsonify({'ok': True})

@app.route('/click', methods=['POST'])
def click():
    data = request.json
    pyautogui.click(data.get('x'), data.get('y'))
    return jsonify({'ok': True})

@app.route('/type', methods=['POST'])
def type_text():
    data = request.json
    pyautogui.typewrite(data['text'], interval=0.05)
    return jsonify({'ok': True})

@app.route('/hotkey', methods=['POST'])
def hotkey():
    data = request.json
    pyautogui.hotkey(*data['keys'])  # e.g. ['ctrl', 'c']
    return jsonify({'ok': True})

@app.route('/screenshot', methods=['GET'])
def screenshot():
    import base64, io
    img = pyautogui.screenshot()
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    b64 = base64.b64encode(buf.getvalue()).decode()
    return jsonify({'image': b64})

@app.route('/scroll', methods=['POST'])
def scroll():
    data = request.json
    pyautogui.scroll(data.get('clicks', 3))
    return jsonify({'ok': True})

if __name__ == '__main__':
    app.run(port=5000)