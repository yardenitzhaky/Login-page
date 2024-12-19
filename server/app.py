from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os
import requests
from dotenv import load_dotenv
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

# Load environment variables from a .env file
load_dotenv()

# Server and MongoDB configuration
NODEJS_SERVER_URL = os.getenv('NODEJS_SERVER_URL', 'https://chatgpt-server-a3cydtahb0habmbg.israelcentral-01.azurewebsites.net')
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
    # Create unique indexes for email and username
    users_collection.create_index([('email', 1), ('username', 1)], unique=True)
    print("Connected to MongoDB successfully!")
except Exception as e:
    print(f"Error connecting to MongoDB: {str(e)}")

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'nodejs_server': NODEJS_SERVER_URL
    })

# Login endpoint
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        # Validate email and password
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Find user by email
        user = users_collection.find_one({'email': data['email'].lower()})
        # Check if user exists and password is correct
        if not user or not check_password_hash(user['password'], data['password']):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        return jsonify({
            'message': 'Login successful',
            'user': {'username': user['username'], 'email': user['email']}
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Registration endpoint
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not all(key in data for key in ['username', 'email', 'password']):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Create user document
        user_doc = {
            'username': data['username'],
            'email': data['email'].lower(),
            'password': generate_password_hash(data['password']),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        # Insert user into database
        try:
            users_collection.insert_one(user_doc)
        except Exception as e:
            if 'duplicate key error' in str(e):
                return jsonify({'error': 'Username or email already exists'}), 409
            raise e
        
        # Get welcome message from Node.js server
        try:
            openai_response = requests.get(f"{NODEJS_SERVER_URL}/api/welcome-message")
            welcome_message = openai_response.json()['message']
        except Exception as e:
            print(f"Error getting welcome message: {str(e)}")
            welcome_message = "Welcome to our platform!"

        return jsonify({
            'message': 'Registration successful',
            'welcomeMessage': welcome_message,
            'user': {
                'username': data['username'],
                'email': data['email']
            }
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    port = int(os.getenv('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=False)