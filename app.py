from flask import Flask, request, jsonify
from flask_cors import CORS 
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# connect to database
def connect_db():
    return sqlite3.connect('eacc_app.db')

# signup API
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    name = data['name']
    email = data['email']
    password = data['password']
    password_hash = generate_password_hash(password)

    conn = connect_db()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)", 
                       (name, email, password_hash))
        conn.commit()
        response = {"success": True, "message": "Signup successful"}
    except sqlite3.IntegrityError:
        response = {"success": False, "message": "Email already registered"}
    conn.close()
    return jsonify(response)

# login API
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT user_id, password_hash FROM Users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()

    if user and check_password_hash(user[1], password):
        response = {"success": True, "message": "Login successful"}
    else:
        response = {"success": False, "message": "Invalid email or password"}
    
    return jsonify(response)

#  get user data
@app.route('/api/user', methods=['GET'])
def get_user():
    # Assuming the user ID is sent as a header or from a session
    user_id = request.headers.get('User-ID')
    if not user_id:
        return jsonify({"error": "User not logged in"}), 401

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT username, email FROM Users WHERE user_id = ?", (user_id,))
    user = cursor.fetchone()
    conn.close()

    if user:
        user_data = {
            "username": user[0],
            "email": user[1]
        }
        return jsonify(user_data)
    else:
        return jsonify({"error": "User not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)

# add users
@app.route('/api/users', methods=['POST'])
def add_user():
    data = request.json
    username = data['username']
    email = data['email']
    password_hash = data['password_hash']
    conn = connect_db()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)",
                       (username, email, password_hash))
        conn.commit()
        response = {"message": "User added successfully"}
    except sqlite3.IntegrityError as e:
        response = {"error": str(e)}
    conn.close()
    return jsonify(response)

# send friend request
@app.route('/api/friend-requests', methods=['POST'])
def send_friend_request():
    data = request.json
    sender_id = data['sender_id']
    receiver_id = data['receiver_id']
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO FriendRequests (sender_id, receiver_id) VALUES (?, ?)",
                   (sender_id, receiver_id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Friend request sent"})

# Endpoint to get all messages
@app.route('/api/messages', methods=['GET'])
def get_messages():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Messages")
    messages = cursor.fetchall()
    conn.close()
    return jsonify(messages)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)