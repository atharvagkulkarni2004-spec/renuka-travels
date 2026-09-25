from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib 
import os
from email.message import EmailMessage

app = Flask(__name__)
CORS(app) # React ko connect karne deta hai

# ==========================================
# 📧 EMAIL CONFIGURATION (Yahan apni details daal)
# ==========================================


SENDER_EMAIL = os.environ.get('EMAIL_USER')
APP_PASSWORD = os.environ.get('EMAIL_PASS')
RECEIVER_EMAIL= os.environ.get('RECEIVER_EMAIL')

@app.route('/api/enquiry', methods=['POST'])
def submit_enquiry():
    data = request.json
    
    name = data.get('name')
    phone = data.get('phone')
    selection = data.get('selection')
    travel_date = data.get('date')
    
    print(f"🚀 Processing Lead: {name} - {selection}")

    # Email ka message aur design set karna
    msg = EmailMessage()
    msg['Subject'] = f"🚨 New Cab Enquiry: {name}"
    msg['From'] = SENDER_EMAIL
    msg['To'] = RECEIVER_EMAIL
    
    email_content = f"""
    Hello Renuka Travels,

    You have received a new booking enquiry from your website!

    👤 Customer Name: {name}
    📞 Phone Number: {phone}
    🚘 Selected Car/Package: {selection}
    📅 Travel Date: {travel_date}

    Call them immediately to lock the deal! 🚀
    """
    msg.set_content(email_content)
    
    try:
        # Gmail ke server se connect karke mail bhejna
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(SENDER_EMAIL, APP_PASSWORD)
            smtp.send_message(msg)
            
        print("✅ Email sent successfully!")
        return jsonify({"status": "success", "message": "Thanks! We will contact you shortly."}), 200
        
    except Exception as e:
        print("❌ Error sending email:", e)
        return jsonify({"status": "error", "message": "Failed to send email."}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)