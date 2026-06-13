import React, { useState } from 'react'
import logo from "../assets/Devlogo.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendurl = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "", emailId: "",
    password: "", age: "", gender: "", about: "", skills: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendurl}/api/auth/signup`, {
        ...form,
        skills: form.skills.split(","),
      });
      if (res.data.success) {
        toast.success("Signed up successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="su-root">
        {/* Orbs */}
        <div className="su-orb su-orb--a" aria-hidden="true" />
        <div className="su-orb su-orb--b" aria-hidden="true" />
        <div className="su-orb su-orb--c" aria-hidden="true" />

        <div className="su-card">
          {/* Header */}
          <div className="su-card__header">
            <img src={logo} alt="DevMatch" className="su-logo" />
            <h1 className="su-title">Join the network</h1>
            <p className="su-subtitle">Connect with developers worldwide</p>
          </div>

          <form onSubmit={SubmitHandler} className="su-form">
            {/* Name row */}
            <div className="su-row">
              <div className="su-field">
                <label className="su-label">First Name</label>
                <input className="su-input" type="text" name="firstName"
                  placeholder="Ada" onChange={handleChange} />
              </div>
              <div className="su-field">
                <label className="su-label">Last Name</label>
                <input className="su-input" type="text" name="lastName"
                  placeholder="Lovelace" onChange={handleChange} />
              </div>
            </div>

            {/* Email */}
            <div className="su-field">
              <label className="su-label">Email</label>
              <div className="su-input-wrap">
                <svg className="su-input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M1 5.5l7 4.5 7-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <input className="su-input su-input--icon" type="email" name="emailId"
                  placeholder="ada@example.com" onChange={handleChange} />
              </div>
            </div>

            {/* Password */}
            <div className="su-field">
              <label className="su-label">Password</label>
              <div className="su-input-wrap">
                <svg className="su-input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M5 7V5a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <input className="su-input su-input--icon su-input--pad-r" type={showPassword ? "text" : "password"}
                  name="password" placeholder="Min. 8 characters" onChange={handleChange} />
                <button type="button" className="su-eye" onClick={() => setShowPassword(p => !p)} tabIndex={-1}>
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z" stroke="currentColor" strokeWidth="1.4"/>
                      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
                      <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z" stroke="currentColor" strokeWidth="1.4"/>
                      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Age + Gender */}
            <div className="su-row">
              <div className="su-field">
                <label className="su-label">Age</label>
                <input className="su-input" type="number" name="age"
                  placeholder="25" onChange={handleChange} />
              </div>
              <div className="su-field">
                <label className="su-label">Gender</label>
                <select className="su-input su-select" name="gender" onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* About */}
            <div className="su-field">
              <label className="su-label">About <span className="su-label__opt">optional</span></label>
              <input className="su-input" type="text" name="about"
                placeholder="Full-stack dev who loves open source…" onChange={handleChange} />
            </div>

            {/* Skills */}
            <div className="su-field">
              <label className="su-label">Skills <span className="su-label__opt">comma separated</span></label>
              <input className="su-input" type="text" name="skills"
                placeholder="React, Node.js, MongoDB" onChange={handleChange} />
            </div>

            <button type="submit" className="su-btn">
              Create Account
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          <p className="su-footer">
            Already have an account?{" "}
            <Link to="/login" className="su-footer__link">Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
};

const css = `
  .su-root {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
    padding: 40px 16px;
  }

  /* Orbs */
  .su-orb {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    filter: blur(80px);
    animation: suPulse ease-in-out infinite alternate;
  }
  .su-orb--a {
    width: 460px; height: 460px;
    background: rgba(124,58,237,0.09);
    top: -130px; left: -130px;
    animation-duration: 9s;
  }
  .su-orb--b {
    width: 340px; height: 340px;
    background: rgba(6,182,212,0.07);
    bottom: -80px; right: -80px;
    animation-duration: 12s;
  }
  .su-orb--c {
    width: 260px; height: 260px;
    background: rgba(236,72,153,0.05);
    top: 50%; left: 60%;
    animation-duration: 15s;
  }
  @keyframes suPulse {
    from { transform: scale(1); }
    to   { transform: scale(1.15); }
  }

  /* Card */
  .su-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 480px;
    background: #fff;
    border: 1px solid #ede9fe;
    border-radius: 24px;
    padding: 36px 36px 28px;
    box-shadow: 0 4px 40px rgba(124,58,237,0.09), 0 1px 4px rgba(0,0,0,0.04);
    animation: suCardIn 0.55s cubic-bezier(0.34,1.3,0.64,1) both;
  }
  @keyframes suCardIn {
    from { opacity: 0; transform: translateY(28px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }

  /* Header */
  .su-card__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    margin-bottom: 28px;
  }
  .su-logo {
    height: 40px;
    width: auto;
    margin-bottom: 4px;
  }
  .su-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: #111827;
    margin: 0;
    letter-spacing: -0.02em;
  }
  .su-subtitle {
    font-size: 0.85rem;
    color: #9ca3af;
    margin: 0;
  }

  /* Form */
  .su-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .su-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .su-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .su-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6b7280;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .su-label__opt {
    font-weight: 400;
    text-transform: none;
    color: #d1d5db;
    font-size: 0.7rem;
    letter-spacing: 0;
  }

  /* Input */
  .su-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .su-input-icon {
    position: absolute;
    left: 12px;
    color: #c4b5fd;
    pointer-events: none;
  }
  .su-eye {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    color: #c4b5fd;
    padding: 0;
    display: flex;
    align-items: center;
    transition: color 0.15s;
  }
  .su-eye:hover { color: #7C3AED; }

  .su-input {
    width: 100%;
    padding: 10px 13px;
    font-size: 0.875rem;
    font-family: inherit;
    color: #111827;
    background: #fafafa;
    border: 1.5px solid #e5e7eb;
    border-radius: 11px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
    box-sizing: border-box;
    appearance: none;
    -webkit-appearance: none;
  }
  .su-input--icon  { padding-left: 38px; }
  .su-input--pad-r { padding-right: 38px; }
  .su-input:focus {
    border-color: #7C3AED;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(124,58,237,0.10);
  }
  .su-input::placeholder { color: #d1d5db; }
  .su-select { cursor: pointer; }

  /* Button */
  .su-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    margin-top: 4px;
    padding: 12px 20px;
    font-size: 0.95rem;
    font-weight: 700;
    font-family: inherit;
    color: #fff;
    background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
    border: none;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 4px 18px rgba(124,58,237,0.32);
    transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
    letter-spacing: 0.01em;
  }
  .su-btn:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(124,58,237,0.40);
  }
  .su-btn:active { transform: translateY(0); }

  /* Footer */
  .su-footer {
    margin-top: 20px;
    text-align: center;
    font-size: 0.85rem;
    color: #9ca3af;
  }
  .su-footer__link {
    color: #7C3AED;
    font-weight: 600;
    text-decoration: none;
    transition: opacity 0.15s;
  }
  .su-footer__link:hover { opacity: 0.75; }

  @media (max-width: 400px) {
    .su-card { padding: 28px 20px 24px; }
    .su-row { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .su-orb, .su-card, .su-btn { animation: none !important; transition: none !important; }
  }
`;

export default Signup;
