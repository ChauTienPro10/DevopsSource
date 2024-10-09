import requests
from flask import Flask

app = Flask(__name__)

@app.route('/')
def call_app2():
    try:
        # Gửi yêu cầu GET đến app2
        response = requests.get('http://app2-container:5000/')
        return f"Response from app2: {response.text}"
    except Exception as e:
        return f"Error connecting to app2: {str(e)}"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
