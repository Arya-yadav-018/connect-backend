import React, { useState, useEffect } from 'react'
import logo from "../assets/Devlogo.png";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const backendurl = import.meta.env.VITE_BACKEND_URL;

// Floating particle component
const Particle = ({ style }) => (
  <div className="particle" style={style} />
);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const [form, setForm] = useState({
    emailId: "",
    password: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submithandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${backendurl}/api/auth/login`, form, { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(addUser(res.data.user));
        toast.success("Logged in successfully");
        navigate("/feed");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const particles = Array.from({ length: 20 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 4}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
    width: `${2 + Math.random() * 3}px`,
    height: `${2 + Math.random() * 3}px`,
    opacity: 0.15 + Math.random() * 0.25,
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #F5F7FF;
          background-image:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.1) 0%, transparent 70%),
            linear-gradient(180deg, #F5F7FF 0%, #EEF0FF 100%);
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Subtle dot-grid background */
        .login-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: #6366F1;
          animation: float linear infinite;
          pointer-events: none;
        }

        @keyframes float {
          0%   { transform: translateY(0px) scale(1);   opacity: 0.2; }
          50%  { transform: translateY(-18px) scale(1.3); opacity: 0.5; }
          100% { transform: translateY(0px) scale(1);   opacity: 0.2; }
        }

        /* Card mount animation */
        .login-card {
          position: relative;
          background: #FFFFFF;
          border: 1px solid rgba(99,102,241,0.18);
          border-radius: 20px;
          padding: 40px 36px;
          width: 100%;
          max-width: 420px;
          box-shadow:
            0 0 0 1px rgba(99,102,241,0.06),
            0 8px 40px rgba(99,102,241,0.1),
            0 2px 12px rgba(0,0,0,0.06);
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.55s cubic-bezier(.22,1,.36,1), transform 0.55s cubic-bezier(.22,1,.36,1);
          z-index: 1;
        }

        .login-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Glowing top edge */
        .login-card::before {
          content: '';
          position: absolute;
          top: -1px; left: 20%; right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #6366F1, #8B5CF6, transparent);
          border-radius: 999px;
        }

        .logo-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 32px;
          gap: 10px;
        }

        .logo-ring {
          width: 58px; height: 58px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2));
          border: 1px solid rgba(99,102,241,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 24px rgba(99,102,241,0.18);
        }

        .logo-ring img {
          height: 34px;
          width: auto;
        }

        .welcome-text {
          font-size: 22px;
          font-weight: 700;
          color: #1E1B4B;
          letter-spacing: -0.4px;
          margin: 0;
        }

        .welcome-sub {
          font-size: 13px;
          color: #6B7280;
          margin: 0;
          font-weight: 400;
        }

        .field-wrapper {
          position: relative;
          margin-bottom: 16px;
        }

        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #6B7280;
          margin-bottom: 6px;
          font-family: 'JetBrains Mono', monospace;
          transition: color 0.2s;
        }

        .field-wrapper.focused .field-label {
          color: #6366F1;
        }

        .field-input {
          width: 100%;
          padding: 11px 14px;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          color: #111827;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }

        .field-input::placeholder {
          color: #C4C9D4;
        }

        .field-input:focus {
          border-color: rgba(99,102,241,0.6);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12), 0 0 16px rgba(99,102,241,0.08);
        }

        /* Glow line under focused input */
        .field-glow {
          height: 1px;
          width: 0%;
          background: linear-gradient(90deg, #6366F1, #8B5CF6);
          border-radius: 999px;
          margin-top: 3px;
          transition: width 0.35s cubic-bezier(.22,1,.36,1);
        }

        .field-wrapper.focused .field-glow {
          width: 100%;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          color: #fff;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
          transition: transform 0.18s, box-shadow 0.18s, filter 0.18s;
          margin-top: 8px;
          letter-spacing: 0.01em;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.5);
          filter: brightness(1.08);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 10px rgba(99,102,241,0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Shimmer sweep on hover */
        .submit-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: skewX(-20deg);
          transition: left 0.45s ease;
        }

        .submit-btn:hover:not(:disabled)::after {
          left: 160%;
        }

        /* Spinner */
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }

        .signup-row {
          text-align: center;
          margin-top: 20px;
          font-size: 13.5px;
          color: #6B7280;
        }

        .signup-row a {
          color: #6366F1;
          font-weight: 600;
          text-decoration: none;
          margin-left: 4px;
          transition: color 0.2s;
        }

        .signup-row a:hover {
          color: #8B5CF6;
          text-decoration: underline;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 20px 0 4px;
          color: #D1D5DB;
          font-size: 11px;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #E5E7EB;
        }

        @media (max-width: 480px) {
          .login-card { padding: 32px 20px; margin: 16px; }
        }
      `}</style>

      <div className="login-root">
        {/* Floating particles */}
        {particles.map((style, i) => (
          <Particle key={i} style={style} />
        ))}

        <div className={`login-card ${mounted ? 'visible' : ''}`}>
          {/* Logo + Heading */}
          <div className="logo-area">
            <div className="logo-ring">
              <img src={logo} alt="Dev Logo" />
            </div>
            <p className="welcome-text">Welcome back</p>
            <p className="welcome-sub">Log in to your developer account</p>
          </div>

          {/* Form */}
          <form onSubmit={submithandler}>
            <div className={`field-wrapper ${focusedField === 'emailId' ? 'focused' : ''}`}>
              <label className="field-label">Email</label>
              <input
                type="email"
                name="emailId"
                placeholder="you@example.com"
                value={form.emailId}
                onChange={handleChange}
                onFocus={() => setFocusedField('emailId')}
                onBlur={() => setFocusedField(null)}
                className="field-input"
                required
              />
              <div className="field-glow" />
            </div>

            <div className={`field-wrapper ${focusedField === 'password' ? 'focused' : ''}`}>
              <label className="field-label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="field-input"
                required
              />
              <div className="field-glow" />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading && <span className="spinner" />}
              {loading ? 'Loging in...' : 'Log in'}
            </button>
          </form>

          <div className="divider">or</div>

          <p className="signup-row">
            Don't have an account?
            <Link to="/signup">Create one</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
