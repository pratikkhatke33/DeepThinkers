import { useState, useEffect, useRef } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_APP_NUMBER = "SFT-2024-" + Math.floor(100000 + Math.random() * 900000);
const GUARDIAN_PHONE = "+91-98765-43210";
const NEAREST_STATION = "Cyber Crime Cell, Koregaon Park Police Station, Pune";
const CYBER_CELL = "Cyber Crime Cell, Maharashtra – cybercrime.gov.in / 1930";

const SCAM_PHRASES = [
  "digital arrest", "freeze your account", "cci officer", "legal notice",
  "immediate payment", "warrant issued", "you are under arrest", "do not tell anyone",
  "transfer money", "narcotics", "money laundering", "fbi", "interpol"
];

const SUSPICIOUS_CALL_TRANSCRIPT = `
Caller: "Hello, this is Officer Rajesh from the Cyber Crime Investigation Department. 
We have a warrant against you for money laundering. Your account will be frozen immediately. 
You need to transfer ₹2,00,000 to a safe account right now. Do not tell anyone about this call. 
This is a digital arrest. You cannot leave your home. Stay on the line."
`;

// ─── COMPLAINT PROGRESS STEPS ─────────────────────────────────────────────────
const COMPLAINT_STEPS = [
  { id: 1, label: "Scam Detected & Logged", pct: 10, done: true },
  { id: 2, label: "Panic Alert Sent to Guardian", pct: 20, done: true },
  { id: 3, label: "Transaction Frozen", pct: 35, done: true },
  { id: 4, label: "Complaint Filed – Cyber Cell (1930)", pct: 55, done: false },
  { id: 5, label: "Complaint Filed – Nearest Police Station", pct: 70, done: false },
  { id: 6, label: "Bank Notified & Evidence Preserved", pct: 80, done: false },
  { id: 7, label: "Case Under Investigation", pct: 90, done: false },
  { id: 8, label: "Resolution & Closure", pct: 100, done: false },
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  app: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#0a0f1e",
    minHeight: "100vh",
    color: "#e8eaf6",
    maxWidth: 480,
    margin: "0 auto",
    position: "relative",
    overflowX: "hidden",
  },
  screen: { padding: "0 0 100px 0" },
  header: {
    background: "linear-gradient(135deg, #0d1b3e 0%, #1a0a2e 100%)",
    padding: "20px 20px 16px",
    borderBottom: "1px solid rgba(100,160,255,0.15)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  logo: { display: "flex", alignItems: "center", gap: 10 },
  logoIcon: {
    width: 40, height: 40, borderRadius: 12,
    background: "linear-gradient(135deg, #2979ff, #00bcd4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 22, boxShadow: "0 0 20px rgba(41,121,255,0.5)",
  },
  logoText: { fontSize: 22, fontWeight: 800, letterSpacing: -0.5, color: "#fff" },
  logoSub: { fontSize: 10, color: "#90caf9", letterSpacing: 1.5, textTransform: "uppercase" },
  statusBadge: (color) => ({
    padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
    background: color, letterSpacing: 0.5, textTransform: "uppercase",
    border: `1px solid ${color}44`, boxShadow: `0 0 10px ${color}44`,
  }),
  navBar: {
    position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
    width: "100%", maxWidth: 480,
    background: "#0d1b3e", borderTop: "1px solid rgba(100,160,255,0.2)",
    display: "flex", justifyContent: "space-around", padding: "8px 0 12px",
    zIndex: 100,
  },
  navBtn: (active) => ({
    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
    background: "none", border: "none", cursor: "pointer",
    color: active ? "#2979ff" : "#546e7a", padding: "4px 12px", borderRadius: 10,
    transition: "all 0.2s",
  }),
  navIcon: { fontSize: 22 },
  navLabel: { fontSize: 10, fontWeight: 600, letterSpacing: 0.5 },

  // Cards
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20, margin: "16px 16px 0",
    overflow: "hidden", backdropFilter: "blur(10px)",
  },
  cardHeader: {
    padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)",
    display: "flex", alignItems: "center", gap: 10,
  },
  cardTitle: { fontSize: 15, fontWeight: 700, color: "#e8eaf6" },
  cardBody: { padding: "16px 20px" },

  // Scam panel
  scamAlert: {
    background: "linear-gradient(135deg, rgba(244,67,54,0.15), rgba(183,28,28,0.1))",
    border: "1px solid rgba(244,67,54,0.4)", borderRadius: 16,
    margin: "16px 16px 0", padding: 20,
    boxShadow: "0 0 30px rgba(244,67,54,0.15)",
  },
  scamTitle: { fontSize: 18, fontWeight: 800, color: "#ff5252", marginBottom: 8 },
  scamDetail: { fontSize: 13, color: "#ffcdd2", lineHeight: 1.6 },

  // Buttons
  panicBtn: {
    background: "linear-gradient(135deg, #d32f2f, #b71c1c)",
    border: "none", borderRadius: 20, padding: "22px 0",
    fontSize: 20, fontWeight: 800, color: "#fff", cursor: "pointer",
    width: "100%", letterSpacing: 0.5, textTransform: "uppercase",
    boxShadow: "0 8px 30px rgba(211,47,47,0.5)",
    transition: "all 0.2s", display: "flex", alignItems: "center",
    justifyContent: "center", gap: 10,
  },
  verifyBtn: {
    background: "linear-gradient(135deg, #1565c0, #0d47a1)",
    border: "none", borderRadius: 20, padding: "22px 0",
    fontSize: 20, fontWeight: 800, color: "#fff", cursor: "pointer",
    width: "100%", letterSpacing: 0.5, textTransform: "uppercase",
    boxShadow: "0 8px 30px rgba(21,101,192,0.5)",
    transition: "all 0.2s", display: "flex", alignItems: "center",
    justifyContent: "center", gap: 10,
  },
  actionRow: { display: "flex", gap: 12, padding: "16px 16px 0" },
  reportBtn: {
    background: "linear-gradient(135deg, #00796b, #004d40)",
    border: "none", borderRadius: 16, padding: "16px 0",
    fontSize: 15, fontWeight: 700, color: "#fff", cursor: "pointer",
    width: "100%", display: "flex", alignItems: "center",
    justifyContent: "center", gap: 8, boxShadow: "0 4px 20px rgba(0,121,107,0.4)",
  },

  // Progress bar
  progressTrack: { background: "rgba(255,255,255,0.1)", borderRadius: 10, height: 8, overflow: "hidden" },
  progressFill: (pct, done) => ({
    height: "100%", borderRadius: 10, transition: "width 1s ease",
    width: `${pct}%`,
    background: done
      ? "linear-gradient(90deg, #00e676, #00bfa5)"
      : "linear-gradient(90deg, #2979ff, #00bcd4)",
  }),

  // Toast
  toast: (show) => ({
    position: "fixed", top: 20, left: "50%", transform: `translateX(-50%) translateY(${show ? 0 : -80}px)`,
    background: "#1b5e20", border: "1px solid #2e7d32",
    borderRadius: 14, padding: "12px 24px", fontSize: 13, fontWeight: 600,
    color: "#a5d6a7", zIndex: 999, transition: "transform 0.4s ease",
    maxWidth: 340, textAlign: "center", boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
  }),

  // Waveform
  waveWrap: {
    display: "flex", alignItems: "center", gap: 3,
    height: 40, justifyContent: "center", margin: "12px 0",
  },
};

// ─── WAVEFORM COMPONENT ───────────────────────────────────────────────────────
function Waveform({ active, color = "#ff5252" }) {
  const bars = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div style={S.waveWrap}>
      {bars.map((i) => (
        <div key={i} style={{
          width: 3, borderRadius: 4,
          background: color,
          height: active ? `${8 + Math.random() * 28}px` : "4px",
          animation: active ? `wave ${0.4 + Math.random() * 0.6}s ease-in-out infinite alternate` : "none",
          animationDelay: `${i * 0.04}s`,
          transition: "height 0.3s",
          opacity: active ? 0.9 : 0.3,
        }} />
      ))}
    </div>
  );
}

// ─── SCAM METER ───────────────────────────────────────────────────────────────
function ScamMeter({ score }) {
  const color = score > 70 ? "#f44336" : score > 40 ? "#ff9800" : "#4caf50";
  const label = score > 70 ? "HIGH RISK" : score > 40 ? "SUSPICIOUS" : "SAFE";
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "#90a4ae" }}>Scam Risk Score</span>
        <span style={{ fontSize: 13, fontWeight: 800, color }}>{score}% – {label}</span>
      </div>
      <div style={S.progressTrack}>
        <div style={{ ...S.progressFill(score, false), background: `linear-gradient(90deg, #4caf50, ${color})` }} />
      </div>
    </div>
  );
}

// ─── CIRCULAR PROGRESS ───────────────────────────────────────────────────────
function CircularProgress({ pct }) {
  const r = 54, c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg width="130" height="130" viewBox="0 0 130 130">
      <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
      <circle cx="65" cy="65" r={r} fill="none"
        stroke="url(#pg)" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={offset}
        transform="rotate(-90 65 65)" style={{ transition: "stroke-dashoffset 1s ease" }} />
      <defs>
        <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2979ff" />
          <stop offset="100%" stopColor="#00bcd4" />
        </linearGradient>
      </defs>
      <text x="65" y="60" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="800">{pct}%</text>
      <text x="65" y="78" textAnchor="middle" fill="#90caf9" fontSize="10">Complete</text>
    </svg>
  );
}

// ─── REPORT GENERATOR ────────────────────────────────────────────────────────
function generateReport(appNum, callData) {
  const now = new Date();
  const dateStr = now.toLocaleString("en-IN", { dateStyle: "full", timeStyle: "medium" });
  return `
╔══════════════════════════════════════════════════════════════╗
              SAFETAP – OFFICIAL INCIDENT REPORT
               Physical Evidence Documentation
╚══════════════════════════════════════════════════════════════╝

APPLICATION NUMBER: ${appNum}
Generated On: ${dateStr}
Status: COMPLAINT SUCCESSFULLY FILED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 – VICTIM DETAILS
──────────────────────────
Name         : Rajesh Kumar (Senior Citizen)
Phone        : +91-98901-12345
Address      : Flat 4B, Sunrise Apartments, Pune – 411001
Guardian     : ${GUARDIAN_PHONE}
Age          : 72 years

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 2 – CALLER / SUSPECT DETAILS
─────────────────────────────────────
Caller Name        : "Officer Rajesh" (Fake Identity)
Caller Number      : +91-XXXXXXX789 (Spoofed)
Call Duration      : 4 minutes 32 seconds
Call Timestamp     : ${dateStr}
Call Type          : Voice (Incoming)
Spoofing Detected  : YES
Scam Risk Score    : 94% (HIGH RISK)
Scam Category      : Digital Arrest / Psychological Pressure

Suspicious Phrases Detected:
  ✗ "digital arrest"
  ✗ "you are under arrest"
  ✗ "do not tell anyone"
  ✗ "transfer money immediately"
  ✗ "money laundering"
  ✗ "legal notice"

Sentiment Analysis Result:
  Stress Level Detected   : HIGH (Victim)
  Pressure Cues Detected  : YES (Caller)
  Coercion Indicators     : 6 flagged phrases
  AI Confidence Score     : 94.2%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 3 – TRANSACTION DETAILS (FROZEN)
─────────────────────────────────────────
Transaction ID     : TXN-2024-${Math.floor(Math.random()*999999)}
Attempted Amount   : ₹2,00,000
Recipient Account  : XXXXXXXXXX4523 (Flagged Fraudulent)
Bank               : State Bank of India
Status             : ✅ FROZEN BY SAFETAP
Freeze Timestamp   : ${dateStr}
Bank Alert Sent    : YES (via SMS + Email)
Bank Reference No  : SBI-FREEZE-${Math.floor(Math.random()*999999)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 4 – COMPLAINT FILING STATUS
─────────────────────────────────────
[A] CYBER CRIME CELL COMPLAINT
    Portal       : cybercrime.gov.in / Helpline 1930
    Reference No : CYBER-MH-2024-${Math.floor(Math.random()*999999)}
    Status       : ✅ SUCCESSFULLY FILED
    Acknowledgement Sent To Victim: YES

[B] NEAREST POLICE STATION
    Station Name : ${NEAREST_STATION}
    FIR Number   : FIR/MH/PUNE/${Math.floor(1000+Math.random()*9000)}/2024
    Under Section: IT Act 66C, 66D | IPC 420, 419
    Status       : ✅ COMPLAINT FILED
    Officer-in-Charge: Inspector Patil (Cyber Cell)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 5 – GUARDIAN ALERTS SENT
──────────────────────────────────
Guardian Phone : ${GUARDIAN_PHONE}
Channels Used  : SMS + WhatsApp + App Notification
Alert Time     : ${dateStr}
Alert Content  : "🚨 SCAM ALERT: Suspicious call detected for
                  Rajesh Kumar. Transaction of ₹2,00,000 frozen.
                  Complaint filed. App No: ${appNum}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 6 – HOW TO TRACK YOUR APPLICATION
───────────────────────────────────────────
Application No : ${appNum}
Track at       : cybercrime.gov.in → "Track Complaint"
Helpline       : 1930 (Free, 24×7)
Email Updates  : rajesh.kumar@email.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This report is computer-generated by SafeTap AI Security System.
Keep this document safe as physical evidence.
Do NOT share this document with unknown persons.

© 2024 SafeTap – Protecting India's Seniors
──────────────────────────────────────────────────────────────
`;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function SafeTap() {
  const [screen, setScreen] = useState("home");
  const [callActive, setCallActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [scamDetected, setScamDetected] = useState(false);
  const [scamScore, setScamScore] = useState(0);
  const [txFrozen, setTxFrozen] = useState(false);
  const [guardianAlerted, setGuardianAlerted] = useState(false);
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [complaintFiled, setComplaintFiled] = useState(false);
  const [complaintProgress, setComplaintProgress] = useState(35);
  const [detectedPhrases, setDetectedPhrases] = useState([]);
  const [transcript, setTranscript] = useState("");
  const [appNum] = useState(MOCK_APP_NUMBER);
  const [callTimer, setCallTimer] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
      @keyframes wave { from { transform: scaleY(1); } to { transform: scaleY(1.8); } }
      @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
      * { box-sizing: border-box; }
      body { margin: 0; background: #0a0f1e; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const showAlert = (msg, dur = 3000) => {
    setToast(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), dur);
  };

  const startCall = () => {
    setCallActive(true);
    setCallTimer(0);
    setScamDetected(false);
    setScamScore(0);
    setDetectedPhrases([]);
    setTranscript("");
    timerRef.current = setInterval(() => setCallTimer(t => t + 1), 1000);
    // Start analysis after 2s
    setTimeout(() => {
      setAnalyzing(true);
      let score = 0;
      const found = [];
      const interval = setInterval(() => {
        score = Math.min(94, score + Math.floor(8 + Math.random() * 12));
        setScamScore(score);
        const phrase = SCAM_PHRASES[Math.floor(Math.random() * SCAM_PHRASES.length)];
        if (!found.includes(phrase)) { found.push(phrase); setDetectedPhrases([...found]); }
        if (score >= 80) {
          clearInterval(interval);
          setScamDetected(true);
          setAnalyzing(false);
          setTranscript(SUSPICIOUS_CALL_TRANSCRIPT.trim());
          showAlert("🚨 SCAM DETECTED! Tap PANIC to freeze transaction.", 5000);
        }
      }, 800);
    }, 2000);
  };

  const endCall = () => {
    setCallActive(false);
    clearInterval(timerRef.current);
  };

  const handlePanic = () => {
    if (!txFrozen) {
      setTxFrozen(true);
      setGuardianAlerted(true);
      setComplaintFiled(true);
      setComplaintProgress(35);
      showAlert("🔒 Transaction FROZEN! Guardian alerted. Complaint filed.", 4000);
      // Animate progress
      setTimeout(() => setComplaintProgress(55), 1500);
      setTimeout(() => setComplaintProgress(70), 3000);
    }
  };

  const handleVerify = () => {
    showAlert("✅ Verification request sent. Guardian will confirm.", 3000);
  };

  const downloadReport = () => {
    const text = generateReport(appNum, {});
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SafeTap_Report_${appNum}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showAlert("📄 Report downloaded successfully!", 3000);
  };

  const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const currentStep = COMPLAINT_STEPS.findIndex(s => s.pct > complaintProgress);
  const activeStepIdx = currentStep === -1 ? COMPLAINT_STEPS.length - 1 : Math.max(0, currentStep - 1);

  // ── SCREENS ────────────────────────────────────────────────────────────────

  const HomeScreen = () => (
    <div style={S.screen}>
      {/* Hero status */}
      <div style={{ ...S.card, background: "linear-gradient(135deg, rgba(41,121,255,0.1), rgba(0,188,212,0.08))", border: "1px solid rgba(41,121,255,0.2)" }}>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{scamDetected ? "🚨" : callActive ? "📞" : "🛡️"}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: scamDetected ? "#ff5252" : callActive ? "#ffb300" : "#64b5f6", marginBottom: 4 }}>
            {scamDetected ? "SCAM DETECTED!" : callActive ? "Call In Progress..." : "You're Protected"}
          </div>
          <div style={{ fontSize: 13, color: "#78909c" }}>
            {scamDetected ? "AI has flagged this call as HIGH RISK" : callActive ? `Analyzing call • ${fmtTime(callTimer)}` : "SafeTap is monitoring your calls"}
          </div>
          {callActive && <Waveform active={true} color={scamDetected ? "#ff5252" : "#2979ff"} />}
        </div>
      </div>

      {/* Scam detection panel */}
      {(callActive || scamDetected) && (
        <div style={S.scamAlert}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={S.scamTitle}>
              {analyzing ? "⚡ Analyzing..." : scamDetected ? "🚨 SCAM ALERT" : "🔍 Monitoring"}
            </div>
            <span style={{ ...S.statusBadge(scamDetected ? "#f44336" : "#ff9800"), fontSize: 10 }}>
              {scamDetected ? "HIGH RISK" : analyzing ? "SCANNING" : "LIVE"}
            </span>
          </div>
          <ScamMeter score={scamScore} />
          {detectedPhrases.length > 0 && (
            <div>
              <div style={{ fontSize: 11, color: "#90a4ae", marginBottom: 8 }}>🎯 Suspicious Phrases Detected:</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {detectedPhrases.map((p, i) => (
                  <span key={i} style={{ background: "rgba(244,67,54,0.2)", border: "1px solid rgba(244,67,54,0.3)", borderRadius: 8, padding: "3px 8px", fontSize: 11, color: "#ff8a80" }}>
                    ✗ {p}
                  </span>
                ))}
              </div>
            </div>
          )}
          {transcript && (
            <div style={{ marginTop: 12, background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 12, fontSize: 11, color: "#ffcdd2", lineHeight: 1.7 }}>
              <div style={{ color: "#90a4ae", marginBottom: 4, fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>Live Transcript</div>
              {transcript}
            </div>
          )}
        </div>
      )}

      {/* Guardian alert status */}
      {guardianAlerted && (
        <div style={{ ...S.card, background: "rgba(27,94,32,0.2)", border: "1px solid rgba(76,175,80,0.3)" }}>
          <div style={{ padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 28 }}>👨‍👩‍👧‍👦</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#a5d6a7" }}>Guardian Alerted ✅</div>
              <div style={{ fontSize: 12, color: "#81c784" }}>{GUARDIAN_PHONE} notified via SMS & WhatsApp</div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction freeze status */}
      {txFrozen && (
        <div style={{ ...S.card, background: "rgba(13,71,161,0.2)", border: "1px solid rgba(33,150,243,0.3)" }}>
          <div style={{ padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 28 }}>🔒</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#90caf9" }}>Transaction Frozen ✅</div>
              <div style={{ fontSize: 12, color: "#64b5f6" }}>₹2,00,000 transfer blocked • Bank notified</div>
            </div>
          </div>
        </div>
      )}

      {/* PANIC + VERIFY Buttons */}
      <div style={{ padding: "16px 16px 0" }}>
        <button style={S.panicBtn} onClick={handlePanic}>
          🆘 PANIC – FREEZE TRANSACTION
        </button>
      </div>
      <div style={{ padding: "12px 16px 0" }}>
        <button style={S.verifyBtn} onClick={handleVerify}>
          ✅ VERIFY CALLER
        </button>
      </div>

      {/* Simulate call / end call */}
      <div style={S.actionRow}>
        {!callActive ? (
          <button onClick={startCall} style={{ ...S.reportBtn, background: "linear-gradient(135deg, #6a1b9a, #4a148c)" }}>
            📞 Simulate Scam Call
          </button>
        ) : (
          <button onClick={endCall} style={{ ...S.reportBtn, background: "linear-gradient(135deg, #424242, #212121)" }}>
            📵 End Call
          </button>
        )}
        <button onClick={downloadReport} style={S.reportBtn}>
          📄 Download Report
        </button>
      </div>

      {/* App Number */}
      <div style={{ margin: "16px 16px 0", padding: "12px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 11, color: "#546e7a", marginBottom: 4 }}>📋 Application Tracking Number</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#2979ff", letterSpacing: 1 }}>{appNum}</div>
        <div style={{ fontSize: 11, color: "#546e7a" }}>Track at cybercrime.gov.in | Helpline: 1930</div>
      </div>
    </div>
  );

  const ComplaintScreen = () => {
    const steps3 = COMPLAINT_STEPS.map((s, i) => ({ ...s, done: s.pct <= complaintProgress }));
    const completedCount = steps3.filter(s => s.done).length;
    const overallPct = Math.round((completedCount / steps3.length) * 100);

    return (
      <div style={S.screen}>
        <div style={{ ...S.card }}>
          <div style={S.cardHeader}>
            <span style={{ fontSize: 20 }}>⚖️</span>
            <div>
              <div style={S.cardTitle}>Complaint Progress</div>
              <div style={{ fontSize: 11, color: "#546e7a" }}>Application: {appNum}</div>
            </div>
          </div>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <CircularProgress pct={complaintProgress} />
            <div style={{ marginTop: 12, fontSize: 13, color: "#78909c", textAlign: "center" }}>
              {complaintProgress < 100 ? "Complaint is actively being processed" : "Case Resolved ✅"}
            </div>
          </div>
        </div>

        {/* Step tracker */}
        <div style={S.card}>
          <div style={S.cardHeader}>
            <span style={{ fontSize: 20 }}>📋</span>
            <div style={S.cardTitle}>Step-by-Step Progress</div>
          </div>
          <div style={{ padding: "12px 20px 20px" }}>
            {COMPLAINT_STEPS.map((step, idx) => {
              const done = step.pct <= complaintProgress;
              const active = !done && (idx === 0 || COMPLAINT_STEPS[idx - 1].pct <= complaintProgress);
              return (
                <div key={step.id} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800,
                    background: done ? "linear-gradient(135deg,#00e676,#00bfa5)" : active ? "rgba(41,121,255,0.3)" : "rgba(255,255,255,0.06)",
                    border: done ? "none" : active ? "2px solid #2979ff" : "2px solid rgba(255,255,255,0.1)",
                    color: done ? "#fff" : active ? "#2979ff" : "#546e7a",
                    animation: active ? "pulse 1.5s infinite" : "none",
                  }}>
                    {done ? "✓" : step.id}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: done ? "#a5d6a7" : active ? "#e8eaf6" : "#546e7a", marginBottom: 4 }}>
                      {step.label}
                    </div>
                    <div style={{ ...S.progressTrack, height: 4 }}>
                      <div style={{ ...S.progressFill(done ? 100 : active ? 50 : 0, done) }} />
                    </div>
                    <div style={{ fontSize: 11, color: "#37474f", marginTop: 4 }}>
                      {done ? "✅ Completed" : active ? "⏳ In Progress..." : "Pending"}
                    </div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: done ? "#00e676" : "#37474f", whiteSpace: "nowrap" }}>
                    {step.pct}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filed complaints info */}
        <div style={S.card}>
          <div style={S.cardHeader}>
            <span style={{ fontSize: 20 }}>🏛️</span>
            <div style={S.cardTitle}>Complaint Details</div>
          </div>
          <div style={{ padding: "16px 20px" }}>
            <div style={{ marginBottom: 16, padding: 12, background: "rgba(21,101,192,0.15)", borderRadius: 10, border: "1px solid rgba(21,101,192,0.3)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#90caf9", marginBottom: 6 }}>🌐 National Cyber Crime Portal</div>
              <div style={{ fontSize: 12, color: "#78909c", lineHeight: 1.6 }}>
                Portal: cybercrime.gov.in<br />
                Helpline: <span style={{ color: "#2979ff", fontWeight: 700 }}>1930</span><br />
                Ref: CYBER-MH-2024-482910<br />
                Status: <span style={{ color: "#4caf50" }}>✅ Filed</span>
              </div>
            </div>
            <div style={{ padding: 12, background: "rgba(74,20,140,0.15)", borderRadius: 10, border: "1px solid rgba(156,39,176,0.3)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#ce93d8", marginBottom: 6 }}>🚔 {NEAREST_STATION}</div>
              <div style={{ fontSize: 12, color: "#78909c", lineHeight: 1.6 }}>
                FIR: FIR/MH/PUNE/4821/2024<br />
                Under: IT Act 66C, 66D | IPC 420, 419<br />
                Officer: Inspector Patil<br />
                Status: <span style={{ color: "#4caf50" }}>✅ Filed</span>
              </div>
            </div>
          </div>
        </div>

        <div style={S.actionRow}>
          <button onClick={downloadReport} style={S.reportBtn}>
            📥 Download Evidence Report
          </button>
        </div>
      </div>
    );
  };

  const GuardianScreen = () => (
    <div style={S.screen}>
      <div style={S.card}>
        <div style={S.cardHeader}>
          <span style={{ fontSize: 20 }}>👨‍👩‍👧‍👦</span>
          <div style={S.cardTitle}>Guardian Dashboard</div>
        </div>
        <div style={{ padding: "16px 20px" }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            {[
              { icon: "🚨", label: "Alerts", val: "3", color: "#f44336" },
              { icon: "🔒", label: "Frozen", val: txFrozen ? "1" : "0", color: "#2979ff" },
              { icon: "✅", label: "Verified", val: "0", color: "#4caf50" },
            ].map((s) => (
              <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 24 }}>{s.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 10, color: "#546e7a" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert feed */}
      <div style={S.card}>
        <div style={S.cardHeader}>
          <span style={{ fontSize: 20 }}>🔔</span>
          <div style={S.cardTitle}>Live Alerts</div>
        </div>
        <div style={{ padding: "12px 20px 20px" }}>
          {[
            { time: "Just now", msg: "🚨 HIGH RISK call detected – Scam Score 94%", type: "danger", icon: "🆘" },
            { time: "1 min ago", msg: "🔒 Transaction ₹2,00,000 frozen successfully", type: "warning", icon: "🔒" },
            { time: "2 min ago", msg: "📋 Complaint filed at cyber cell & police station", type: "info", icon: "📋" },
          ].map((alert, i) => (
            <div key={i} style={{
              padding: 14, borderRadius: 12, marginBottom: 10, display: "flex", gap: 12, alignItems: "flex-start",
              background: alert.type === "danger" ? "rgba(244,67,54,0.1)" : alert.type === "warning" ? "rgba(255,152,0,0.1)" : "rgba(41,121,255,0.1)",
              border: `1px solid ${alert.type === "danger" ? "rgba(244,67,54,0.3)" : alert.type === "warning" ? "rgba(255,152,0,0.3)" : "rgba(41,121,255,0.3)"}`,
            }}>
              <div style={{ fontSize: 24 }}>{alert.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#e8eaf6", lineHeight: 1.5 }}>{alert.msg}</div>
                <div style={{ fontSize: 11, color: "#546e7a", marginTop: 4 }}>{alert.time}</div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button onClick={() => showAlert("✅ Action Approved by Guardian!")} style={{ ...S.reportBtn, flex: 1, padding: "12px 0", fontSize: 13 }}>
              ✅ Approve Action
            </button>
            <button onClick={() => showAlert("🔒 Transaction remains frozen.")} style={{ ...S.reportBtn, flex: 1, padding: "12px 0", fontSize: 13, background: "linear-gradient(135deg,#b71c1c,#880e4f)" }}>
              ❌ Keep Frozen
            </button>
          </div>
        </div>
      </div>

      {/* Caller info */}
      <div style={S.card}>
        <div style={S.cardHeader}>
          <span style={{ fontSize: 20 }}>📞</span>
          <div style={S.cardTitle}>Caller Intelligence</div>
        </div>
        <div style={{ padding: "16px 20px" }}>
          {[
            ["Caller Name", '"Officer Rajesh" (Fake)'],
            ["Caller Number", "+91-XXXXXXX789 (Spoofed)"],
            ["Call Duration", "4 min 32 sec"],
            ["Location", "Untraced / VoIP"],
            ["Scam Category", "Digital Arrest"],
            ["Risk Score", "94% – HIGH RISK"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontSize: 12, color: "#546e7a" }}>{k}</span>
              <span style={{ fontSize: 12, color: "#e8eaf6", fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={S.actionRow}>
        <button onClick={downloadReport} style={S.reportBtn}>📄 Download Full Report</button>
      </div>
    </div>
  );

  const InfoScreen = () => (
    <div style={S.screen}>
      <div style={S.card}>
        <div style={S.cardHeader}>
          <span style={{ fontSize: 20 }}>ℹ️</span>
          <div style={S.cardTitle}>About SafeTap</div>
        </div>
        <div style={{ padding: "16px 20px" }}>
          <div style={{ fontSize: 14, color: "#90a4ae", lineHeight: 1.8, marginBottom: 16 }}>
            SafeTap is an AI-powered security shield for senior citizens, protecting against digital arrest scams, psychological cyber fraud, and fake government impersonation calls.
          </div>
          {[
            { icon: "🤖", title: "AI Scam Detection", desc: "Real-time NLP analysis of calls to detect pressure, fear cues, and 50+ scam phrases" },
            { icon: "🔒", title: "Instant Transaction Freeze", desc: "One tap freezes any pending bank transaction via mock banking API" },
            { icon: "👨‍👩‍👧‍👦", title: "Guardian Alerts", desc: "SMS, WhatsApp, and app notifications sent instantly to trusted family" },
            { icon: "⚖️", title: "Auto Complaint Filing", desc: "Automatically files complaint at cyber cell (1930) and nearest police station" },
            { icon: "📄", title: "Evidence Report", desc: "Downloadable PDF with caller details, transaction info, FIR numbers" },
          ].map((f) => (
            <div key={f.title} style={{ display: "flex", gap: 14, marginBottom: 16, padding: 14, background: "rgba(255,255,255,0.03)", borderRadius: 12 }}>
              <div style={{ fontSize: 28 }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#e8eaf6", marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "#546e7a", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...S.card, background: "rgba(183,28,28,0.1)", border: "1px solid rgba(244,67,54,0.2)" }}>
        <div style={{ padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🆘</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#ff5252", marginBottom: 8 }}>Emergency Numbers</div>
          {[["Cyber Crime Helpline", "1930"], ["Police", "100"], ["SafeTap Support", "1800-SAFE-TAP"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontSize: 13, color: "#78909c" }}>{k}</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#ff5252" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const screens = { home: HomeScreen, complaint: ComplaintScreen, guardian: GuardianScreen, info: InfoScreen };
  const ActiveScreen = screens[screen];

  return (
    <div style={S.app}>
      {/* Toast */}
      <div style={S.toast(showToast)}>{toast}</div>

      {/* Header */}
      <div style={S.header}>
        <div style={S.logo}>
          <div style={S.logoIcon}>🛡️</div>
          <div>
            <div style={S.logoText}>SafeTap</div>
            <div style={S.logoSub}>Senior Security Shield</div>
          </div>
        </div>
        <span style={S.statusBadge(scamDetected ? "#f44336" : callActive ? "#ff9800" : "#1b5e20")}>
          {scamDetected ? "🚨 THREAT" : callActive ? "⚡ LIVE" : "🛡️ SAFE"}
        </span>
      </div>

      {/* Main content */}
      <ActiveScreen />

      {/* Nav bar */}
      <div style={S.navBar}>
        {[
          { id: "home", icon: "🏠", label: "Home" },
          { id: "complaint", icon: "⚖️", label: "Progress" },
          { id: "guardian", icon: "👨‍👩‍👧‍👦", label: "Guardian" },
          { id: "info", icon: "ℹ️", label: "Info" },
        ].map((n) => (
          <button key={n.id} style={S.navBtn(screen === n.id)} onClick={() => setScreen(n.id)}>
            <span style={S.navIcon}>{n.icon}</span>
            <span style={S.navLabel}>{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
