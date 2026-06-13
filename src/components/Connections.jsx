import React, { useEffect, useState } from "react";
import axios from "axios";

const backendurl = import.meta.env.VITE_BACKEND_URL;

const Connections = () => {
  const [connections, setConnections] = useState([]);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        `${backendurl}/api/connection/AllCurrentConnections`,
        { withCredentials: true }
      );
      setConnections(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="cn-root">
        {/* Ambient orbs */}
        <div className="cn-orb cn-orb--a" aria-hidden="true" />
        <div className="cn-orb cn-orb--b" aria-hidden="true" />

        <div className="cn-inner">
          {/* Header */}
          <div className="cn-header">
            <span className="cn-header__pill">Your Network</span>
            <h1 className="cn-header__title">
              Connections
              <span className="cn-header__count">{connections.length}</span>
            </h1>
            <p className="cn-header__sub">Developers you've matched with</p>
          </div>

          {/* Empty state */}
          {connections.length === 0 && (
            <div className="cn-empty">
              <div className="cn-empty__icon">🛸</div>
              <p className="cn-empty__text">No connections yet — start swiping!</p>
            </div>
          )}

          {/* Grid */}
          <div className="cn-grid">
            {connections.map((user, i) => (
              <div
                key={user._id}
                className="cn-card"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Top accent bar */}
                <div className="cn-card__bar" />

                {/* Avatar */}
                <div className="cn-card__avatar-wrap">
                  <img
                    src={user.photoUrl}
                    alt={user.firstName}
                    className="cn-card__avatar"
                    onError={(e) => {
                      e.target.src =
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                    }}
                  />
                  <div className="cn-card__avatar-ring" />
                  <div className="cn-card__online" title="Online" />
                </div>

                {/* Info */}
                <div className="cn-card__info">
                  <h2 className="cn-card__name">
                    {user.firstName} {user.lastName}
                  </h2>

                  {user.about && (
                    <p className="cn-card__about">{user.about}</p>
                  )}

                  {/* Skills */}
                  {user.skills?.length > 0 && (
                    <div className="cn-card__skills">
                      {user.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="cn-skill">{skill}</span>
                      ))}
                      {user.skills.length > 3 && (
                        <span className="cn-skill cn-skill--more">
                          +{user.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="cn-card__actions">
                  <button className="cn-btn cn-btn--ghost">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
                      <path d="M2 13c0-3.038 2.462-5.5 5.5-5.5S13 9.962 13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                    Profile
                  </button>
                  <button className="cn-btn cn-btn--primary">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path d="M1 3a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H9l-2 2-2-2H2a1 1 0 0 1-1-1V3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                    </svg>
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const css = `
  .cn-root {
    position: relative;
    min-height: 100vh;
    background: #fff;
    overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
    padding: 52px 24px 72px;
  }

  /* Orbs */
  .cn-orb {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    filter: blur(90px);
    animation: cnPulse ease-in-out infinite alternate;
  }
  .cn-orb--a {
    width: 500px; height: 500px;
    background: rgba(124,58,237,0.08);
    top: -120px; left: -120px;
    animation-duration: 10s;
  }
  .cn-orb--b {
    width: 380px; height: 380px;
    background: rgba(6,182,212,0.06);
    bottom: -80px; right: -80px;
    animation-duration: 13s;
  }
  @keyframes cnPulse {
    from { transform: scale(1); }
    to   { transform: scale(1.14); }
  }

  /* Inner */
  .cn-inner {
    position: relative;
    z-index: 1;
    max-width: 1080px;
    margin: 0 auto;
  }

  /* Header */
  .cn-header {
    text-align: center;
    margin-bottom: 44px;
  }
  .cn-header__pill {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #7C3AED;
    background: #f5f3ff;
    border: 1px solid #ede9fe;
    border-radius: 20px;
    padding: 4px 14px;
    margin-bottom: 14px;
  }
  .cn-header__title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: clamp(2rem, 5vw, 2.75rem);
    font-weight: 800;
    color: #111827;
    margin: 0 0 8px;
    letter-spacing: -0.02em;
  }
  .cn-header__count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
    padding: 0 10px;
    background: linear-gradient(135deg, #7C3AED, #06B6D4);
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 20px;
  }
  .cn-header__sub {
    font-size: 0.95rem;
    color: #9ca3af;
    margin: 0;
  }

  /* Empty */
  .cn-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 80px 0;
  }
  .cn-empty__icon {
    font-size: 3.5rem;
    animation: cnFloat 3s ease-in-out infinite;
  }
  @keyframes cnFloat {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .cn-empty__text {
    font-size: 1rem;
    color: #9ca3af;
  }

  /* Grid */
  .cn-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  /* Card */
  .cn-card {
    position: relative;
    background: #fff;
    border: 1px solid #f0ebff;
    border-radius: 20px;
    padding: 0 0 20px;
    overflow: hidden;
    box-shadow: 0 2px 16px rgba(124,58,237,0.07), 0 1px 3px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.22s cubic-bezier(0.34,1.3,0.64,1), box-shadow 0.22s ease;
    animation: cnCardIn 0.45s cubic-bezier(0.34,1.2,0.64,1) both;
  }
  .cn-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(124,58,237,0.14), 0 2px 8px rgba(0,0,0,0.06);
  }
  @keyframes cnCardIn {
    from { opacity: 0; transform: translateY(20px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }

  /* Accent bar at top */
  .cn-card__bar {
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #7C3AED, #06B6D4);
    border-radius: 20px 20px 0 0;
    margin-bottom: 24px;
  }

  /* Avatar */
  .cn-card__avatar-wrap {
    position: relative;
    margin-bottom: 14px;
  }
  .cn-card__avatar {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    position: relative;
    z-index: 1;
  }
  .cn-card__avatar-ring {
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7C3AED, #06B6D4);
    z-index: 0;
    animation: cnSpin 5s linear infinite;
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px));
  }
  @keyframes cnSpin { to { transform: rotate(360deg); } }
  .cn-card__online {
    position: absolute;
    bottom: 3px; right: 3px;
    width: 13px; height: 13px;
    background: #22c55e;
    border: 2px solid #fff;
    border-radius: 50%;
    z-index: 2;
  }

  /* Info */
  .cn-card__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 20px;
    gap: 6px;
    flex: 1;
    width: 100%;
    box-sizing: border-box;
  }
  .cn-card__name {
    font-size: 1.05rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }
  .cn-card__about {
    font-size: 0.82rem;
    color: #9ca3af;
    margin: 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Skills */
  .cn-card__skills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
    margin-top: 4px;
  }
  .cn-skill {
    font-size: 0.72rem;
    font-weight: 600;
    color: #7C3AED;
    background: #f5f3ff;
    border: 1px solid #ede9fe;
    border-radius: 20px;
    padding: 3px 10px;
    white-space: nowrap;
  }
  .cn-skill--more {
    color: #9ca3af;
    background: #f9fafb;
    border-color: #e5e7eb;
  }

  /* Actions */
  .cn-card__actions {
    display: flex;
    gap: 8px;
    margin-top: 18px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .cn-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex: 1;
    padding: 9px 12px;
    font-size: 0.82rem;
    font-weight: 600;
    font-family: inherit;
    border-radius: 10px;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
    border: none;
  }
  .cn-btn--ghost {
    background: #f5f3ff;
    color: #7C3AED;
    border: 1.5px solid #ede9fe;
  }
  .cn-btn--ghost:hover {
    background: #ede9fe;
    transform: translateY(-1px);
  }
  .cn-btn--primary {
    background: linear-gradient(135deg, #7C3AED, #5B21B6);
    color: #fff;
    box-shadow: 0 3px 12px rgba(124,58,237,0.28);
  }
  .cn-btn--primary:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 5px 18px rgba(124,58,237,0.36);
  }

  @media (max-width: 480px) {
    .cn-grid { grid-template-columns: 1fr; }
    .cn-root { padding: 36px 16px 56px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .cn-card__avatar-ring,
    .cn-orb,
    .cn-empty__icon,
    .cn-card { animation: none !important; transition: none !important; }
  }
`;

export default Connections;
