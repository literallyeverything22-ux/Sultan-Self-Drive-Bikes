# 🏍️ Sultan Self Drive Bikes — Quick User & Testing Guide

Welcome to the new modern web platform for **Sultan Self Drive Bikes**!

---

## 🚀 How to Run the App on Your Computer

1. **One-Click Run:**
   * In this project folder, simply **double-click** the file named **`run.bat`**.
   * It will automatically open your web browser to **`http://localhost:3000`**.

---

## 📱 Features Built & How to Test Them

### 1. The High-Speed Dark Mode Booking Flow
* **Select Schedule:** Choose your pickup and drop-off dates and times in the top bar. Notice how the duration and estimated rental charges update automatically.
* **Browse the Fleet:** Filter between **Scooters** (Suzuki Burgman Street 125, Honda Activa 6G, TVS Jupiter), **Sports** (Bajaj Pulsar N160, Yamaha MT-15), and **Cruisers** (Royal Enfield Classic 350).
* **Click "Book for ₹199":**
  * Opens the trip customizer.
  * Pick add-ons (Extra sanitized helmet, mobile phone holder with fast charger, or zero-damage waiver).
  * Choose **"Pay ₹199 Advance Token"** to lock the slot.
* **Instant Digital KYC:**
  * Enter customer name and phone number.
  * Preview driving license check (instant eligibility verification).
* **Simulate Payment:**
  * Opens the dark-themed Razorpay payment gateway simulation with UPI (GPay, PhonePe, Paytm), Cards, and NetBanking.
  * Click **"Simulate Pay ₹199"** to trigger a confetti celebration and generate the confirmed digital pass!
* **Digital Pass with QR Code & WhatsApp:**
  * Shows your live booking ID (e.g. `#SLT-XXXXX`).
  * Click **"Send Confirmation to My WhatsApp"** to preview the exact formatted WhatsApp ticket.
  * Click **"Google Maps Pin"** for directions directly to Apsara Circle Hub.

---

### 2. Store Staff & Garage Handover Tool (For Your Brother & Team)
* Click **"Staff Portal"** at the top right of the navigation bar.
* **Handover Keys:**
  * Pulls up active customer bookings.
  * Mandatory 4-angle condition photo inspection logger (Front, Back, Left, Right) to protect bikes against disputes.
  * Log starting odometer (KM) and fuel gauge.
  * Click **"Handover Keys to Customer"**.
* **Return & Deposit Refund:**
  * Enter return odometer KM.
  * If the customer rode within the free KM allowance, it automatically calculates zero excess fees.
  * One-tap instant security deposit refund back to customer UPI.

---

### 3. Franchise & "Connect Your Bike" Partner Portal
* Click **"Franchise & Partner"** in the top navigation bar.
* Prospective partners can submit inquiries for:
  * **Franchise Opportunity** (₹2L - ₹10L investment across Rayalaseema & Telangana).
  * **Connect Your Bike** (Bike owners listing idle scooters/bikes to earn monthly revenue).

---

## 🛠️ Project Structure (Modular Feature-Driven)

```text
src/
├── core/                  # Global components (Navbar, Footer, TrustBadges, TouristGuides, formatting utils)
└── modules/
    ├── vehicles/          # Vehicle data, specs, filters, and cards
    ├── bookings/          # Schedule search, pricing engine, digital passes
    ├── kyc/               # Driving license upload and verification
    ├── payments/          # Razorpay checkout modal
    ├── operations/        # Store staff handover and return checklist
    └── franchise/         # Franchise inquiry & partner onboard forms
```
