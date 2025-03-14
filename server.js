// Backend: Express Server
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const os = require("os");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const coupons = ["DISCOUNT10", "SAVE20", "OFFER30", "DEAL40", "BONUS50"];
let currentIndex = 0;
const claimedCoupons = {};
const claimCooldown = 60 * 60 * 1000; // 1 hour

// Function to get user's IP address
const getClientIP = (req) => {
  return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
};

// API to claim a coupon
app.post("/claim", (req, res) => {
  const ip = getClientIP(req);
  const cookie = req.cookies.couponClaimed;
  const now = Date.now();

  if (claimedCoupons[ip] && now - claimedCoupons[ip] < claimCooldown) {
    const remainingTime = ((claimCooldown - (now - claimedCoupons[ip])) / 60000).toFixed(2);
    return res.status(429).json({ message: `You can claim another coupon in ${remainingTime} minutes.` });
  }

  if (cookie) {
    return res.status(429).json({ message: "You have already claimed a coupon in this session." });
  }

  const coupon = coupons[currentIndex];
  currentIndex = (currentIndex + 1) % coupons.length;
  claimedCoupons[ip] = now;
  res.cookie("couponClaimed", "true", { maxAge: claimCooldown, httpOnly: true });

  res.json({ message: "Coupon claimed successfully!", coupon });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Ensure the public directory exists
const publicDir = path.join(__dirname, "public");
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Frontend: HTML + JavaScript
const frontendHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coupon Distributor</title>
    <script>
        async function claimCoupon() {
            const response = await fetch('/claim', { method: 'POST', credentials: 'include' });
            const data = await response.json();
            document.getElementById('message').innerText = data.message;
            if (data.coupon) {
                document.getElementById('coupon').innerText = "Your Coupon: " + data.coupon;
            }
        }
    </script>
</head>
<body>
    <h1>Welcome to the Coupon Distributor</h1>
    <button onclick="claimCoupon()">Claim a Coupon</button>
    <p id="message"></p>
    <h2 id="coupon"></h2>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, "index.html"), frontendHTML);
app.use(express.static("public"));
