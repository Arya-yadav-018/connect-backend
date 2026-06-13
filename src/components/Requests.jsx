import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendurl = import.meta.env.VITE_BACKEND_URL;

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [exiting, setExiting] = useState(null); // id of card being dismissed

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${backendurl}/api/connection/AllRequests`,
        { withCredentials: true }
      );
      setRequests(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, requestId) => {
    // Trigger exit animation first
    setExiting({ id: requestId, status });

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${backendurl}/api/request/reviewRequest/${status}/${requestId}`,
          {},
          { withCredentials: true }
        );
        toast.success(res.data.message);
        setRequests((prev) => prev.filter((req) => req._id !== requestId));
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setExiting(null);
      }
    }, 400);
  };

  return (
    <>
      <style>{css}</style>
      <div className="rq-root">
        <div className="rq-orb rq-orb--a" aria-hidden="true" />
        <div className="rq-orb rq-orb--b" aria-hidden="true" />

        <div className="rq-inner">
          {/* Header */}
          <div className="rq-header">
            <span className="rq-header__pill">Incoming</span>
            <h1 className="rq-header__title">
              Requests
              {requests.length > 0 && (
                <span className="rq-header__badge">{requests.length}</span>
              )}
            </h1>
            <p className="rq-header__sub">Developers who want to connect with you</p>
          </div>

          {/* Empty */}
          {requests.length === 0 && (
            <div className="rq-empty">
              <div className="rq-empty__icon">🎉</div>
              <h2 className="rq-empty__title">All caught up!</h2>
              <p className="rq-empty__sub">No pending requests right now.</p>
            </div>
          )}

          {/* List */}
          <div className="rq-list">
            {requests.map((request, i) => {
              const user = request.fromUserId;
              const isExiting = exiting?.id === request._id;
              const exitDir = exiting?.status === "accepted" ? "rq-card--exit-accept" : "rq-card--exit-reject";

              return (
                <div
                  key={request._id}
                  className={`rq-card ${isExiting ? exitDir : ""}`}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  {/* Left stripe */}
                  <div className="rq-card__stripe" />

                  {/* Avatar */}
                  <div className="rq-card__avatar-wrap">
                    <img
                      src={user.photoUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                      alt={user.firstName}
                      className="rq-card__avatar"
                      onError={(e) => {
                        e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                      }}
                    />
                    <div className="rq-card__avatar-ring" />
                  </div>

                  {/* Info */}
                  <div className="rq-card__info">
                    <h2 className="rq-card__name">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="rq-card__meta">
                      {[user.age && `${user.age} yrs`, user.gender].filter(Boolean).join(" · ")}
                    </p>
                    {user.about && (
                      <p className="rq-card__about">{user.about}</p>
                    )}
                    {user.skills?.length > 0 && (
                      <div className="rq-card__skills">
                        {user.skills.slice(0, 4).map((skill) => (
                          <span key={skill} className="rq-skill">{skill}</span>
                        ))}
                        {user.skills.length > 4 && (
                          <span className="rq-skill rq-skill--more">+{user.skills.length - 4}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="rq-card__actions">
                    <button
                      className="rq-btn rq-btn--accept"
                      onClick={() => reviewRequest("accepted", request._id)}
                      disabled={!!exiting}
                      title="Accept"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Accept
                    </button>
                    <button
                      className="rq-btn rq-btn--reject"
                      onClick={() => reviewRequest("rejected", request._id)}
                      disabled={!!exiting}
                      title="Reject"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Decline
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const css = `
  .rq-root {
    position: relative;
    min-height: 100vh;
    background: #fff;
    overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
    padding: 52px 24px 72px;
  }

  /* Orbs */
  .rq-orb {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    filter: blur(90px);
    animation: rqPulse ease-in-out infinite alternate;
  }
  .rq-orb--a {
    width: 480px; height: 480px;
    background: rgba(124,58,237,0.08);
    top: -100px; left: -100px;
    animation-duration: 10s;
  }
  .rq-orb--b {
    width: 360px; height: 360px;
    background: rgba(6,182,212,0.06);
    bottom: -80px; right: -80px;
    animation-duration: 13s;
  }
  @keyframes rqPulse {
    from { transform: scale(1); }
    to   { transform: scale(1.14); }
  }

  .rq-inner {
    position: relative;
    z-index: 1;
    max-width: 720px;
    margin: 0 auto;
  }

  /* Header */
  .rq-header {
    text-align: center;
    margin-bottom: 44px;
  }
  .rq-header__pill {
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
  .rq-header__title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: clamp(2rem, 5vw, 2.75rem);
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.02em;
    margin: 0 0 8px;
  }
  .rq-header__badge {
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
  .rq-header__sub {
    font-size: 0.92rem;
    color: #9ca3af;
    margin: 0;
  }

  /* Empty */
  .rq-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 80px 0;
    text-align: center;
  }
  .rq-empty__icon {
    font-size: 3.5rem;
    animation: rqFloat 3s ease-in-out infinite;
  }
  @keyframes rqFloat {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .rq-empty__title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }
  .rq-empty__sub {
    font-size: 0.92rem;
    color: #9ca3af;
    margin: 0;
  }

  /* List */
  .rq-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* Card */
  .rq-card {
    position: relative;
    background: #fff;
    border: 1px solid #f0ebff;
    border-radius: 18px;
    padding: 18px 20px 18px 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 2px 16px rgba(124,58,237,0.07), 0 1px 3px rgba(0,0,0,0.04);
    overflow: hidden;
    animation: rqCardIn 0.45s cubic-bezier(0.34,1.2,0.64,1) both;
    transition: transform 0.22s cubic-bezier(0.34,1.3,0.64,1), box-shadow 0.2s ease;
  }
  .rq-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 36px rgba(124,58,237,0.12), 0 2px 8px rgba(0,0,0,0.05);
  }
  @keyframes rqCardIn {
    from { opacity: 0; transform: translateX(-24px) scale(0.97); }
    to   { opacity: 1; transform: translateX(0)     scale(1); }
  }

  /* Exit animations */
  .rq-card--exit-accept {
    animation: rqExitAccept 0.38s cubic-bezier(0.4,0,0.2,1) forwards !important;
  }
  @keyframes rqExitAccept {
    from { opacity: 1; transform: translateX(0) scale(1); }
    to   { opacity: 0; transform: translateX(80px) scale(0.94); }
  }
  .rq-card--exit-reject {
    animation: rqExitReject 0.38s cubic-bezier(0.4,0,0.2,1) forwards !important;
  }
  @keyframes rqExitReject {
    from { opacity: 1; transform: translateX(0) scale(1); }
    to   { opacity: 0; transform: translateX(-80px) scale(0.94); }
  }

  /* Left stripe */
  .rq-card__stripe {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #7C3AED, #06B6D4);
    border-radius: 18px 0 0 18px;
  }

  /* Avatar */
  .rq-card__avatar-wrap {
    position: relative;
    flex-shrink: 0;
  }
  .rq-card__avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    position: relative;
    z-index: 1;
  }
  .rq-card__avatar-ring {
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7C3AED, #06B6D4);
    z-index: 0;
    animation: rqSpin 5s linear infinite;
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px));
  }
  @keyframes rqSpin { to { transform: rotate(360deg); } }

  /* Info */
  .rq-card__info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .rq-card__name {
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .rq-card__meta {
    font-size: 0.78rem;
    color: #9ca3af;
    margin: 0;
  }
  .rq-card__about {
    font-size: 0.82rem;
    color: #6b7280;
    margin: 2px 0 0;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .rq-card__skills {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 6px;
  }
  .rq-skill {
    font-size: 0.7rem;
    font-weight: 600;
    color: #7C3AED;
    background: #f5f3ff;
    border: 1px solid #ede9fe;
    border-radius: 20px;
    padding: 2px 9px;
    white-space: nowrap;
  }
  .rq-skill--more {
    color: #9ca3af;
    background: #f9fafb;
    border-color: #e5e7eb;
  }

  /* Actions */
  .rq-card__actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-shrink: 0;
  }
  .rq-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
    white-space: nowrap;
  }
  .rq-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .rq-btn--accept {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: #fff;
    box-shadow: 0 3px 10px rgba(34,197,94,0.28);
  }
  .rq-btn--accept:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 5px 16px rgba(34,197,94,0.36);
  }
  .rq-btn--reject {
    background: #fff;
    color: #ef4444;
    border: 1.5px solid #fee2e2;
  }
  .rq-btn--reject:hover:not(:disabled) {
    background: #fff1f1;
    transform: translateY(-1px);
  }

  @media (max-width: 560px) {
    .rq-card { flex-wrap: wrap; }
    .rq-card__actions { flex-direction: row; width: 100%; }
    .rq-btn { flex: 1; justify-content: center; }
  }

  @media (prefers-reduced-motion: reduce) {
    .rq-card__avatar-ring,
    .rq-orb,
    .rq-empty__icon,
    .rq-card { animation: none !important; transition: none !important; }
  }
`;

export default Requests;
