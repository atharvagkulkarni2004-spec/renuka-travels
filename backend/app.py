import os
import smtplib
from email.message import EmailMessage
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# CORS fixed for Vercel
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/api/enquiry', methods=['POST', 'OPTIONS'])
def submit_enquiry():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS OK"}), 200
        
    try:
        # Variables yahan load karna sabse safe hai
        sender = os.environ.get('EMAIL_USER')
        receiver = os.environ.get('RECEIVER_EMAIL')
        password = os.environ.get('EMAIL_PASS')

        data = request.json
        print(f"🚀 Processing Lead: {data.get('name')} - {data.get('selection')}")
        
        # Email format
        msg = EmailMessage()
        msg.set_content(f"Name: {data.get('name')}\nPhone: {data.get('phone')}\nPackage: {data.get('selection')}\nDate: {data.get('date')}")
        msg['Subject'] = 'New Booking Enquiry - Renuka Travels!'
        msg['From'] = sender
        msg['To'] = receiver

        # Email send process
        server = smtplib.SMTP('smtp.gmail.com', 587, timeout=10)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        
        return jsonify({"message": "Enquiry Sent!"}), 200
        
    except Exception as e:
        print("❌ Error sending email:", str(e))
        return jsonify({"error": "Email nahi gaya", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)