# coupon-distributor

# 🎟️ Coupon Distributor Web App  

A simple web application that distributes coupons to guest users in a round-robin manner. The system prevents abuse by tracking user claims via **IP address and cookies**.  

## 🚀 Features  
✅ Sequential coupon distribution to ensure fairness  
✅ Guest access without login or account creation  
✅ Abuse prevention using IP and cookie tracking  
✅ Clear user feedback for coupon claims  
✅ Deployed on **Render/Vercel/Heroku**  

---

## 📂 Project Structure  
```bash
coupon-distributor/
 │── public/ │
└── index.html # Frontend HTML file
 │── server.js # Main backend server (Express.js)
│── package.json # Project metadata and dependencies
 │── package-lock.json # Lockfile for dependencies
│── .gitignore # Ignore unnecessary files
│── README.md # Project documentation
```


---

## 🛠️ Installation & Setup  
### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/devansh173/coupon-distributor.git
cd coupon-distributor
```
### **2️⃣ Install Dependencies** 
```
npm install
```
### **3️⃣ Start the Server** 
```
node server.js
Your app will now run at http://localhost:3000
```

### **🔐 Abuse Prevention Mechanisms** 
IP Tracking: Prevents multiple claims from the same IP within a set time frame.
Cookie Tracking: Ensures users don’t claim multiple coupons by refreshing the page.
Time Restriction: Users can claim another coupon only after a cooldown period.

### **🎯 Future Improvements** 

✅ Admin panel for managing coupons
✅ Email-based coupon distribution
✅ Database storage for better scalability



###  The project is live at  https://coupon-distributor-426t.onrender.com
