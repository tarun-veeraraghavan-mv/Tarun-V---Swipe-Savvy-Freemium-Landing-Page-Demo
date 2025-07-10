# 🧠 Swipe Savvy — Business Verification & Listing Flow

A modern React + Node.js full-stack MVP to onboard local businesses via Google Places search, progressive verification steps, and Stripe-powered upgrade funnel. Built for speed, trust, and conversions.

---



---

## 🚀 Features

- 🔍 **Google Places Autocomplete** – Realtime business search via Google Places API  
- ✅ **Business Ownership Verification** – Step-by-step UX to confirm business control  
- 🔐 **Account Creation with Form Validation** – React Hook Form with full error handling  
- 📜 **Terms & Agreement Gate** – T&C compliance before activation  
- 🧾 **Free vs Pro Plans** – Feature comparison between Free and Pro tiers  
- 💸 **Stripe Checkout** – Seamless upgrade to Pro with 50% off lifetime  
- 🧠 **State Persistence** – Global context for user & selected business  
- 📦 **Fully Componentized** – Atomic structure with clean reusable blocks

---

## 🏗️ Tech Stack

| Layer         | Tech                                    |
|---------------|------------------------------------------|
| Frontend      | React, React Router, Context API, Axios |                       |
| Backend       | Node.js, Express                        |
| Payments      | Stripe Checkout                         |
| Styles        | CSS Modules / Plain CSS (modular)       |

---

## 📁 Folder Structure

```
root/
│
├── testing-places-api/      # client code
|   ├── context/                 # React context providers (User, Business)
|   ├── server/                  # Express backend with routes for Stripe, Google API
|   └── App.jsx  
├── server/                  # server code        
├── hooks/                   # Custom hooks like useGooglePlacesApi
├── context/                 # React context providers (User, Business)
├── server/                  # Express backend with routes for Stripe, Google API
└── App.jsx                  # Route definitions and layout
```

---

## 🛠️ Local Setup

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/swipe-savvy.git
cd swipe-savvy
```

### 2. Install Dependencies

```bash
# Frontend
cd testing-places-api
npm install

# Backend
cd ./server
npm install
```

### 3. Set Environment Variables

#### `client/.env`:

```
VITE_BACKEND_URL=http://localhost:3000
```

#### `server/.env`: See the .env.example

### 4. Run Dev Servers

```bash
# Backend
cd server
npm start

# Frontend
cd testing-palces-api
npm run dev
```

---

## 🧪 API Routes (Backend)

| Route                                       | Description                                 |
|--------------------------------------------|---------------------------------------------|
| `POST /search`                             | Searches businesses using Google Places API |
| `POST /create-user`                        | Saves user data after verification          |
| `POST /create-checkout-session`            | Initiates Stripe Checkout                   |
| `GET /verify-payment-session/:sessionId`   | Verifies Stripe session and upgrades user   |

---

## 🧾 Example Flow

1. User lands on `/`
2. Searches their business (Google Places)
3. Verifies ownership → creates account → agrees to terms
4. Gets listed for free
5. Can upgrade to Pro anytime via Stripe
6. After upgrade, lands on `/success/:sessionId` and is shown Pro perks

---

## 💡 Future Enhancements

- OAuth with Google for user login  
- Admin dashboard to manage listings  
- Webhooks for real-time Stripe updates  
- SEO indexing & public directory of listings
