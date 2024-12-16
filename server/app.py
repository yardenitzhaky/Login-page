# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Registration endpoint
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Basic validation
        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'error': f'Missing required field: {field}'
                }), 400
        
        # Get welcome message from Node.js server
        try:
            openai_response = requests.get('http://localhost:3001/api/welcome-message')
            welcome_message = openai_response.json()['message']
        except Exception as e:
            welcome_message = "Welcome to our platform!"
            print(f"Error getting welcome message: {str(e)}")

        return jsonify({
            'message': 'Registration successful',
            'welcomeMessage': welcome_message,
            'user': {
                'username': data['username'],
                'email': data['email']
            }
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)