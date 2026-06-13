import React, { useState, useEffect } from 'react'
import profilepic from "../assets/blankprofile.png";
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assets/Devlogo.png";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import { removeFeed } from '../utils/feedSlice';
import { toast } from 'react-toastify';

const backendurl = import.meta.env.VITE_BACKEND_URL;

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const close = (e) => {
      if (!e.target.closest('.nb-avatar-area')) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${backendurl}/api/auth/logout`, {}, { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(removeUser());
        dispatch(removeFeed());
        toast.success('Logged out successfully');
        navigate("/");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <nav className={`nb-root${scrolled ? ' nb-root--scrolled' : ''}`}>
        <div className="nb-inner">

          {/* ── Logo ── */}
          <Link to="/" className="nb-logo">
            <img src={logo} alt="DevMatch" className="nb-logo__img" />
          </Link>

          {/* ── Right side ── */}
          <div className="nb-right">
            {!user ? (
              /* Guest */
              <div className="nb-guest">
                <Link to="/login" className="nb-link">Log in</Link>
                <Link to="/signup" className="nb-cta">Get started</Link>
              </div>
            ) : (
              /* Authenticated */
              <div className="nb-auth">
                <div className="nb-nav-links">
                  <Link to="/feed"       className="nb-nav-link">Feed</Link>
                  <Link to="/connection" className="nb-nav-link">Connections</Link>
                  <Link to="/request"    className="nb-nav-link">Requests</Link>
                </div>

                {/* Avatar + dropdown */}
                <div className="nb-avatar-area">
                  <button
                    className="nb-avatar-btn"
                    onClick={() => setDropdownOpen((o) => !o)}
                    aria-expanded={dropdownOpen}
                    aria-label="Account menu"
                  >
                    <img
                      src={user?.photoUrl}
                      alt={user?.firstName}
                      className="nb-avatar"
                      onError={(e) => {
                        e.target.src =
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                      }}
                    />
                    <span className="nb-avatar-name">{user?.firstName}</span>
                    <svg className={`nb-chevron${dropdownOpen ? ' nb-chevron--open' : ''}`} width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="nb-dropdown">
                      <div className="nb-dropdown__header">
                        <p className="nb-dropdown__name">{user?.firstName} {user?.lastName}</p>
                        <p className="nb-dropdown__email">{user?.emailId}</p>
                      </div>
                      <div className="nb-dropdown__divider" />
                      <Link to="/profile" className="nb-dropdown__item" onClick={() => setDropdownOpen(false)}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2 13c0-3.038 2.462-5.5 5.5-5.5S13 9.962 13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                        Profile
                      </Link>
                      <Link to="/settings" className="nb-dropdown__item" onClick={() => setDropdownOpen(false)}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3"/><path d="M7.5 1v1.5M7.5 12.5V14M14 7.5h-1.5M2.5 7.5H1M12.36 3.64l-1.06 1.06M3.7 11.3l-1.06 1.06M12.36 11.36l-1.06-1.06M3.7 3.7 2.64 2.64" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                        Settings
                      </Link>
                      <div className="nb-dropdown__divider" />
                      <button className="nb-dropdown__item nb-dropdown__item--danger" onClick={handleLogout}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M6 2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3M10 10l3-3-3-3M13 7.5H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </nav>
    </>
  );
};

const styles = `
  /* ── Root ── */
  .nb-root {
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.25s ease;
  }
  .nb-root--scrolled {
    box-shadow: 0 4px 24px rgba(124, 58, 237, 0.07), 0 1px 3px rgba(0,0,0,0.06);
  }

  /* ── Inner ── */
  .nb-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* ── Logo ── */
  .nb-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
  }
  .nb-logo__img {
    height: 36px;
    width: auto;
  }

  /* ── Right ── */
  .nb-right {
    display: flex;
    align-items: center;
  }

  /* ── Guest buttons ── */
  .nb-guest {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .nb-link {
    padding: 8px 16px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    text-decoration: none;
    border-radius: 8px;
    transition: background 0.15s, color 0.15s;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .nb-link:hover {
    background: #f3f4f6;
    color: #111827;
  }
  .nb-cta {
    padding: 8px 18px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    background: linear-gradient(135deg, #7C3AED, #6D28D9);
    border-radius: 10px;
    transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.30);
    font-family: 'Inter', system-ui, sans-serif;
  }
  .nb-cta:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(124, 58, 237, 0.38);
  }

  /* ── Auth row ── */
  .nb-auth {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* ── Nav links ── */
  .nb-nav-links {
    display: flex;
    align-items: center;
    gap: 2px;
    margin-right: 12px;
  }
  .nb-nav-link {
    padding: 7px 14px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
    text-decoration: none;
    border-radius: 8px;
    transition: background 0.15s, color 0.15s;
    font-family: 'Inter', system-ui, sans-serif;
    white-space: nowrap;
  }
  .nb-nav-link:hover {
    background: #f5f3ff;
    color: #7C3AED;
  }

  /* ── Avatar area ── */
  .nb-avatar-area {
    position: relative;
  }
  .nb-avatar-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 10px 5px 5px;
    background: none;
    border: 1.5px solid #e5e7eb;
    border-radius: 40px;
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .nb-avatar-btn:hover {
    border-color: #c4b5fd;
    background: #faf5ff;
    box-shadow: 0 0 0 3px rgba(124,58,237,0.08);
  }
  .nb-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }
  .nb-avatar-name {
    font-size: 0.85rem;
    font-weight: 600;
    color: #374151;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .nb-chevron {
    color: #9ca3af;
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }
  .nb-chevron--open {
    transform: rotate(180deg);
  }

  /* ── Dropdown ── */
  .nb-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    min-width: 210px;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06);
    overflow: hidden;
    animation: nbDropIn 0.18s cubic-bezier(0.34,1.4,0.64,1) both;
    z-index: 200;
  }
  @keyframes nbDropIn {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }

  .nb-dropdown__header {
    padding: 14px 16px 12px;
  }
  .nb-dropdown__name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 2px;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .nb-dropdown__email {
    font-size: 0.78rem;
    color: #9ca3af;
    margin: 0;
    font-family: 'Inter', system-ui, sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .nb-dropdown__divider {
    height: 1px;
    background: #f3f4f6;
    margin: 2px 0;
  }

  .nb-dropdown__item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 16px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
    text-align: left;
    font-family: 'Inter', system-ui, sans-serif;
    box-sizing: border-box;
  }
  .nb-dropdown__item:hover {
    background: #f9fafb;
    color: #111827;
  }
  .nb-dropdown__item--danger {
    color: #ef4444;
  }
  .nb-dropdown__item--danger:hover {
    background: #fff1f1;
    color: #dc2626;
  }

  /* ── Responsive: hide name on small screens ── */
  @media (max-width: 640px) {
    .nb-avatar-name { display: none; }
    .nb-nav-link { padding: 7px 10px; font-size: 0.8rem; }
    .nb-inner { padding: 0 16px; }
  }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .nb-dropdown { animation: none; }
    .nb-cta, .nb-avatar-btn { transition: none; }
  }
`;

export default NavBar;
