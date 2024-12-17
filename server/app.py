# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os
import requests
from dotenv import load_dotenv
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from urllib.parse import urlparse
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Load environment variables
load_dotenv()

# Server configuration
NODEJS_SERVER_URL = os.getenv(
    'NODEJS_SERVER_URL', 
    'https://chatgpt-server-a3cydtahb0habmbg.israelcentral-01.azurewebsites.net')  # Remove any trailing slashes

# MongoDB configuration
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'registration_db')

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize MongoDB connection
try:
    client = MongoClient(MONGODB_URI)
    db = client[DB_NAME]
    users_collection = db.users
    # Create unique indexes
    users_collection.create_index('email', unique=True)
    users_collection.create_index('username', unique=True)
    print("Connected to MongoDB successfully!")
except Exception as e:
    print(f"Error connecting to MongoDB: {str(e)}")

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'nodejs_server': NODEJS_SERVER_URL
    })

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Basic validation
        required_fields = ['email', 'password']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'error': f'Missing required field: {field}'
                }), 400
        
        # Find user by email
        user = users_collection.find_one({'email': data['email'].lower()})
        
        if not user:
            return jsonify({
                'error': 'Invalid email or password'
            }), 401
        
        # Check password
        if not check_password_hash(user['password'], data['password']):
            return jsonify({
                'error': 'Invalid email or password'
            }), 401
        
        return jsonify({
            'message': 'Login successful',
            'user': {
                'username': user['username'],
                'email': user['email']
            }
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

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
        
        # Hash password
        hashed_password = generate_password_hash(data['password'])
        
        # Prepare user document
        user_doc = {
            'username': data['username'],
            'email': data['email'].lower(),
            'password': hashed_password,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        # Insert user into database
        try:
            users_collection.insert_one(user_doc)
        except Exception as e:
            if 'duplicate key error' in str(e):
                return jsonify({
                    'error': 'Username or email already exists'
                }), 409
            raise e
        
        try:
            openai_response = requests.get(f"{NODEJS_SERVER_URL}/api/welcome-message")
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
    port = int(os.getenv('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=False)