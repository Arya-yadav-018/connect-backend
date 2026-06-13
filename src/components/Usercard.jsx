import React from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const backendurl = import.meta.env.VITE_BACKEND_URL;

const Usercard = ({ user }) => {
  if (!user) return null;
  const dispatch = useDispatch();

  // Fire immediately — Feed.jsx owns the exit animation
  const sendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${backendurl}/api/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="uc-card">

        {/* Floating photo */}
        <div className="uc-photo-wrap">
          <img
            src={user.photoUrl}
            alt={user.firstName}
            className="uc-photo"
            onError={(e) => {
              e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
            }}
          />
        </div>

        {/* Content */}
        <div className="uc-body">
          <div className="uc-name-row">
            <h2 className="uc-name">
              {user.firstName} {user.lastName}
            </h2>
            {user.age && (
              <span className="uc-age-pill">{user.age} yrs</span>
            )}
          </div>

          {user.about && (
            <p className="uc-about">{user.about}</p>
          )}

          {user.skills?.length > 0 && (
            <div className="uc-skills">
              {user.skills.map((skill) => (
                <span key={skill} className="uc-skill">{skill}</span>
              ))}
            </div>
          )}

          <div className="uc-actions">
            <button
              className="uc-btn uc-btn--pass"
              onClick={() => sendRequest("ignored", user._id)}
            >
              ✕ &nbsp;Pass
            </button>
            <button
              className="uc-btn uc-btn--connect"
              onClick={() => sendRequest("interested", user._id)}
            >
              Connect &nbsp;♥
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

const css = `
  .uc-card {
    width: 300px;
    border-radius: 28px;
    background: linear-gradient(160deg, #f5a623 0%, #7B2FBE 55%, #4a1070 100%);
    overflow: hidden;
    box-shadow:
      0 20px 60px rgba(123,47,190,0.45),
      0 4px 16px rgba(0,0,0,0.18);
    font-family: 'Inter', system-ui, sans-serif;
    transition: transform 0.22s cubic-bezier(0.34,1.3,0.64,1), box-shadow 0.22s;
  }
  .uc-card:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow:
      0 28px 72px rgba(123,47,190,0.55),
      0 6px 20px rgba(0,0,0,0.22);
  }

  .uc-photo-wrap {
    display: flex;
    justify-content: center;
    padding: 28px 24px 10px;
  }
  .uc-photo {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    object-fit: cover;
    object-position: top;
    display: block;
    filter: drop-shadow(0 12px 32px rgba(0,0,0,0.40));
    transition: transform 0.45s cubic-bezier(0.34,1.3,0.64,1);
  }
  .uc-card:hover .uc-photo {
    transform: translateY(-6px) scale(1.04);
  }

  .uc-body {
    padding: 10px 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .uc-name-row {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .uc-name {
    font-size: 1.55rem;
    font-weight: 800;
    color: #fff;
    margin: 0;
    letter-spacing: -0.02em;
    text-shadow: 0 2px 10px rgba(0,0,0,0.25);
    line-height: 1.2;
  }
  .uc-age-pill {
    font-size: 0.78rem;
    font-weight: 600;
    color: rgba(255,255,255,0.75);
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 20px;
    padding: 2px 9px;
    white-space: nowrap;
    backdrop-filter: blur(6px);
  }
  .uc-about {
    font-size: 0.84rem;
    color: rgba(255,255,255,0.78);
    line-height: 1.55;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .uc-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }
  .uc-skill {
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255,255,255,0.90);
    background: rgba(255,255,255,0.14);
    border: 1px solid rgba(255,255,255,0.22);
    border-radius: 10px;
    padding: 5px 13px;
    backdrop-filter: blur(8px);
    white-space: nowrap;
  }
  .uc-actions {
    display: flex;
    gap: 10px;
    margin-top: 4px;
  }
  .uc-btn {
    flex: 1;
    padding: 13px 10px;
    font-size: 0.9rem;
    font-weight: 700;
    font-family: inherit;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    transition: transform 0.18s cubic-bezier(0.34,1.4,0.64,1), opacity 0.15s, box-shadow 0.18s;
    letter-spacing: 0.01em;
  }
  .uc-btn--pass {
    background: rgba(255,255,255,0.18);
    color: #fff;
    border: 1.5px solid rgba(255,255,255,0.28);
    backdrop-filter: blur(10px);
  }
  .uc-btn--pass:hover {
    background: rgba(255,255,255,0.28);
    transform: scale(1.04);
  }
  .uc-btn--connect {
    background: linear-gradient(135deg, #f5a623 0%, #f0850a 100%);
    color: #fff;
    box-shadow: 0 4px 18px rgba(245,166,35,0.50);
  }
  .uc-btn--connect:hover {
    transform: scale(1.04);
    box-shadow: 0 6px 26px rgba(245,166,35,0.65);
  }

  @media (max-width: 340px) {
    .uc-card { width: 100%; border-radius: 22px; }
    .uc-photo { width: 180px; height: 180px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .uc-card, .uc-photo, .uc-btn { transition: none !important; }
  }
`;

export default Usercard;
