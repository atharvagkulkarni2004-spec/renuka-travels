from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib 
from email.message import EmailMessage
import os

app = Flask(__name__)
CORS(app) # React ko connect karne deta hai

# ==========================================
# 📧 EMAIL CONFIGURATION (Yahan apni details daal)
# ==========================================


SENDER_EMAIL = os.environ.get('EMAIL_USER')
APP_PASSWORD = os.environ.get('EMAIL_PASS')
RECEIVER_EMAIL= os.environ.get('RECEIVER_EMAIL')

import smtplib
from email.message import EmailMessage

# ... tera baaki ka upar ka code ...

@app.route('/api/enquiry', methods=['POST', 'OPTIONS'])
def submit_enquiry():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS OK"}), 200
        
    try:
        data = request.json
        print(f"🚀 Processing Lead: {data.get('name')} - {data.get('selection')}")
        
        # Email ka format taiyar karna
        msg = EmailMessage()
        msg.set_content(f"Name: {data.get('name')}\nPhone: {data.get('phone')}\nPackage: {data.get('selection')}\nDate: {data.get('date')}")
        msg['Subject'] = 'New Booking Enquiry - Renuka Travels!'
        msg['From'] = sender
        msg['To'] = receiver

        # Sabse zaroori hissa: Port 587 aur 10-second timeout
        server = smtplib.SMTP('smtp.gmail.com', 587, timeout=10)
        server.starttls() # Connection ko secure karne ke liye
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        
        return jsonify({"message": "Enquiry Sent!"}), 200
        
    except Exception as e:
        print("❌ Error sending email:", str(e))
        return jsonify({"error": "Email nahi gaya", "details": str(e)}), 500