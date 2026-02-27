import { useState, useEffect, useRef } from "react";
import * as API from "./xano";
import { t } from "./translations";

/* ══════════════════════════════════════════════════════════════
   CONSTANTS & DATA
══════════════════════════════════════════════════════════════ */
const APP_NUM   = "SFT-2026-" + Math.floor(100000 + Math.random() * 900000);
const FIR_NUM   = "FIR/MH/PUNE/" + Math.floor(4000 + Math.random() * 5000) + "/2026";
const CYBER_REF = "CYBER-MH-2026-" + Math.floor(400000 + Math.random() * 500000);
const TXN_ID    = "TXN-SBI-" + Math.floor(10000000 + Math.random() * 89000000);
const BANK_REF  = "SBI-FRZ-" + Math.floor(100000 + Math.random() * 800000);
const INC_DATE  = "27 February 2026";
const INC_TIME  = "14:32:17 IST";

const SCAM_PHRASES = [
  "digital arrest","freeze your account","cci officer","legal notice",
  "immediate payment","warrant issued","you are under arrest",
  "do not tell anyone","transfer money","narcotics","money laundering"
];
const CALL_TRANSCRIPT = `"Hello, this is Officer Rajesh Kumar, Badge No. CC-4821, from the Cyber Crime Investigation Department, Mumbai. We have issued a digital arrest warrant against you for money laundering charges amounting to ₹45,00,000. Your bank account will be seized within 30 minutes. You must immediately transfer ₹2,00,000 to a government-designated safe escrow account. This call is being recorded under Section 66D of the IT Act. Do not inform any family member — this is a classified federal investigation. Stay on the line or you will be arrested."`;
const COUNTRY_CODES = [
  {code:"+91",flag:"🇮🇳",name:"India"},
  {code:"+1", flag:"🇺🇸",name:"USA"},
  {code:"+44",flag:"🇬🇧",name:"UK"},
  {code:"+61",flag:"🇦🇺",name:"Australia"},
  {code:"+971",flag:"🇦🇪",name:"UAE"},
];
const RELS    = ["Son","Daughter","Spouse","Brother","Sister","Friend","Caretaker","Other"];
const BLOODS  = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
const AVATARS = ["👴","👵","🧓","👨","👩","🧑"];

/* ══════════════════════════════════════════════════════════════
   EVIDENCE REPORT  (rich plain-text)
══════════════════════════════════════════════════════════════ */
function buildEvidenceReport(profile, guardians) {
  const now = new Date().toLocaleString("en-IN",{dateStyle:"full",timeStyle:"medium"});
  const gl  = guardians.length
    ? guardians.map(g=>`     • ${g.name} (${g.relationship})  |  ${g.phone}`).join("\n")
    : "     • No guardians registered";

  return `
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║         S A F E T A P  –  OFFICIAL CYBER CRIME REPORT           ║
║              Evidence & Complaint Documentation                  ║
║              For Physical Submission / Legal Use                 ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝

  APPLICATION NO   :  ${APP_NUM}
  GENERATED ON     :  ${now}
  INCIDENT DATE    :  ${INC_DATE}    TIME: ${INC_TIME}
  REPORT STATUS    :  ✅  COMPLAINT SUCCESSFULLY FILED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  SECTION 1 ─ VICTIM / COMPLAINANT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Full Name          :  ${profile.name || "Rajesh Kumar"}
  Age                :  ${profile.age  || "72"} years
  Date of Birth      :  ${profile.dob  || "15-08-1952"}
  Blood Group        :  ${profile.blood|| "B+"}
  Phone Number       :  +91-${profile.phone || "98901-12345"}    [✅ Verified via OTP]
  Email Address      :  ${profile.email|| "rajesh.kumar@gmail.com"}    [✅ Verified via OTP]
  Aadhaar (Last 4)   :  XXXX-XXXX-${profile.aadhaar || "7823"}
  Home Address       :  ${profile.address || "Flat 4B, Sunrise Apartments, Koregaon Park"}
  City / State       :  ${profile.city || "Pune"} / ${profile.state || "Maharashtra"}
  Pincode            :  ${profile.pincode || "411001"}

  REGISTERED GUARDIANS:
${gl}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  SECTION 2 ─ SUSPECT / CALLER INTELLIGENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Caller Claimed Identity  :  "Officer Rajesh Kumar" — FAKE
  Claimed Department       :  Cyber Crime Investigation Dept., Mumbai
  Claimed Badge No.        :  CC-4821  (UNVERIFIED / FRAUDULENT)
  Caller Number            :  +91-XXXXXXX789  [Caller ID SPOOFED]
  Spoofing Technology      :  VoIP / International SIP Rerouting
  Call Duration            :  4 minutes 32 seconds
  Call Timestamp           :  ${INC_DATE},  ${INC_TIME}
  Scam Category            :  Digital Arrest / Psychological Coercion

  ┌─────────────────────────────────────────────────────────┐
  │                AI ANALYSIS RESULTS                      │
  │─────────────────────────────────────────────────────────│
  │  Scam Risk Score         :  94%  ●  HIGH RISK 🔴        │
  │  Stress Cues (Victim)    :  DETECTED ⚠️                 │
  │  Coercion Indicators     :  8 instances flagged         │
  │  Urgency Manipulation    :  YES  ("30-minute deadline") │
  │  Isolation Tactic        :  YES  ("Do not tell anyone") │
  │  Identity Impersonation  :  YES  (Fake govt. officer)   │
  │  AI Confidence Score     :  94.2%                       │
  └─────────────────────────────────────────────────────────┘

  SUSPICIOUS PHRASES FLAGGED BY AI:
     ✗  "digital arrest"              ✗  "you are under arrest"
     ✗  "do not tell anyone"          ✗  "transfer money immediately"
     ✗  "money laundering"            ✗  "legal notice"
     ✗  "government escrow account"   ✗  "classified investigation"
     ✗  "bank account seized"         ✗  "warrant issued against you"

  LIVE CALL TRANSCRIPT (AI-Captured):
  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  ${CALL_TRANSCRIPT}
  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  SECTION 3 ─ TRANSACTION FREEZE DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Transaction ID          :  ${TXN_ID}
  Attempted Amount        :  ₹ 2,00,000  (Rupees Two Lakh Only)
  Sender Bank             :  ${profile.bank || "State Bank of India"}
  Sender Account          :  XXXXXXXXXXXX${profile.acc || "4521"}
  Recipient Account       :  XXXXXXXXXX4523  [FLAGGED — Mule Account]
  Recipient Bank          :  HDFC Bank  [RBI Fraud Registry: Listed]
  Transaction Status      :  🔒  FROZEN BY SAFETAP AI  ✅
  Freeze Timestamp        :  ${INC_DATE},  14:32:55 IST
  Bank Reference No.      :  ${BANK_REF}
  Bank SMS Alert Sent     :  YES  →  +91-${profile.phone || "98901-12345"}
  Bank Email Alert Sent   :  YES  →  ${profile.email || "rajesh.kumar@gmail.com"}
  RBI Fraud Flag Raised   :  ✅  YES

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  SECTION 4 ─ COMPLAINTS FILED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ┌──── [A]  NATIONAL CYBER CRIME REPORTING PORTAL ───────────┐
  │                                                            │
  │  Portal URL      :  https://cybercrime.gov.in              │
  │  Helpline        :  1930  (Free, 24×7, Toll-Free)          │
  │  Complaint Ref.  :  ${CYBER_REF}                  │
  │  Filed By        :  SafeTap AI System (Auto-Filed)         │
  │  Date of Filing  :  ${INC_DATE}                           │
  │  Status          :  ✅  SUCCESSFULLY FILED & ACKNOWLEDGED  │
  │  Ack. SMS Sent   :  YES  →  +91-${profile.phone || "98901-12345"}           │
  │  Ack. Email Sent :  YES  →  ${profile.email || "rajesh.kumar@gmail.com"}     │
  └────────────────────────────────────────────────────────────┘

  ┌──── [B]  NEAREST POLICE STATION ──────────────────────────┐
  │                                                            │
  │  Station Name    :  Cyber Crime Cell,                      │
  │                     Koregaon Park Police Station, Pune     │
  │  District        :  Pune, Maharashtra – 411001             │
  │  Officer-in-Charge: Inspector Mahesh Patil  (Cyber Cell)   │
  │  Station Contact :  020-2613-0000                          │
  │  FIR Number      :  ${FIR_NUM}              │
  │  Date of FIR     :  ${INC_DATE}                           │
  │  Sections Applied:                                         │
  │    • IT Act § 66C   – Identity Theft                       │
  │    • IT Act § 66D   – Cheating by Personation (Computer)   │
  │    • IPC § 420      – Cheating & Fraudulent Delivery       │
  │    • IPC § 419      – Cheating by Personation              │
  │    • IPC § 384      – Extortion                            │
  │    • IPC § 506      – Criminal Intimidation                │
  │  Status          :  ✅  COMPLAINT FILED  (FIR Copy Issued) │
  └────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  SECTION 5 ─ GUARDIAN ALERT LOG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${guardians.length ? guardians.map((g,i)=>`  Guardian ${i+1}      :  ${g.name}  (${g.relationship})
  Contact          :  ${g.phone}
  Channels Used    :  SMS  +  WhatsApp  +  App Push Notification
  Alert Sent At    :  ${INC_DATE},  ${INC_TIME}
  Alert Message    :  "🚨 SCAM ALERT — Suspicious call detected on
                       ${profile.name}'s phone. Transaction ₹2,00,000
                       FROZEN. FIR filed. App No: ${APP_NUM}"
  Delivery Status  :  ✅  DELIVERED
`).join("\n  " + "─".repeat(60) + "\n\n") : "  No guardians were registered at time of incident."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  SECTION 6 ─ APPLICATION TRACKING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  SafeTap App No.  :  ${APP_NUM}
  FIR Number       :  ${FIR_NUM}
  Cyber Cell Ref.  :  ${CYBER_REF}
  Bank Freeze Ref. :  ${BANK_REF}

  HOW TO TRACK:
  › Online  :  https://cybercrime.gov.in  →  "Track Your Complaint"
  › Helpline :  1930  (24×7, Toll-Free)
  › Bank     :  ${profile.bank || "SBI"}  →  1800-11-2211  (Toll-Free)
  › Police   :  Koregaon Park PS  →  020-2613-0000

  ⚠️  IMPORTANT INSTRUCTIONS:
  • Carry this printed document when visiting the police station.
  • Do NOT share this document with any unknown person.
  • Keep a digital copy in a secure location.
  • Reference your App No. in ALL future communications.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  LEGAL NOTICE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  This report constitutes prima facie digital evidence under the
  Information Technology Act, 2000 (amended 2008) and is admissible
  under Section 65B of the Indian Evidence Act, 1872.

  Auto-generated by SafeTap AI Security Engine v2.1
  Digital Signature: ST-${Date.now()}-VERIFIED

╔══════════════════════════════════════════════════════════════════╗
║   © 2026  SafeTap Technologies Pvt. Ltd.  |  CIN: U72900MH2024  ║
║   Protecting India's Senior Citizens from Cyber Fraud           ║
║   www.safetap.in  •  support@safetap.in  •  1800-SAFE-TAP       ║
╚══════════════════════════════════════════════════════════════════╝
`;
}

/* ══════════════════════════════════════════════════════════════
   TINY UI COMPONENTS
══════════════════════════════════════════════════════════════ */
function Waveform({ active, color = "#ff5252" }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:3, height:36, justifyContent:"center", margin:"10px 0" }}>
      {Array.from({length:22},(_,i) => (
        <div key={i} style={{
          width:3, borderRadius:4, background:color,
          height: active ? `${6+Math.random()*26}px` : "4px",
          animation: active ? `st_wave ${0.4+Math.random()*0.6}s ease-in-out infinite alternate` : "none",
          animationDelay:`${i*0.04}s`, transition:"height 0.3s", opacity: active?0.9:0.3,
        }}/>
      ))}
    </div>
  );
}

function RiskMeter({ score, lang="en" }) {
  const color = score>70 ? "#f44336" : score>40 ? "#ff9800" : "#4caf50";
  const label = score>70 ? t(lang,"highRiskLabel") : score>40 ? t(lang,"suspiciousLabel") : t(lang,"safeLabel");
  return (
    <div style={{marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{fontSize:12,color:"#90a4ae"}}>{t(lang,"riskScore")}</span>
        <span style={{fontSize:12,fontWeight:800,color}}>{score}% — {label}</span>
      </div>
      <div style={{background:"rgba(255,255,255,0.1)",borderRadius:10,height:10,overflow:"hidden"}}>
        <div style={{height:"100%",borderRadius:10,transition:"width 1s ease",width:`${score}%`,
          background:`linear-gradient(90deg,#4caf50,${color})`}}/>
      </div>
    </div>
  );
}

function DonutProgress({ pct }) {
  const r=52, c=2*Math.PI*r, dash=c-(pct/100)*c;
  return (
    <svg width="128" height="128" viewBox="0 0 128 128">
      <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="12"/>
      <circle cx="64" cy="64" r={r} fill="none" stroke="url(#dpg)" strokeWidth="12"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={dash}
        transform="rotate(-90 64 64)" style={{transition:"stroke-dashoffset 1.2s ease"}}/>
      <defs>
        <linearGradient id="dpg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2979ff"/><stop offset="100%" stopColor="#00e5ff"/>
        </linearGradient>
      </defs>
      <text x="64" y="58" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">{pct}%</text>
      <text x="64" y="76" textAnchor="middle" fill="#90caf9" fontSize="10" fontWeight="600">COMPLETE</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════════════ */
export default function SafeTap() {
  /* ── fonts & keyframes ── */
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap');
      @keyframes st_wave   { from{transform:scaleY(1)} to{transform:scaleY(1.9)} }
      @keyframes st_pulse  { 0%,100%{opacity:1} 50%{opacity:0.35} }
      @keyframes st_fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      @keyframes st_pop    { from{opacity:0;transform:scale(0.9) translateY(30px)} to{opacity:1;transform:scale(1) translateY(0)} }
      @keyframes st_glow   { 0%,100%{box-shadow:0 0 18px rgba(239,68,68,.45)} 50%{box-shadow:0 0 46px rgba(239,68,68,.9)} }
      @keyframes st_spin   { to{transform:rotate(360deg)} }
      * { box-sizing:border-box; }
      body { margin:0; background:#07101f; }
      input,select { outline:none; }
      button { transition:transform .15s,opacity .15s; }
      button:active { transform:scale(.96); }
      ::-webkit-scrollbar { width:0; }
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  /* ── design tokens ── */
  const F   = "'Outfit', sans-serif";
  const FD  = "'Space Grotesk', sans-serif";
  const BG  = "#07101f";
  const C1  = "#1d4ed8";  // primary blue
  const C2  = "#0e7490";  // teal accent

  /* ── shared style helpers ── */
  const glass = (extra={}) => ({
    background:"rgba(255,255,255,0.04)",
    border:"1px solid rgba(255,255,255,0.09)",
    borderRadius:20, backdropFilter:"blur(12px)", ...extra,
  });
  const cardWrap = (extra={}) => ({ ...glass(), margin:"14px 16px 0", overflow:"hidden", ...extra });
  const cHead = { padding:"15px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", gap:10 };
  const cTitle = { fontSize:15, fontWeight:700, color:"#e2e8f0", fontFamily:FD };

  const inputStyle = (err=false) => ({
    width:"100%", background:"rgba(255,255,255,0.07)",
    border:`2px solid ${err?"#f87171":"rgba(255,255,255,0.13)"}`,
    borderRadius:14, padding:"15px 18px", fontSize:17, color:"#f1f5f9",
    fontFamily:F, transition:"border-color .2s",
  });
  const inputSm = () => ({
    width:"100%", background:"rgba(255,255,255,0.06)",
    border:"1.5px solid rgba(255,255,255,0.1)",
    borderRadius:12, padding:"12px 14px", fontSize:15, color:"#f1f5f9", fontFamily:F,
  });
  const lbl = { fontSize:12, fontWeight:700, color:"#7dd3fc", marginBottom:7, display:"block", letterSpacing:.4 };
  const pill = (bg,col="#fff",extra={}) => ({
    background:bg, border:"none", borderRadius:12, padding:"10px 18px",
    fontSize:13, fontWeight:700, color:col, cursor:"pointer", fontFamily:F, ...extra,
  });
  const bigBtn = (bg,shadow="") => ({
    width:"100%", background:bg, border:"none", borderRadius:18,
    padding:"21px 0", fontSize:19, fontWeight:900, color:"#fff",
    cursor:"pointer", fontFamily:FD, letterSpacing:.4,
    boxShadow:shadow||"none", marginBottom:0,
    display:"flex", alignItems:"center", justifyContent:"center", gap:10,
  });

  /* ── state: auth ── */
  const [loggedIn, setLoggedIn]     = useState(false);
  const [authMode, setAuthMode]     = useState("login");  // "login" | "register"
  const [authTab,  setAuthTab]      = useState("pin");   // "pin" | "otp"
  const [cc,       setCc]           = useState("+91");
  const [showCc,   setShowCc]       = useState(false);
  const [phone,    setPhone]        = useState("");
  const [email,    setEmail]        = useState("");
  const [pin,      setPin]          = useState("");
  const [showPin,  setShowPin]      = useState(false);
  const [pOtp,     setPOtp]         = useState("");
  const [eOtp,     setEOtp]         = useState("");
  const [pSent,    setPSent]        = useState(false);
  const [eSent,    setESent]        = useState(false);
  const [pVer,     setPVer]         = useState(false);
  const [eVer,     setEVer]         = useState(false);
  const [tries,    setTries]        = useState(3);
  const [locked,   setLocked]       = useState(false);
  const [authErr,  setAuthErr]      = useState("");
  const [voiceOn,  setVoiceOn]      = useState(false);
  const [panicOn,  setPanicOn]      = useState(false);
  const [lang,     setLang]         = useState("en");    // "en" | "hi"
  // Registration form fields
  const [reg, setReg] = useState({
    name:"", age:"", dob:"", blood:"B+",
    address:"", city:"", state:"", pincode:"",
    aadhaar:"", bank:"", acc:"", ifsc:"",
  });

  /* ── complaint steps with translations ── */
  const COMPLAINT_STEPS = [
    { id:1, label:t(lang,"step1"), pct:10  },
    { id:2, label:t(lang,"step2"), pct:20  },
    { id:3, label:t(lang,"step3"), pct:35  },
    { id:4, label:t(lang,"step4"), pct:55  },
    { id:5, label:t(lang,"step5"), pct:70  },
    { id:6, label:t(lang,"step6"), pct:80  },
    { id:7, label:t(lang,"step7"), pct:90  },
    { id:8, label:t(lang,"step8"), pct:100 },
  ];

  /* ── state: profile ── */
  const DEFAULT_PROFILE = {
    name:"Rajesh Kumar", age:"72", dob:"15-08-1952", blood:"B+",
    phone:"98901-12345", email:"rajesh.kumar@gmail.com",
    aadhaar:"7823", address:"Flat 4B, Sunrise Apartments, Koregaon Park",
    city:"Pune", state:"Maharashtra", pincode:"411001",
    bank:"State Bank of India", acc:"4521", avatar:"👴",
  };
  const [profile,  setProfile]   = useState(DEFAULT_PROFILE);
  const [editMode, setEditMode]  = useState(false);
  const [draft,    setDraft]     = useState({...DEFAULT_PROFILE});

  /* ── state: app ── */
  const [screen,   setScreen]   = useState("home");
  const [callOn,   setCallOn]   = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scam,     setScam]     = useState(false);
  const [risk,     setRisk]     = useState(0);
  const [frozen,   setFrozen]   = useState(false);
  const [gAlert,   setGAlert]   = useState(false);
  const [phrases,  setPhrases]  = useState([]);
  const [trans,    setTrans]    = useState("");
  const [callSec,  setCallSec]  = useState(0);
  const [progress, setProgress] = useState(35);
  const [incidentId, setIncidentId] = useState(null);
  const [toast,    setToast]    = useState({msg:"",type:"ok",show:false});
  const timerRef = useRef(null);

  /* ── state: guardians ── */
  const [guardians, setGuardians] = useState([
    {id:1, name:"Priya Kumar",  phone:"+91-98765-43210", relationship:"Daughter"},
    {id:2, name:"Amit Kumar",   phone:"+91-87654-32109", relationship:"Son"},
  ]);
  const [addGOpen, setAddGOpen] = useState(false);
  const [newG,     setNewG]     = useState({name:"",phone:"",relationship:"Son"});

  /* ── toast helper ── */
  const notify = (msg, type="ok", dur=3200) => {
    setToast({msg,type,show:true});
    setTimeout(() => setToast(t=>({...t,show:false})), dur);
  };

  /* ── auth handlers ── */
  const doLogin = async () => {
    setAuthErr("");
    if (!phone || phone.length < 8) { setAuthErr("⚠️  Enter a valid phone number"); return; }
    if (!pin   || pin.length   < 4) { setAuthErr("⚠️  PIN must be 4–6 digits");     return; }
    try {
      const res = await API.loginPin(phone, pin);
      if (res.authToken) {
        localStorage.setItem("st_token", res.authToken);
        setProfile(res.user);
        const gList = await API.getGuardians();
        setGuardians(gList);
        setLoggedIn(true);
      } else {
        setAuthErr(`⚠️  ${res.message || "Wrong credentials"}`);
      }
    } catch(e) {
      setAuthErr("⚠️  Network error — check connection");
    }
  };

  const doRegister = async () => {
    setAuthErr("");
    if (!phone || phone.length < 8) { setAuthErr("⚠️  Enter a valid phone number"); return; }
    if (!email || !email.includes("@")) { setAuthErr("⚠️  Enter a valid email address"); return; }
    if (!pin   || pin.length   < 4) { setAuthErr("⚠️  PIN must be 4–6 digits");     return; }
    if (!reg.name) { setAuthErr("⚠️  Enter your full name"); return; }
    try {
      const res = await API.loginPin(phone, pin);
      if (res.authToken) {
        localStorage.setItem("st_token", res.authToken);
        const userData = {...res.user, ...reg, phone, email};
        setProfile(userData);
        setLoggedIn(true);
      } else {
        setAuthErr(`⚠️  ${res.message || "Registration failed"}`);
      }
    } catch(e) {
      setAuthErr("⚠️  Network error — check connection");
    }
  };

  const sendPOtp = () => {
    if (!phone||phone.length<8) { setAuthErr("⚠️  Enter a valid phone number"); return; }
    setPSent(true); setAuthErr(""); notify("📱  OTP sent to +91-"+phone);
  };
  const sendEOtp = () => {
    if (!email||!email.includes("@")) { setAuthErr("⚠️  Enter a valid email address"); return; }
    setESent(true); setAuthErr(""); notify("📧  OTP sent to "+email);
  };
  const verifyPOtp = () => {
    if (pOtp==="123456"||pOtp.length===6) { setPVer(true); notify("✅  Phone verified!"); }
    else setAuthErr("⚠️  Wrong Phone OTP — demo: 123456");
  };
  const verifyEOtp = () => {
    if (eOtp==="654321"||eOtp.length===6) { setEVer(true); notify("✅  Email verified!"); }
    else setAuthErr("⚠️  Wrong Email OTP — demo: 654321");
  };
  const finishOtpLogin = () => {
    if (pVer && eVer) setLoggedIn(true);
    else setAuthErr("⚠️  Please verify both Phone and Email OTPs");
  };
  const triggerPanic = () => {
    setPanicOn(true); notify("📞  Calling your guardian…","warn",3000);
    setTimeout(()=>setPanicOn(false),3000);
  };
  const triggerVoice = () => {
    setVoiceOn(true);
    setTimeout(()=>{ setPhone("9890112345"); setVoiceOn(false); notify("🎙  Voice input captured!"); },2000);
  };

  /* ── app handlers ── */
  const startCall = () => {
    setCallOn(true); setCallSec(0); setScam(false); setRisk(0); setPhrases([]); setTrans("");
    timerRef.current = setInterval(()=>setCallSec(s=>s+1),1000);
    setTimeout(()=>{
      setScanning(true); let sc=0; const found=[];
      const iv = setInterval(()=>{
        sc = Math.min(94, sc+Math.floor(7+Math.random()*13)); setRisk(sc);
        const p = SCAM_PHRASES[Math.floor(Math.random()*SCAM_PHRASES.length)];
        if (!found.includes(p)) { found.push(p); setPhrases([...found]); }
        if (sc>=80) {
          clearInterval(iv); setScam(true); setScanning(false);
          setTrans(CALL_TRANSCRIPT);
          notify("🚨  SCAM DETECTED — Tap FREEZE TRANSACTION immediately!","err",6000);
          API.reportIncident({
            risk_score: sc,
            caller_number: "+91-XXXXXXX789",
            transcript: CALL_TRANSCRIPT,
            phrases_flagged: JSON.stringify(found),
          }).then(r => setIncidentId(r.incident_id));
        }
      },850);
    },2000);
  };
  const endCall = () => { setCallOn(false); clearInterval(timerRef.current); };
  // Add this NEW state near your other useState declarations:
  
// Replace the doFreeze function:
const doFreeze = async () => {
  if (frozen) return;
  setFrozen(true);
  setGAlert(true);
  notify(`🔒  Transaction FROZEN — Guardians alerted!`,"ok",4000);
  if (incidentId) {
    try {
      await API.freezeTxn(incidentId);
      const comp = await API.fileComplaint(incidentId);
      notify(`🔒 FROZEN! FIR: ${comp.fir_number}`,"ok",5000);
      setTimeout(()=>setProgress(55),1600);
      setTimeout(()=>setProgress(70),3600);
    } catch(e) {
      console.error("Freeze error:", e);
    }
  } else {
    setTimeout(()=>setProgress(55),1600);
    setTimeout(()=>setProgress(70),3600);
  }
};
  const saveProfile = async () => {
    try {
      const updated = await API.saveProfile(draft);
      setProfile(updated);
    } catch(e) {
      setProfile({...draft}); // fallback
    }
    setEditMode(false);
    notify(t(lang,"profileUpdated"));
  };
  // Replace addGuardian:
  const addGuardian = async () => {
    if (!newG.name||!newG.phone) { notify("Fill in all fields","err"); return; }
    try {
      const saved = await API.addGuardian(newG);
      setGuardians(g=>[...g, saved]);
    } catch(e) {
      setGuardians(g=>[...g,{...newG,id:Date.now()}]); // fallback
    }
    setNewG({name:"",phone:"",relationship:"Son"});
    setAddGOpen(false);
    notify("✅  Guardian added!");
  };

  const downloadReport = () => {
    const txt = buildEvidenceReport(profile, guardians);
    const a   = document.createElement("a");
    a.href     = URL.createObjectURL(new Blob([txt],{type:"text/plain"}));
    a.download = `SafeTap_Evidence_${APP_NUM}.txt`;
    a.click(); notify("📄  Evidence report downloaded!");
  };
  const fmt = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  /* ── toast colours ── */
  const toastStyle = {
    ok:  { bg:"#14532d", border:"#16a34a", txt:"#86efac" },
    err: { bg:"#450a0a", border:"#ef4444", txt:"#fca5a5" },
    warn:{ bg:"#431407", border:"#f97316", txt:"#fdba74" },
  }[toast.type]||{ bg:"#14532d", border:"#16a34a", txt:"#86efac" };

  /* ════════════════════════════════════════════════════════
     LOGIN SCREEN
  ════════════════════════════════════════════════════════ */
  if (!loggedIn) {
    return (
      <div style={{fontFamily:F, background:BG, minHeight:"100vh", maxWidth:480, margin:"0 auto", overflowX:"hidden", position:"relative"}}>
        {/* ambient blobs */}
        <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-120,left:-100,width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(29,78,216,.2),transparent 70%)"}}/>
          <div style={{position:"absolute",bottom:-100,right:-80,width:320,height:320,borderRadius:"50%",background:"radial-gradient(circle,rgba(14,116,144,.15),transparent 70%)"}}/>
        </div>

        {/* toast */}
        <div style={{position:"fixed",top:18,left:"50%",transform:`translateX(-50%) translateY(${toast.show?0:-90}px)`,zIndex:999,
          background:toastStyle.bg,border:`1px solid ${toastStyle.border}`,
          borderRadius:14,padding:"11px 22px",fontSize:13,fontWeight:700,color:toastStyle.txt,
          transition:"transform .4s ease",maxWidth:340,textAlign:"center",fontFamily:F,
          boxShadow:"0 8px 32px rgba(0,0,0,.6)"}}>
          {toast.msg}
        </div>

        <div style={{position:"relative",zIndex:1,paddingBottom:52}}>
          {/* lang toggle */}
          <div style={{position:"absolute",top:18,right:18}}>
            <button onClick={()=>setLang(l=>l==="en"?"hi":"en")} style={{...pill("rgba(29,78,216,.18)","#93c5fd"),border:"1px solid rgba(29,78,216,.35)",fontSize:12}}>
              {lang==="en"?"🇮🇳 हिंदी":"🇬🇧 English"}
            </button>
          </div>

          {/* hero */}
          <div style={{textAlign:"center",padding:"54px 0 22px",animation:"st_fadeUp .6s ease"}}>
            <div style={{width:88,height:88,borderRadius:26,margin:"0 auto 16px",
              background:"linear-gradient(135deg,#1d4ed8,#0e7490)",
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:46,
              boxShadow:"0 0 0 1px rgba(255,255,255,.08), 0 0 50px rgba(29,78,216,.5)"}}>
              🛡️
            </div>
            <h1 style={{margin:0,fontSize:42,fontWeight:900,color:"#f8fafc",fontFamily:FD,letterSpacing:-1}}>SafeTap</h1>
            <p  style={{margin:"6px 0 0",fontSize:11,color:"#7dd3fc",letterSpacing:2.5,textTransform:"uppercase",fontWeight:700}}>
              Senior Security Shield
            </p>
          </div>

          {/* login / registration card */}
          <div style={{margin:"0 18px",...glass(),padding:"28px 22px 24px",
            boxShadow:"0 24px 80px rgba(0,0,0,.6)",animation:"st_fadeUp .7s ease .1s both"}}>

            <h2 style={{margin:"0 0 4px",fontSize:26,fontWeight:900,color:"#f8fafc",fontFamily:FD}}>{authMode==="register"?t(lang,"createAccount")??t(lang,"welcomeBack"):t(lang,"welcomeBack")}</h2>
            <p  style={{margin:"0 0 22px",fontSize:13,color:"#64748b"}}>{authMode==="register"?t(lang,"joinSafeTap")??t(lang,"trustedCompanion"):t(lang,"trustedCompanion")}</p>

            {authMode==="login" && <>
            {/* tab switcher */}
            <div style={{display:"flex",gap:0,marginBottom:22,background:"rgba(255,255,255,.05)",borderRadius:14,padding:4}}>
              {[["pin",t(lang,"pinLogin")],["otp",t(lang,"otpLogin")]].map(([id,lbl]) => (
                <button key={id} onClick={()=>{setAuthTab(id);setAuthErr("");}} style={{flex:1,background:authTab===id?"linear-gradient(135deg,#1d4ed8,#0e7490)":"transparent",border:"none",borderRadius:11,padding:"11px 0",fontSize:14,fontWeight:700,color:authTab===id?"#fff":"#64748b",cursor:"pointer",fontFamily:FD,transition:"all .2s"}}>
                  {lbl}
                </button>
              ))}
            </div>

            {/* ── PIN TAB ── */}
            {authTab==="pin" && <>
              {/* phone */}
              <div style={{marginBottom:15}}>
                <span style={lbl}>{t(lang,"phoneNumber")}</span>
                <div style={{display:"flex",gap:9}}>
                  <div style={{position:"relative",flexShrink:0}}>
                    <button onClick={()=>setShowCc(p=>!p)} style={{background:"rgba(255,255,255,.08)",border:"2px solid rgba(255,255,255,.13)",borderRadius:13,padding:"15px 11px",fontSize:15,color:"#f1f5f9",cursor:"pointer",fontFamily:F,display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>
                      {COUNTRY_CODES.find(c=>c.code===cc)?.flag} {cc} ▾
                    </button>
                    {showCc && (
                      <div style={{position:"absolute",top:"108%",left:0,zIndex:60,background:"#0f1f3d",border:"1px solid rgba(29,78,216,.35)",borderRadius:14,overflow:"hidden",minWidth:190,boxShadow:"0 12px 40px rgba(0,0,0,.7)"}}>
                        {COUNTRY_CODES.map(c=>(
                          <button key={c.code} onClick={()=>{setCc(c.code);setShowCc(false);}} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"12px 14px",background:cc===c.code?"rgba(29,78,216,.2)":"transparent",border:"none",color:"#f1f5f9",fontSize:14,cursor:"pointer",fontFamily:F,borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                            {c.flag} {c.name} {c.code}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{flex:1,position:"relative"}}>
                    <input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,""))} placeholder={t(lang,"enterPhone")} type="tel" maxLength={11} style={{...inputStyle(false),paddingRight:50}}/>
                    <button onClick={triggerVoice} title="Voice input" style={{position:"absolute",right:13,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",fontSize:20,cursor:"pointer",animation:voiceOn?"st_pulse .7s infinite":"none"}}>🎙</button>
                  </div>
                </div>
              </div>
              {/* email */}
              <div style={{marginBottom:15}}>
                <span style={lbl}>{t(lang,"emailAddress")}</span>
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder={t(lang,"enterEmail")} type="email" style={inputStyle(false)}/>
              </div>
              {/* pin */}
              <div style={{marginBottom:10}}>
                <span style={lbl}>{t(lang,"pinPassword")}</span>
                <div style={{position:"relative"}}>
                  <input value={pin} onChange={e=>setPin(e.target.value.replace(/\D/g,""))} placeholder={t(lang,"enterPin")} type={showPin?"text":"password"} maxLength={6} style={{...inputStyle(!!authErr),paddingRight:52}} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
                  <button onClick={()=>setShowPin(p=>!p)} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",fontSize:21,cursor:"pointer",color:"#475569"}}>{showPin?"🙈":"👁️"}</button>
                </div>
              </div>
              {/* attempt dots */}
              {tries<3 && !locked && (
                <div style={{display:"flex",gap:7,marginBottom:9}}>
                  {[1,2,3].map(i=><div key={i} style={{flex:1,height:4,borderRadius:3,background:i<=tries?"#ef4444":"rgba(255,255,255,.1)",transition:"background .3s"}}/>)}
                </div>
              )}
              {authErr && <div style={{fontSize:13,color:"#fca5a5",marginBottom:13,padding:"10px 14px",background:"rgba(239,68,68,.1)",borderRadius:10,border:"1px solid rgba(239,68,68,.3)"}}>{authErr}</div>}
              <div style={{fontSize:12,color:"#475569",marginBottom:18}}>💡 Demo PIN: <span style={{color:"#60a5fa",fontWeight:800}}>1234</span></div>

              <button onClick={doLogin} disabled={locked} style={{...bigBtn(locked?"#374151":"linear-gradient(135deg,#1d4ed8,#0369a1)",locked?"none":"0 8px 30px rgba(29,78,216,.5)"),marginBottom:14}}>
                {t(lang,"signIn")}
              </button>
              <button onClick={()=>notify("👆  Biometric scan initiated…")} style={{...bigBtn("rgba(14,116,144,.18)"),border:"2px solid rgba(14,116,144,.3)",color:"#67e8f9",marginBottom:14}}>
                👆 Fingerprint / Face ID
              </button>
              <div style={{display:"flex",justifyContent:"space-between",paddingTop:4}}>
                <button onClick={()=>notify("Reset link sent to your email!")} style={{background:"none",border:"none",color:"#60a5fa",fontSize:13,cursor:"pointer",fontWeight:700,fontFamily:F}}>{t(lang,"forgotPin")}</button>
                <button onClick={()=>setAuthMode("register")} style={{background:"none",border:"none",color:"#60a5fa",fontSize:13,cursor:"pointer",fontWeight:700,fontFamily:F}}>{t(lang,"newUser")}</button>
              </div>
            </>}

            {/* ── OTP TAB ── */}
            {authTab==="otp" && <>
              <p style={{margin:"0 0 18px",fontSize:13,color:"#64748b"}}>Verify your identity with Phone + Email OTP for maximum security.</p>

              {/* step badges */}
              <div style={{display:"flex",gap:10,marginBottom:20}}>
                {[{label:"📱 Phone OTP",done:pVer},{label:"📧 Email OTP",done:eVer}].map((b,i)=>(
                  <div key={i} style={{flex:1,padding:"12px 10px",borderRadius:14,textAlign:"center",
                    background:b.done?"rgba(22,163,74,.14)":"rgba(29,78,216,.1)",
                    border:`1.5px solid ${b.done?"rgba(22,163,74,.4)":"rgba(29,78,216,.25)"}`}}>
                    <div style={{fontSize:22,marginBottom:3}}>{b.done?"✅":"⏳"}</div>
                    <div style={{fontSize:11,fontWeight:700,color:b.done?"#4ade80":"#93c5fd"}}>{b.label}</div>
                  </div>
                ))}
              </div>

              {/* phone panel */}
              <div style={{marginBottom:14,padding:15,...glass({borderRadius:14,border:"1px solid rgba(29,78,216,.2)"})}}>
                <div style={{fontSize:13,fontWeight:800,color:"#93c5fd",marginBottom:10}}>📱 Phone OTP</div>
                <input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,""))} placeholder="Phone number" type="tel" style={{...inputSm(),marginBottom:9}}/>
                {!pSent
                  ? <button onClick={sendPOtp} style={{...pill("linear-gradient(135deg,#1d4ed8,#0369a1)"),width:"100%",padding:"12px 0",fontSize:13}}>Send OTP to Phone</button>
                  : <div style={{display:"flex",gap:8}}>
                      <input value={pOtp} onChange={e=>setPOtp(e.target.value.replace(/\D/g,""))} placeholder="6-digit OTP" maxLength={6} style={{...inputSm(),flex:1}}/>
                      <button onClick={verifyPOtp} disabled={pVer} style={{...pill(pVer?"#14532d":"linear-gradient(135deg,#1d4ed8,#0369a1)"),padding:"12px 16px"}}>{pVer?"✅":"Verify"}</button>
                    </div>
                }
                {pSent&&<p style={{margin:"6px 0 0",fontSize:11,color:"#475569"}}>💡 Demo OTP: <span style={{color:"#60a5fa",fontWeight:800}}>123456</span></p>}
              </div>

              {/* email panel */}
              <div style={{marginBottom:14,padding:15,...glass({borderRadius:14,border:"1px solid rgba(14,116,144,.22)"})}}>
                <div style={{fontSize:13,fontWeight:800,color:"#67e8f9",marginBottom:10}}>📧 Email OTP</div>
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" type="email" style={{...inputSm(),marginBottom:9}}/>
                {!eSent
                  ? <button onClick={sendEOtp} style={{...pill("linear-gradient(135deg,#0e7490,#0f766e)"),width:"100%",padding:"12px 0",fontSize:13}}>Send OTP to Email</button>
                  : <div style={{display:"flex",gap:8}}>
                      <input value={eOtp} onChange={e=>setEOtp(e.target.value.replace(/\D/g,""))} placeholder="6-digit OTP" maxLength={6} style={{...inputSm(),flex:1}}/>
                      <button onClick={verifyEOtp} disabled={eVer} style={{...pill(eVer?"#14532d":"linear-gradient(135deg,#0e7490,#0f766e)"),padding:"12px 16px"}}>{eVer?"✅":"Verify"}</button>
                    </div>
                }
                {eSent&&<p style={{margin:"6px 0 0",fontSize:11,color:"#475569"}}>💡 Demo OTP: <span style={{color:"#67e8f9",fontWeight:800}}>654321</span></p>}
              </div>

              {authErr && <div style={{fontSize:13,color:"#fca5a5",marginBottom:12,padding:"10px 14px",background:"rgba(239,68,68,.1)",borderRadius:10,border:"1px solid rgba(239,68,68,.3)"}}>{authErr}</div>}

              <button onClick={finishOtpLogin} style={{...bigBtn((pVer&&eVer)?"linear-gradient(135deg,#1d4ed8,#0e7490)":"rgba(255,255,255,.06)",(pVer&&eVer)?"0 8px 30px rgba(29,78,216,.5)":"none"),color:(pVer&&eVer)?"#fff":"#475569",cursor:(pVer&&eVer)?"pointer":"default",marginBottom:0}}>
                {pVer&&eVer?"🔓 Complete Secure Login":"Verify Both to Continue →"}
              </button>
            </>}
            </>}

            {authMode==="register" && <>
              {/* Back to Login */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
                <button onClick={()=>{setAuthMode("login");setAuthErr("");}} style={{background:"none",border:"none",color:"#60a5fa",fontSize:13,cursor:"pointer",fontWeight:700,fontFamily:F}}>← {t(lang,"backToLogin")??t(lang,"back")}</button>
              </div>

              {/* Login Credentials */}
              <div style={{marginBottom:18,padding:14,...glass({borderRadius:14,border:"1px solid rgba(29,78,216,.2)"})}}>
                <div style={{fontSize:13,fontWeight:800,color:"#93c5fd",marginBottom:10}}>🔐 {t(lang,"loginCreds")??t(lang,"loginCredentials")}</div>
                <div style={{marginBottom:12}}>
                  <span style={lbl}>{t(lang,"phoneNumber")}</span>
                  <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+91-98765-43210" type="tel" style={inputSm()}/>
                </div>
                <div style={{marginBottom:12}}>
                  <span style={lbl}>{t(lang,"email")}</span>
                  <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" type="email" style={inputSm()}/>
                </div>
                <div>
                  <span style={lbl}>{t(lang,"pin")}</span>
                  <input value={pin} onChange={e=>setPin(e.target.value)} placeholder="4-6 digits" type={showPin?"text":"password"} style={inputSm()}/>
                </div>
              </div>

              {/* Personal Info */}
              <div style={{marginBottom:18,padding:14,...glass({borderRadius:14,border:"1px solid rgba(14,116,144,.22)"})}}>
                <div style={{fontSize:13,fontWeight:800,color:"#67e8f9",marginBottom:10}}>👤 {t(lang,"personalInfo")}</div>
                <div style={{marginBottom:12}}>
                  <span style={lbl}>{t(lang,"fullName")}</span>
                  <input value={reg.name} onChange={e=>setReg(p=>({...p,name:e.target.value}))} placeholder="Your full name" type="text" style={inputSm()}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                  <div>
                    <span style={lbl}>{t(lang,"age")??t(lang,"ageYears")}</span>
                    <input value={reg.age} onChange={e=>setReg(p=>({...p,age:e.target.value}))} placeholder="Age" type="number" style={inputSm()}/>
                  </div>
                  <div>
                    <span style={lbl}>{t(lang,"dob")}</span>
                    <input value={reg.dob} onChange={e=>setReg(p=>({...p,dob:e.target.value}))} placeholder="DD/MM/YYYY" type="text" style={inputSm()}/>
                  </div>
                </div>
                <div style={{marginBottom:12}}>
                  <span style={lbl}>{t(lang,"bloodGroup")}</span>
                  <select value={reg.blood} onChange={e=>setReg(p=>({...p,blood:e.target.value}))} style={{...inputSm(),appearance:"none",backgroundImage:"url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgMTIgOCI+PHBhdGggZmlsbD0iIzY0NzQ4YiIgZD0iTTAgMGw2IDggNi04eiIvPjwvc3ZnPg==)",backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center",paddingRight:"30px"}}>
                    {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg=><option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:12}}>
                  <span style={lbl}>{t(lang,"address")}</span>
                  <input value={reg.address} onChange={e=>setReg(p=>({...p,address:e.target.value}))} placeholder="Street address" type="text" style={inputSm()}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div>
                    <span style={lbl}>{t(lang,"city")}</span>
                    <input value={reg.city} onChange={e=>setReg(p=>({...p,city:e.target.value}))} placeholder="City" type="text" style={inputSm()}/>
                  </div>
                  <div>
                    <span style={lbl}>{t(lang,"state")}</span>
                    <input value={reg.state} onChange={e=>setReg(p=>({...p,state:e.target.value}))} placeholder="State" type="text" style={inputSm()}/>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div style={{marginBottom:18,padding:14,...glass({borderRadius:14,border:"1px solid rgba(168,85,247,.2)"})}}>
                <div style={{fontSize:13,fontWeight:800,color:"#d8b4fe",marginBottom:10}}>🏦 {t(lang,"bankDetails")}</div>
                <div style={{marginBottom:12}}>
                  <span style={lbl}>{t(lang,"bankName")}</span>
                  <input value={reg.bank} onChange={e=>setReg(p=>({...p,bank:e.target.value}))} placeholder="e.g. HDFC Bank" type="text" style={inputSm()}/>
                </div>
                <div style={{marginBottom:12}}>
                  <span style={lbl}>{t(lang,"accountLast4")}</span>
                  <input value={reg.acc} onChange={e=>setReg(p=>({...p,acc:e.target.value}))} placeholder="Last 4 digits" type="text" maxLength={4} style={inputSm()}/>
                </div>
                <div>
                  <span style={lbl}>{t(lang,"ifsc")}</span>
                  <input value={reg.ifsc} onChange={e=>setReg(p=>({...p,ifsc:e.target.value}))} placeholder="e.g. HDFC0001234" type="text" style={inputSm()}/>
                </div>
              </div>

              {authErr && <div style={{fontSize:13,color:"#fca5a5",marginBottom:12,padding:"10px 14px",background:"rgba(239,68,68,.1)",borderRadius:10,border:"1px solid rgba(239,68,68,.3)"}}>{authErr}</div>}

              <button onClick={doRegister} style={{...bigBtn("linear-gradient(135deg,#1d4ed8,#0e7490)","0 8px 30px rgba(29,78,216,.5)"),marginBottom:0}}>
                ✅ {t(lang,"createAccount")??t(lang,"register")}
              </button>
            </>}
          </div>

          {/* PANIC BUTTON */}
          <div style={{margin:"18px 18px 0",animation:"st_fadeUp .8s ease .2s both"}}>
            <button onClick={triggerPanic} style={{...bigBtn(panicOn?"rgba(127,29,29,.6)":"linear-gradient(135deg,#dc2626,#991b1b)","0 0 28px rgba(220,38,38,.5)"),border:"2px solid rgba(239,68,68,.45)",animation:panicOn?"st_glow 1s infinite":"none"}}>
              {panicOn?t(lang,"callingGuardian"):t(lang,"emergency")}
            </button>
            <p style={{margin:"8px 0 0",textAlign:"center",fontSize:11,color:"#334155",fontWeight:600}}>Available even before login · No PIN required</p>
          </div>

          {/* badges */}
          <div style={{display:"flex",justifyContent:"center",gap:22,margin:"18px 18px 0",padding:"13px 18px",...glass({borderRadius:14})}}>
            {[t(lang,"encrypted"),t(lang,"secure2fa"),t(lang,"zeroTrust")].map(b=>(
              <span key={b} style={{fontSize:11,color:"#334155",fontWeight:700}}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════
     MAIN APP — shared header + nav
  ════════════════════════════════════════════════════════ */

  /* ── SCREEN: HOME ── */
  const HomeScreen = () => (
    <div style={{padding:"0 0 108px"}}>
      {/* status card */}
      <div style={{...cardWrap({background:"linear-gradient(135deg,rgba(29,78,216,.12),rgba(14,116,144,.09))",border:"1px solid rgba(29,78,216,.22)"})}}>
        <div style={{padding:"22px",textAlign:"center"}}>
          <div style={{fontSize:56,marginBottom:8}}>{scam?"🚨":callOn?"📞":"🛡️"}</div>
          <div style={{fontSize:22,fontWeight:900,fontFamily:FD,color:scam?"#f87171":callOn?"#fbbf24":"#60a5fa",marginBottom:4}}>
            {scam?t(lang,"scamDetected"):callOn?`${t(lang,"monitoringCall")} ${fmt(callSec)}`:t(lang,"youreProtected")}
          </div>
          <div style={{fontSize:13,color:"#475569"}}>{scam?t(lang,"tapFreezeNow"):callOn?t(lang,"aiAnalysing"):t(lang,"safeMonitoring")}</div>
          {callOn && <Waveform active color={scam?"#f87171":"#60a5fa"}/>}
        </div>
      </div>

      {/* scam detail */}
      {(callOn||scam) && (
        <div style={{background:"linear-gradient(135deg,rgba(239,68,68,.14),rgba(127,29,29,.1))",border:"1px solid rgba(239,68,68,.38)",borderRadius:18,margin:"14px 16px 0",padding:20,boxShadow:"0 0 28px rgba(239,68,68,.1)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontSize:17,fontWeight:900,fontFamily:FD,color:"#f87171"}}>{scanning?"⚡ Analysing…":scam?"🚨 SCAM ALERT":"🔍 Scanning"}</div>
            <span style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:700,background:scam?"#dc2626":"#d97706",color:"#fff"}}>{scam?"HIGH RISK":"LIVE"}</span>
          </div>
          <RiskMeter score={risk} lang={lang}/>
          {phrases.length>0 && (
            <div>
          <div style={{fontSize:11,color:"#94a3b8",marginBottom:8}}>{t(lang,"suspPhrases")}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {phrases.map((p,i)=><span key={i} style={{background:"rgba(239,68,68,.18)",border:"1px solid rgba(239,68,68,.3)",borderRadius:8,padding:"3px 9px",fontSize:11,color:"#fca5a5"}}>✗ {p}</span>)}
              </div>
            </div>
          )}
          {trans && (
            <div style={{marginTop:14,background:"rgba(0,0,0,.35)",borderRadius:12,padding:13,fontSize:11,color:"#fecaca",lineHeight:1.8}}>
              <div style={{color:"#94a3b8",marginBottom:5,fontSize:10,textTransform:"uppercase",letterSpacing:1.2}}>📼 Live Transcript</div>
              {trans}
            </div>
          )}
        </div>
      )}

      {gAlert && (
        <div style={{...cardWrap({background:"rgba(20,83,45,.2)",border:"1px solid rgba(22,163,74,.3)"})}}>
          <div style={{padding:16,display:"flex",alignItems:"center",gap:13}}>
            <div style={{fontSize:30}}>👨‍👩‍👧‍👦</div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:"#86efac"}}>{t(lang,"guardiansAlerted")}</div>
              <div style={{fontSize:12,color:"#4ade80"}}>{guardians.map(g=>g.name).join(" & ")} · {t(lang,"smsSent")}</div>
            </div>
          </div>
        </div>
      )}
      {frozen && (
        <div style={{...cardWrap({background:"rgba(15,23,42,.3)",border:"1px solid rgba(56,189,248,.3)"})}}>
          <div style={{padding:16,display:"flex",alignItems:"center",gap:13}}>
            <div style={{fontSize:30}}>🔒</div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:"#7dd3fc"}}>{t(lang,"txnFrozen")}</div>
              <div style={{fontSize:12,color:"#38bdf8"}}>₹2,00,000 transfer blocked · Bank notified · RBI flagged</div>
            </div>
          </div>
        </div>
      )}

      <div style={{padding:"16px 16px 0"}}>
        <button onClick={doFreeze} style={{...bigBtn("linear-gradient(135deg,#dc2626,#991b1b)","0 8px 32px rgba(220,38,38,.5)")}}>
          {t(lang,"freezeBtn")}
        </button>
      </div>
      <div style={{display:"flex",gap:11,padding:"12px 16px 0"}}>
        {!callOn
          ? <button onClick={startCall} style={{...pill("linear-gradient(135deg,#5b21b6,#4c1d95)"),flex:1,padding:"15px 0",fontSize:14}}>{t(lang,"simulateCall")}</button>
          : <button onClick={endCall}   style={{...pill("rgba(55,65,81,.8)","#e2e8f0",{border:"1px solid rgba(255,255,255,.1)"}),flex:1,padding:"15px 0",fontSize:14}}>{t(lang,"endCall")}</button>
        }
        <button onClick={downloadReport} style={{...pill("linear-gradient(135deg,#065f46,#064e3b)"),flex:1,padding:"15px 0",fontSize:14}}>{t(lang,"downloadReport")}</button>
      </div>
      <div style={{margin:"14px 16px 0",padding:"13px 16px",...glass(),borderRadius:14}}>
        <div style={{fontSize:10,color:"#475569",marginBottom:4,fontWeight:700,letterSpacing:.8,textTransform:"uppercase"}}>{t(lang,"appTracking")}</div>
        <div style={{fontSize:17,fontWeight:900,color:"#60a5fa",letterSpacing:1,fontFamily:FD}}>{APP_NUM}</div>
        <div style={{fontSize:11,color:"#334155",marginTop:2}}>{t(lang,"trackAt")}</div>
      </div>
    </div>
  );

  /* ── SCREEN: PROFILE ── */
  const ProfileScreen = () => {
    const p = editMode ? draft : profile;
    const Row = ({k, label, type="text", ph=""}) => (
      <div style={{marginBottom:13}}>
        <span style={lbl}>{label}</span>
        {editMode
          ? <input value={draft[k]||""} onChange={e=>setDraft(d=>({...d,[k]:e.target.value}))} placeholder={ph||label} type={type} style={inputSm()}/>
          : <div style={{fontSize:15,color:"#e2e8f0",fontWeight:600,padding:"11px 14px",...glass({borderRadius:12,border:"1px solid rgba(255,255,255,.07)"})}}>{p[k]||"—"}</div>
        }
      </div>
    );
    return (
      <div style={{padding:"0 0 108px"}}>
        {/* hero */}
        <div style={{...cardWrap({background:"linear-gradient(135deg,rgba(29,78,216,.14),rgba(14,116,144,.1))",border:"1px solid rgba(29,78,216,.24)"})}}>
          <div style={{padding:"22px 20px",display:"flex",alignItems:"center",gap:16}}>
            <div style={{width:74,height:74,borderRadius:22,background:"linear-gradient(135deg,#1d4ed8,#0e7490)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,flexShrink:0,boxShadow:"0 0 28px rgba(29,78,216,.45)"}}>
              {profile.avatar}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:22,fontWeight:900,color:"#f8fafc",fontFamily:FD,lineHeight:1.2}}>{profile.name}</div>
              <div style={{fontSize:12,color:"#7dd3fc",marginTop:5}}>📱 +91-{profile.phone}</div>
              <div style={{fontSize:12,color:"#7dd3fc"}}>✉️ {profile.email}</div>
              <div style={{display:"flex",gap:6,marginTop:9,flexWrap:"wrap"}}>
                <span style={{background:"rgba(22,163,74,.15)",border:"1px solid rgba(22,163,74,.35)",borderRadius:8,padding:"3px 9px",fontSize:11,color:"#4ade80",fontWeight:700}}>📱 Phone ✅</span>
                <span style={{background:"rgba(22,163,74,.15)",border:"1px solid rgba(22,163,74,.35)",borderRadius:8,padding:"3px 9px",fontSize:11,color:"#4ade80",fontWeight:700}}>📧 Email ✅</span>
                <span style={{background:"rgba(29,78,216,.15)",border:"1px solid rgba(29,78,216,.35)",borderRadius:8,padding:"3px 9px",fontSize:11,color:"#93c5fd",fontWeight:700}}>🩸 {profile.blood}</span>
              </div>
            </div>
          </div>
        </div>

        {/* avatar picker */}
        {editMode && (
          <div style={cardWrap()}>
            <div style={{...cHead}}><span style={{fontSize:20}}>🖼️</span><span style={cTitle}>{t(lang,"chooseAvatar")}</span></div>
            <div style={{padding:"14px 18px",display:"flex",gap:12}}>
              {AVATARS.map(av=>(
                <button key={av} onClick={()=>setDraft(d=>({...d,avatar:av}))} style={{width:52,height:52,borderRadius:14,fontSize:28,background:draft.avatar===av?"rgba(29,78,216,.35)":"rgba(255,255,255,.06)",border:`2px solid ${draft.avatar===av?"#3b82f6":"rgba(255,255,255,.1)"}`,cursor:"pointer"}}>
                  {av}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* personal info */}
        <div style={cardWrap()}>
          <div style={{...cHead,justifyContent:"space-between"}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:20}}>👤</span><span style={cTitle}>{t(lang,"personalInfo")}</span></div>
            {!editMode
              ? <button onClick={()=>{setDraft({...profile});setEditMode(true);}} style={{...pill("linear-gradient(135deg,#1d4ed8,#0369a1)"),fontSize:12,padding:"8px 16px"}}>{t(lang,"editProfile")}</button>
              : <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>setEditMode(false)} style={{...pill("rgba(255,255,255,.08)","#94a3b8"),fontSize:12,padding:"8px 14px"}}>{t(lang,"cancel")}</button>
                  <button onClick={saveProfile} style={{...pill("linear-gradient(135deg,#065f46,#064e3b)"),fontSize:12,padding:"8px 16px"}}>{t(lang,"saveProfile")}</button>
                </div>
            }
          </div>
          <div style={{padding:"16px 20px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
              <div><Row k="name" label={t(lang,"fullName")}/></div>
              <div><Row k="age"  label={t(lang,"age")} type="number"/></div>
              <div><Row k="dob"  label={t(lang,"dob")}/></div>
              <div>
                <span style={lbl}>{t(lang,"bloodGroup")}</span>
                {editMode
                  ? <select value={draft.blood||"B+"} onChange={e=>setDraft(d=>({...d,blood:e.target.value}))} style={{...inputSm(),cursor:"pointer",color:"#f1f5f9",background:"rgba(255,255,255,.06)"}}>
                      {BLOODS.map(b=><option key={b} value={b}>{b}</option>)}
                    </select>
                  : <div style={{fontSize:15,color:"#f87171",fontWeight:800,padding:"11px 14px",...glass({borderRadius:12,border:"1px solid rgba(239,68,68,.2)",background:"rgba(239,68,68,.07)"})}}>{profile.blood}</div>
                }
              </div>
            </div>
            <Row k="address" label={t(lang,"homeAddress")}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0 10px"}}>
              <div><Row k="city"    label={t(lang,"city")}/></div>
              <div><Row k="state"   label={t(lang,"state")}/></div>
              <div><Row k="pincode" label={t(lang,"pincode")}/></div>
            </div>
          </div>
        </div>

        {/* security info */}
        <div style={cardWrap()}>
          <div style={{...cHead}}><span style={{fontSize:20}}>🔐</span><span style={cTitle}>{t(lang,"securityIdentity")}</span></div>
          <div style={{padding:"16px 20px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
              <div><Row k="phone"   label={t(lang,"phone")} type="tel"/></div>
              <div><Row k="email"   label={t(lang,"email")}  type="email"/></div>
              <div><Row k="aadhaar" label={t(lang,"aadhaar")}/></div>
              <div>
                <span style={lbl}>{t(lang,"verificationStatus")}</span>
                <div style={{padding:"11px 14px",...glass({borderRadius:12,border:"1px solid rgba(22,163,74,.2)",background:"rgba(22,163,74,.07)"})}}>
                  <div style={{fontSize:12,color:"#4ade80",fontWeight:700}}>{t(lang,"phoneVerified")}</div>
                  <div style={{fontSize:12,color:"#4ade80",fontWeight:700,marginTop:4}}>{t(lang,"emailVerified")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bank */}
        <div style={cardWrap()}>
          <div style={{...cHead}}><span style={{fontSize:20}}>🏦</span><span style={cTitle}>{t(lang,"bankDetails")}</span></div>
          <div style={{padding:"16px 20px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
              <div><Row k="bank" label={t(lang,"bankName")}/></div>
              <div><Row k="acc"  label={t(lang,"accountLast4")}/></div>
            </div>
          </div>
        </div>

        {/* actions */}
        <div style={{display:"flex",gap:11,padding:"12px 16px 0"}}>
          <button onClick={()=>setLang(l=>l==="en"?"hi":"en")} style={{...pill("rgba(29,78,216,.12)","#93c5fd",{border:"2px solid rgba(29,78,216,.28)"}),flex:1,padding:"14px 0",fontSize:14}}>🌐 {lang==="en"?t(lang,"switchHindi"):t(lang,"switchEnglish")}</button>
          <button onClick={() => {
            localStorage.removeItem("st_token");
            setLoggedIn(false);
            setProfile(DEFAULT_PROFILE);
            setGuardians([]);
          }} style={{...pill("rgba(239,68,68,.1)","#fca5a5",{border:"2px solid rgba(239,68,68,.24)"}),flex:1,padding:"14px 0",fontSize:14}}>{t(lang,"logout")}</button>
        </div>
      </div>
    );
  };

  /* ── SCREEN: GUARDIANS ── */
  const GuardiansScreen = () => (
    <div style={{padding:"0 0 108px"}}>
      <div style={cardWrap()}>
        <div style={{...cHead,justifyContent:"space-between"}}>
          <div style={{display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:22}}>👨‍👩‍👧‍👦</span><span style={cTitle}>{t(lang,"myGuardians")}</span></div>
          <button onClick={()=>setAddGOpen(true)} style={{...pill("linear-gradient(135deg,#1d4ed8,#0369a1)"),fontSize:13,padding:"9px 16px"}}>{t(lang,"addGuardian")}</button>
        </div>
        <div style={{padding:"14px 20px"}}>
          {guardians.length===0 && <div style={{textAlign:"center",padding:"24px 0",color:"#475569",fontSize:14}}>{t(lang,"noGuardians")}</div>}
          {guardians.map((g,i)=>(
            <div key={g.id} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:i<guardians.length-1?"1px solid rgba(255,255,255,.06)":"none"}}>
              <div style={{width:50,height:50,borderRadius:16,background:`linear-gradient(135deg,hsl(${(g.id*67)%360},65%,30%),hsl(${(g.id*67+50)%360},65%,20%))`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>
                {g.relationship==="Son"?"👨":g.relationship==="Daughter"?"👩":g.relationship==="Spouse"?"💑":"👤"}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:"#e2e8f0"}}>{g.name}</div>
                <div style={{fontSize:12,color:"#64748b"}}>{g.relationship} · {g.phone}</div>
              </div>
              onClick={async ()=>{
                try { await API.delGuardian(g.id); } catch(e) {}
                setGuardians(p=>p.filter(x=>x.id!==g.id));
                notify(t(lang,"guardianRemoved"),"warn");
              }}
            </div>
          ))}
        </div>
      </div>

      {addGOpen && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setAddGOpen(false)}>
          <div style={{width:"100%",maxWidth:480,...glass({borderRadius:"24px 24px 0 0",border:"1px solid rgba(29,78,216,.25)"}),padding:"26px 22px 44px",animation:"st_pop .3s ease"}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:20,fontWeight:900,color:"#f8fafc",fontFamily:FD,marginBottom:20}}>{t(lang,"addGuardian")}</div>
            {[{k:"name",l:t(lang,"guardianName"),t:"text",ph:"e.g. Priya Kumar"},{k:"phone",l:t(lang,"guardianPhone"),t:"tel",ph:"+91-98765-43210"}].map(f=>(
              <div key={f.k} style={{marginBottom:14}}>
                <span style={lbl}>{f.l}</span>
                <input value={newG[f.k]} onChange={e=>setNewG(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph} type={f.t} style={inputSm()}/>
              </div>
            ))}
            <span style={lbl}>{t(lang,"relationship")}</span>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:22}}>
              {RELS.map(r=>(
                <button type="button" key={r} onClick={()=>setNewG(p=>({...p,relationship:r}))} style={{...pill(newG.relationship===r?"linear-gradient(135deg,#1d4ed8,#0369a1)":"rgba(255,255,255,.07)",newG.relationship===r?"#fff":"#64748b",{border:newG.relationship===r?"none":"1px solid rgba(255,255,255,.1)"}),padding:"9px 14px",fontSize:13}}>
                  {r}
                </button>
              ))}
            </div>
            <div style={{display:"flex",gap:11}}>
              <button type="button" onClick={()=>setAddGOpen(false)} style={{...pill("rgba(255,255,255,.07)","#94a3b8",{border:"1px solid rgba(255,255,255,.1)"}),flex:1,padding:"16px 0",fontSize:15}}>{t(lang,"cancel")}</button>
              <button type="button" onClick={addGuardian} style={{...pill("linear-gradient(135deg,#1d4ed8,#0e7490)"),flex:2,padding:"16px 0",fontSize:16,fontFamily:FD}}>{t(lang,"saveGuardian")}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{...cardWrap({background:"rgba(20,83,45,.14)",border:"1px solid rgba(22,163,74,.2)"})}}>
        <div style={{padding:16}}>
          <div style={{fontSize:13,color:"#86efac",lineHeight:1.8}}>✅ {t(lang,"guardiansAlertMsg")} <strong style={{color:"#4ade80"}}>{t(lang,"guardiansAlertMsg2")}</strong> {t(lang,"guardiansAlertMsg3")}</div>
        </div>
      </div>
    </div>
  );

  /* ── SCREEN: PROGRESS ── */
  const ProgressScreen = () => (
    <div style={{padding:"0 0 108px"}}>
      <div style={cardWrap()}>
        <div style={{...cHead}}><span style={{fontSize:22}}>⚖️</span>
          <div><div style={cTitle}>{t(lang,"complaintProgress")}</div><div style={{fontSize:11,color:"#475569"}}>App No: {APP_NUM}</div></div>
        </div>
        <div style={{padding:"22px",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <DonutProgress pct={progress}/>
          <div style={{marginTop:11,fontSize:13,color:"#64748b",textAlign:"center"}}>
            {progress<100?t(lang,"activelyProcessed"):t(lang,"caseResolved")}
          </div>
        </div>
      </div>

      <div style={cardWrap()}>
        <div style={{...cHead}}><span style={{fontSize:22}}>📋</span><span style={cTitle}>{t(lang,"stepTracker")}</span></div>
        <div style={{padding:"12px 20px 20px"}}>
          {COMPLAINT_STEPS.map((step,idx)=>{
            const done   = step.pct <= progress;
            const active = !done && (idx===0 || COMPLAINT_STEPS[idx-1].pct<=progress);
            return (
              <div key={step.id} style={{display:"flex",gap:12,marginBottom:14,alignItems:"flex-start"}}>
                <div style={{width:30,height:30,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,
                  background:done?"linear-gradient(135deg,#16a34a,#0d9488)":active?"rgba(29,78,216,.28)":"rgba(255,255,255,.06)",
                  border:done?"none":active?"2px solid #3b82f6":"2px solid rgba(255,255,255,.1)",
                  color:done?"#fff":active?"#60a5fa":"#475569",
                  animation:active?"st_pulse 1.5s infinite":"none"}}>
                  {done?"✓":step.id}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:done?"#86efac":active?"#e2e8f0":"#475569",marginBottom:3}}>{step.label}</div>
                  <div style={{background:"rgba(255,255,255,.09)",borderRadius:10,height:4,overflow:"hidden"}}>
                    <div style={{height:"100%",borderRadius:10,width:`${done?100:active?50:0}%`,
                      background:done?"linear-gradient(90deg,#16a34a,#0d9488)":"linear-gradient(90deg,#1d4ed8,#06b6d4)",
                      transition:"width 1s ease"}}/>
                  </div>
                  <div style={{fontSize:11,color:"#334155",marginTop:3}}>
                    {done?t(lang,"completed"):active?t(lang,"inProgress"):t(lang,"pending")}
                  </div>
                </div>
                <div style={{fontSize:11,fontWeight:800,color:done?"#4ade80":"#334155",whiteSpace:"nowrap"}}>{step.pct}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evidence report card */}
      <div style={{...cardWrap({background:"rgba(6,78,59,.14)",border:"1px solid rgba(16,185,129,.22)"})}}>
        <div style={{...cHead}}><span style={{fontSize:22}}>📄</span><span style={cTitle}>{t(lang,"evidenceReport")}</span></div>
        <div style={{padding:"14px 20px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            {[
              {l:"Application No",v:APP_NUM,   c:"#60a5fa"},
              {l:"FIR Number",    v:FIR_NUM,   c:"#fb923c"},
              {l:"Cyber Cell Ref",v:CYBER_REF.slice(0,18)+"…",c:"#22d3ee"},
              {l:"Bank Freeze Ref",v:BANK_REF, c:"#a78bfa"},
            ].map(item=>(
              <div key={item.l} style={{padding:"10px 13px",...glass({borderRadius:12})}}>
                <div style={{fontSize:10,color:"#475569",marginBottom:4,fontWeight:700,letterSpacing:.5,textTransform:"uppercase"}}>{item.l}</div>
                <div style={{fontSize:12,fontWeight:800,color:item.c,wordBreak:"break-all"}}>{item.v}</div>
              </div>
            ))}
          </div>
          <button onClick={downloadReport} style={{...bigBtn("linear-gradient(135deg,#065f46,#064e3b)","0 6px 20px rgba(6,78,59,.5)"),...{fontFamily:FD}}}>
            {t(lang,"downloadFull")}
          </button>
          <p style={{margin:"10px 0 0",fontSize:12,color:"#334155",textAlign:"center"}}>{t(lang,"reportIncludes")}</p>
        </div>
      </div>
    </div>
  );

  /* ── SCREEN: INFO ── */
  const InfoScreen = () => (
    <div style={{padding:"0 0 108px"}}>
      <div style={cardWrap()}>
        <div style={{...cHead}}><span style={{fontSize:22}}>ℹ️</span><span style={cTitle}>{t(lang,"aboutSafeTap")}</span></div>
        <div style={{padding:"14px 20px"}}>
          {[
            {icon:"🤖",t:t(lang,"feat1Title"),d:t(lang,"feat1Desc")},
            {icon:"🔒",t:t(lang,"feat2Title"),d:t(lang,"feat2Desc")},
            {icon:"👨‍👩‍👧‍👦",t:t(lang,"feat3Title"),d:t(lang,"feat3Desc")},
            {icon:"⚖️",t:t(lang,"feat4Title"),d:t(lang,"feat4Desc")},
            {icon:"📄",t:t(lang,"feat5Title"),d:t(lang,"feat5Desc")},
          ].map(f=>(
            <div key={f.t} style={{display:"flex",gap:14,marginBottom:12,padding:13,...glass({borderRadius:14})}}>
              <div style={{fontSize:26}}>{f.icon}</div>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:"#e2e8f0",marginBottom:3,fontFamily:FD}}>{f.t}</div>
                <div style={{fontSize:12,color:"#475569",lineHeight:1.6}}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{...cardWrap({background:"rgba(69,10,10,.2)",border:"1px solid rgba(239,68,68,.2)"})}}>
        <div style={{padding:18}}>
          <div style={{fontSize:17,fontWeight:900,fontFamily:FD,color:"#f87171",marginBottom:14,textAlign:"center"}}>{t(lang,"emergencyNumbers")}</div>
          {[[t(lang,"cyberCrime"),"1930"],[t(lang,"police"),"100"],[t(lang,"safetapSupport"),"1800-SAFE-TAP"]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
              <span style={{fontSize:14,color:"#64748b"}}>{k}</span>
              <span style={{fontSize:17,fontWeight:900,color:"#f87171",fontFamily:FD}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const NAV = [
    {id:"home",     icon:"🏠", label:"Home"},
    {id:"progress", icon:"⚖️", label:"Progress"},
    {id:"guardians",icon:"👨‍👩‍👧‍👦",label:"Guardians"},
    {id:"profile",  icon:"👤", label:"Profile"},
    {id:"info",     icon:"ℹ️", label:"Info"},
  ];
  const SCREENS = {home:HomeScreen, progress:ProgressScreen, guardians:GuardiansScreen, profile:ProfileScreen, info:InfoScreen};
  const Active  = SCREENS[screen] || HomeScreen;

  return (
    <div style={{fontFamily:F, background:BG, minHeight:"100vh", maxWidth:480, margin:"0 auto", overflowX:"hidden", position:"relative"}}>
      {/* toast */}
      <div style={{position:"fixed",top:18,left:"50%",transform:`translateX(-50%) translateY(${toast.show?0:-90}px)`,zIndex:999,
        background:toastStyle.bg,border:`1px solid ${toastStyle.border}`,
        borderRadius:14,padding:"11px 22px",fontSize:13,fontWeight:700,color:toastStyle.txt,
        transition:"transform .4s ease",maxWidth:340,textAlign:"center",fontFamily:F,
        boxShadow:"0 8px 32px rgba(0,0,0,.6)"}}>
        {toast.msg}
      </div>

      {/* header */}
      <div style={{background:"linear-gradient(135deg,#0c1830,#190a2a)",padding:"13px 18px",borderBottom:"1px solid rgba(100,160,255,.13)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:11}}>
          <div style={{width:40,height:40,borderRadius:13,background:"linear-gradient(135deg,#1d4ed8,#0e7490)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:"0 0 22px rgba(29,78,216,.5)"}}>🛡️</div>
          <div>
            <div style={{fontSize:21,fontWeight:900,color:"#f8fafc",fontFamily:FD,letterSpacing:-.5}}>SafeTap</div>
            <div style={{fontSize:9,color:"#7dd3fc",letterSpacing:2,textTransform:"uppercase",fontWeight:700}}>Senior Security Shield</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {/* profile avatar shortcut */}
          <button onClick={()=>setScreen("profile")} style={{width:36,height:36,borderRadius:11,background:"linear-gradient(135deg,#1d4ed8,#0e7490)",border:screen==="profile"?"2px solid #60a5fa":"2px solid transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,cursor:"pointer"}}>
            {profile.avatar}
          </button>
          <span style={{padding:"4px 11px",borderRadius:20,fontSize:11,fontWeight:700,background:scam?"#dc2626":callOn?"#d97706":"#14532d",color:"#fff",letterSpacing:.5}}>
            {scam?"THREAT":callOn?"LIVE":"SAFE"}
          </span>
        </div>
      </div>

      <Active/>

      {/* nav bar */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#0c1830",borderTop:"1px solid rgba(100,160,255,.18)",display:"flex",justifyContent:"space-around",padding:"7px 0 12px",zIndex:100}}>
        {NAV.map(n=>(
          <button key={n.id} onClick={()=>setScreen(n.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",color:screen===n.id?"#3b82f6":"#475569",padding:"3px 8px",borderRadius:10,fontFamily:F,position:"relative"}}>
            <span style={{fontSize:20,transition:"transform .2s",transform:screen===n.id?"scale(1.15)":"scale(1)"}}>{n.icon}</span>
            <span style={{fontSize:9,fontWeight:700,letterSpacing:.4}}>{n.label}</span>
            {screen===n.id && <div style={{position:"absolute",bottom:-8,left:"50%",transform:"translateX(-50%)",width:20,height:3,borderRadius:2,background:"#3b82f6"}}/>}
          </button>
        ))}
      </div>
    </div>
  );
}
