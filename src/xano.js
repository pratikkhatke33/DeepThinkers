// xano.js
const BASE = process.env.REACT_APP_XANO_URL;

const token   = () => localStorage.getItem("st_token");
const authH   = () => ({ "Content-Type":"application/json", "Authorization":`Bearer ${token()}` });
const openH   = () => ({ "Content-Type":"application/json" });

const post  = (url, body, auth=false) =>
  fetch(BASE+url, { method:"POST", headers: auth?authH():openH(), body:JSON.stringify(body) }).then(r=>r.json());
const get   = (url) =>
  fetch(BASE+url, { headers: authH() }).then(r=>r.json());
const patch = (url, body) =>
  fetch(BASE+url, { method:"PATCH", headers: authH(), body:JSON.stringify(body) }).then(r=>r.json());
const del   = (url) =>
  fetch(BASE+url, { method:"DELETE", headers: authH() }).then(r=>r.json());

// AUTH
export const register    = (d) => post("/auth/Register_User", d);
export const loginPin    = (phone, pin) => post("/auth/Login_Pin", {phone, pin});
export const sendOtp     = (target, type) => post("/auth/Send_OTP", {target, type});
export const verifyOtp   = (target, otp_code, type) => post("/auth/Verify_OTP", {target, otp_code, type});

// PROFILE
export const getProfile  = () => get("/users/profile");
export const saveProfile = (d) => patch("/users/profile", d);

// GUARDIANS
export const getGuardians = () => get("/guardians");
export const addGuardian  = (d) => post("/guardians", d, true);
export const delGuardian  = (id) => del(`/guardians/${id}`);

// INCIDENTS
export const reportIncident = (d) => post("/incidents/report", d, true);
export const freezeTxn      = (id) => post(`/incidents/${id}/freeze`, {}, true);
export const fileComplaint  = (id) => post(`/incidents/${id}/file-complaint`, {}, true);