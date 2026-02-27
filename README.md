<div align="center">

# 🛡️ SafeTap — Senior Security Shield

**AI-powered cyber scam protection for senior citizens**

[![React](https://img.shields.io/badge/Frontend-React-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Xano](https://img.shields.io/badge/Backend-Xano-6c63ff?style=flat-square)](https://xano.com)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens)](https://jwt.io)
[![Bilingual](https://img.shields.io/badge/Language-EN%20%7C%20हिंदी-4ade80?style=flat-square)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

</div>

---
## What Is SafeTap?

SafeTap is a **24-hour hackathon MVP** that protects senior citizens from *Digital Arrest* scams — where fraudsters impersonate government officials (CBI, Cyber Crime, CID) over phone calls and psychologically coerce victims into transferring large sums of money under threat of fake arrest.

The app detects the scam in real time using AI, lets the user freeze their bank transaction in one tap, immediately alerts registered family guardians, auto-files a complaint with the Cyber Crime Cell and local police, and generates a legally-formatted downloadable evidence report.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (single JSX file), Outfit + Space Grotesk (Google Fonts) |
| Backend | [Xano](https://xano.com) — no-code BaaS with REST API + PostgreSQL |
| Authentication | JWT tokens + SHA-256 PIN hashing + dual OTP (phone & email) |
| SMS Alerts | MSG91 / Fast2SMS |
| Email OTP | Resend.com (3,000/month free tier) |
| WhatsApp Alerts | Twilio / Gupshup |
| Hosting | Vercel (frontend) + Xano Free Plan (backend, Asia Pacific) |

---

## Features

### 🔐 Login & Authentication

The login screen has two tabs — **PIN Login** and **OTP Login**.

**PIN Login** takes a phone number (with country code picker for 🇮🇳 🇺🇸 🇬🇧 🇦🇺 🇦🇪), an email address, and a 4–6 digit PIN. The phone field has a voice input button so seniors can speak their number instead of typing. After 3 wrong PIN attempts, the account locks with a visual indicator (3 red bars depleting). A fingerprint/Face ID button is also present for future biometric integration.

**OTP Login** requires verification of both phone and email — two separate OTP panels, each with its own send + verify flow. Both must be confirmed before login completes, acting as built-in 2FA. Status badges (✅ / ⏳) update live as each channel is verified.

A large **Emergency Panic button** sits below the login card — callable before authentication, so seniors can reach a guardian even if they can't log in.

### 🤖 AI Scam Detection

Tap *Simulate Scam Call* on the Home screen to trigger a live demo. The app plays an incoming call and runs real-time phrase detection against 11 known scam triggers:

`digital arrest` · `you are under arrest` · `do not tell anyone` · `transfer money` · `money laundering` · `legal notice` · `warrant issued` · `freeze your account` · `government escrow account` · `narcotics` · `cci officer`

As the call progresses, an animated waveform visualises the audio, flagged phrases appear as live tags, and a **Scam Risk Score** climbs from 0–94% on a colour-coded meter (🟢 Safe · 🟡 Suspicious · 🔴 High Risk). The full call transcript is displayed in real time. At 80%+ risk, the app triggers a SCAM DETECTED alert.

### 🔒 Freeze Transaction

A single full-width **FREEZE TRANSACTION** button calls the mock banking API to block a pending ₹2,00,000 transfer. At the same time it:
- Sends SMS + WhatsApp alerts to all registered guardians
- Notifies the user's bank and raises an RBI fraud flag
- Begins the auto-complaint filing process

### 👨‍👩‍👧‍👦 Guardian Management

Users can register multiple trusted family contacts — each with a name, phone number, and relationship tag (Son, Daughter, Spouse, Brother, Sister, Friend, Caretaker, Other). Every guardian receives instant alerts the moment a scam is detected or a transaction is frozen. Guardians can be added or removed at any time from the Guardians tab.

### 👤 User Profile

The Profile screen shows all user information in a hero card layout with avatar (👴 👵 🧓 👨 👩 🧑), verified phone and email badges, and blood group. Tapping **Edit Profile** puts every field inline-editable: name, age, date of birth, blood group, full address, Aadhaar last 4 digits, bank name, and account last 4 digits. Changes are saved back to the Xano backend via `PATCH /users/profile`. The profile data is also embedded directly into the downloadable evidence report.

### ⚖️ Complaint Progress Tracker

An animated donut chart shows overall complaint completion (%), alongside an 8-step visual tracker:

```
Step 1  →  Scam Detected & AI Logged               10%
Step 2  →  Emergency Alert Sent to Guardians        20%
Step 3  →  Transaction Frozen                       35%
Step 4  →  Complaint Filed — Cyber Cell 1930        55%
Step 5  →  FIR Filed — Nearest Police Station       70%
Step 6  →  Bank Notified & Evidence Secured         80%
Step 7  →  Case Under Active Investigation          90%
Step 8  →  Case Resolved & Closed                 100%
```

Each step shows a mini progress bar and live status (✅ Completed / ⏳ In Progress / Pending). The progress updates automatically as the user takes actions in the app.

### 📄 Evidence Report

A `.txt` evidence report is auto-generated and downloadable at any time. It contains:

- **Victim details** — pulled from the user's profile (name, age, address, blood group, bank info)
- **Caller / suspect intelligence** — AI analysis results, all flagged phrases, full call transcript
- **Transaction freeze details** — TXN ID, Bank Reference, RBI flag status, sender/recipient accounts
- **Complaint references** — Cyber Cell ref number, FIR number, police station details, officer name
- **Legal sections applied** — `IT Act §66C`, `IT Act §66D`, `IPC §420`, `IPC §419`, `IPC §384`, `IPC §506`
- **Guardian alert log** — per-guardian timestamps and delivery status
- **Tracking numbers** — App No, FIR No, Cyber Ref, Bank Freeze Ref, all helpline numbers

The report is formatted for physical submission at police stations and is admissible as digital evidence under **Section 65B of the Indian Evidence Act, 1872**.

### 🌐 Bilingual Support

The entire app — every label, button, error message, navigation item, and form field — is available in **English** and **हिंदी**. Toggle from the header or Profile screen at any time, no reload needed.

---

## Backend — Database & API

### Database Schema (Xano / PostgreSQL)

**`users`** — Stores senior citizen profiles including personal info, hashed PIN, phone/email verification status, bank details, language preference, and avatar.

**`otp_store`** — Temporary OTP records per user per channel (phone or email). Each code expires after 10 minutes and is single-use.

**`guardians`** — Trusted contacts linked to a user via `user_id`. Stores name, phone, and relationship.

**`incidents`** — Every scam call detected. Stores risk score, caller number, flagged phrases (JSON), call transcript, transaction freeze status, bank reference, and complaint progress (0–100%).

**`complaints`** — Official complaint references tied to an incident: App Number, FIR Number, Cyber Cell Ref, Bank Freeze Ref, and current status.

---

### API Endpoints

**Base URL:** `https://<instance>.xano.io/api:<group-id>`

#### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/Register_User` | Create account, returns JWT |
| POST | `/auth/Login_Pin` | PIN login, returns JWT |
| POST | `/auth/Send_OTP` | Send 6-digit OTP to phone or email |
| POST | `/auth/Verify_OTP` | Verify OTP, marks channel as verified |

#### Users
| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/profile` | Fetch current user's full profile |
| PATCH | `/users/profile` | Update profile fields |

#### Guardians
| Method | Endpoint | Description |
|---|---|---|
| GET | `/guardians` | List all guardians for the logged-in user |
| POST | `/guardians` | Add a new guardian |
| DELETE | `/guardians/:id` | Remove a guardian |

#### Incidents
| Method | Endpoint | Description |
|---|---|---|
| POST | `/incidents/report` | Log a detected scam call with AI data |
| POST | `/incidents/:id/freeze` | Freeze the attempted transaction |
| POST | `/incidents/:id/file-complaint` | Auto-generate FIR + Cyber Cell ref, update progress to 55% |
| GET | `/incidents` | List all past incidents for the user |

All endpoints except Auth require a JWT in the `Authorization: Bearer <token>` header.

### Security

- PIN is hashed with **SHA-256** before being stored — never saved as plain text, never returned in API responses
- **JWT tokens** issued on login, required on all protected routes
- OTPs **expire after 10 minutes** and are marked single-use after verification
- **Account locks** after 3 failed PIN attempts
- All guardian and incident endpoints enforce **ownership checks** — users can only access their own data

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- A [Xano](https://xano.com) account (free)

### Frontend

```bash
git clone https://github.com/your-username/safetap.git
cd safetap
npm install
npm run dev
```

Add `SafeTap.jsx` to `src/` and import it in `App.jsx`:

```jsx
import SafeTap from './SafeTap';
export default function App() { return <SafeTap />; }
```
### Backend (Xano)

1. Create a Xano workspace and set up the 5 tables from the schema above
2. Configure the API endpoint groups (Auth, Users, Guardians, Incidents)
3. Enable JWT Auth in the Xano Auth module
4. Copy your instance base URL

### Connecting Frontend to Backend

Create `src/xano.js`:

```js
const BASE = "https://<your-instance>.xano.io/api:<group-id>";

const headers = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("st_token")}`
});

export const api = {
  loginPin:      (data) => fetch(`${BASE}/auth/Login_Pin`,                { method:"POST",   headers:headers(), body:JSON.stringify(data) }),
  sendOtp:       (data) => fetch(`${BASE}/auth/Send_OTP`,                 { method:"POST",   headers:headers(), body:JSON.stringify(data) }),
  verifyOtp:     (data) => fetch(`${BASE}/auth/Verify_OTP`,               { method:"POST",   headers:headers(), body:JSON.stringify(data) }),
  getProfile:    ()     => fetch(`${BASE}/users/profile`,                 { method:"GET",    headers:headers() }),
  updateProfile: (data) => fetch(`${BASE}/users/profile`,                 { method:"PATCH",  headers:headers(), body:JSON.stringify(data) }),
  getGuardians:  ()     => fetch(`${BASE}/guardians`,                     { method:"GET",    headers:headers() }),
  addGuardian:   (data) => fetch(`${BASE}/guardians`,                     { method:"POST",   headers:headers(), body:JSON.stringify(data) }),
  deleteGuardian:(id)   => fetch(`${BASE}/guardians/${id}`,               { method:"DELETE", headers:headers() }),
  reportIncident:(data) => fetch(`${BASE}/incidents/report`,              { method:"POST",   headers:headers(), body:JSON.stringify(data) }),
  freezeTxn:     (id)   => fetch(`${BASE}/incidents/${id}/freeze`,        { method:"POST",   headers:headers() }),
  fileComplaint: (id)   => fetch(`${BASE}/incidents/${id}/file-complaint`, { method:"POST",  headers:headers() }),
};
```
**Demo credentials (mock mode):** PIN `1234` · Phone OTP `123456` · Email OTP `654321`

---

## Deployment

| Component | Platform | Cost |
|---|---|---|
| Frontend | Vercel / Netlify | Free |
| Backend + Database | Xano Free Plan | Free |
| SMS Alerts | MSG91 / Fast2SMS | Free trial |
| Email OTP | Resend.com | Free (3,000/month) |
| WhatsApp Alerts | Twilio / Gupshup | Free trial |

---

## Roadmap

- [ ] Real voice analysis via WebRTC + OpenAI Whisper
- [ ] Live banking API (RazorpayX / Open Banking India)
- [ ] React Native mobile app (iOS + Android)
- [ ] Aadhaar verification via DigiLocker API
- [ ] GPS auto-detection of nearest police station
- [ ] Real cybercrime.gov.in API submission via Xano webhook
- [ ] Additional languages — Tamil, Telugu, Bengali

---
## Legal & Compliance

Evidence reports generated by SafeTap are formatted for submission to:
- **National Cyber Crime Portal** — [cybercrime.gov.in](https://cybercrime.gov.in) · Helpline: **1930**
- **Local police station Cyber Crime Cell**
- **User's bank** for fraud dispute

Legal basis: IT Act 2000 (§66C, §66D), IPC (§419, §420, §384, §506), Indian Evidence Act 1872 (§65B).

---

## License

MIT · © 2026 SafeTap Technologies Pvt. Ltd. · support@safetap.in

*Made to protect India's senior citizens from cyber fraud.*
