import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { addUser } from "../utils/userSlice";
import Usercard from "./UserCard";

const backendurl = import.meta.env.VITE_BACKEND_URL;

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    gender: user?.gender || "",
    about: user?.about || "",
    skills: user?.skills?.join(", ") || "",
    photoUrl: user?.photoUrl || "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || "",
        gender: user.gender || "",
        about: user.about || "",
        skills: user.skills?.join(", ") || "",
        photoUrl: user.photoUrl || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("age", form.age);
    formData.append("gender", form.gender);
    formData.append("about", form.about);

    formData.append(
      "skills",
      JSON.stringify(
        form.skills.split(",").map((s) => s.trim())
      )
    );

    if (image) {
      formData.append("photo", image);
    }

    const res = await axios.patch(
      `${backendurl}/api/profile/edit`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.success) {
      dispatch(addUser(res.data.user));
      toast.success("Profile updated successfully");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || error.message
    );
  }
};

  return (
    <>
      <style>{css}</style>
      <div className="ep-root">
        {/* Decorative orbs */}
        <div className="ep-orb ep-orb--a" aria-hidden="true" />
        <div className="ep-orb ep-orb--b" aria-hidden="true" />

        <div className="ep-layout">
          {/* ── FORM CARD ── */}
          <div className="ep-card">
            <div className="ep-card__header">
              <div className="ep-card__avatar-wrap">
                <img
                  src={form.photoUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                  alt="avatar preview"
                  className="ep-card__avatar"
                  onError={(e) => {
                    e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                  }}
                />
                <div className="ep-card__avatar-ring" />
              </div>
              <div>
                <h2 className="ep-card__title">
                  {form.firstName || "Your"} {form.lastName || "Profile"}
                </h2>
                <p className="ep-card__subtitle">Keep your profile fresh ✦</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="ep-form">
              {/* Name row */}
              <div className="ep-row">
                <div className="ep-field">
                  <label className="ep-label">First Name</label>
                  <input className="ep-input" type="text" name="firstName"
                    value={form.firstName} onChange={handleChange} placeholder="Ada" />
                </div>
                <div className="ep-field">
                  <label className="ep-label">Last Name</label>
                  <input className="ep-input" type="text" name="lastName"
                    value={form.lastName} onChange={handleChange} placeholder="Lovelace" />
                </div>
              </div>

              {/* Age + Gender row */}
              <div className="ep-row">
                <div className="ep-field">
                  <label className="ep-label">Age</label>
                  <input className="ep-input" type="number" name="age"
                    value={form.age} onChange={handleChange} placeholder="25" />
                </div>
                <div className="ep-field">
                  <label className="ep-label">Gender</label>
                  <select className="ep-input ep-select" name="gender"
                    value={form.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Skills */}
              <div className="ep-field ep-field--full">
                <label className="ep-label">Skills <span className="ep-label__hint">comma separated</span></label>
                <input className="ep-input" type="text" name="skills"
                  value={form.skills} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
              </div>

              {/* About */}
              <div className="ep-field ep-field--full">
                <label className="ep-label">About</label>
                <textarea className="ep-input ep-textarea" name="about"
                  value={form.about} onChange={handleChange} rows="3"
                  placeholder="Tell other developers who you are..." />
              </div>

              {/* Photo URL */}
              <div className="ep-field ep-field--full">
  <label className="ep-label">
    Profile Picture
  </label>

  <input
    className="ep-input"
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];

      if (!file) return;

      setImage(file);

      setForm({
        ...form,
        photoUrl: URL.createObjectURL(file),
      });
    }}
  />
</div>

              <button type="submit" className="ep-btn">
                <span>Save Changes</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>

          {/* ── LIVE PREVIEW ── */}
          <div className="ep-preview">
            <p className="ep-preview__label">Live Preview</p>
            <div className="ep-preview__card">
              <Usercard
                user={{
                  ...form,
                  skills: form.skills.split(",").map((s) => s.trim()),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const css = `
  .ep-root {
    position: relative;
    min-height: 100vh;
    background: #ffffff;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 48px 24px 64px;
    overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
  }

  /* Ambient orbs */
  .ep-orb {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    filter: blur(80px);
    animation: epPulse ease-in-out infinite alternate;
  }
  .ep-orb--a {
    width: 480px; height: 480px;
    background: rgba(124,58,237,0.09);
    top: -100px; left: -100px;
    animation-duration: 9s;
  }
  .ep-orb--b {
    width: 360px; height: 360px;
    background: rgba(6,182,212,0.07);
    bottom: -80px; right: -80px;
    animation-duration: 12s;
  }
  @keyframes epPulse {
    from { transform: scale(1); }
    to   { transform: scale(1.12); }
  }

  /* Layout */
  .ep-layout {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 960px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: start;
  }
  @media (max-width: 768px) {
    .ep-layout { grid-template-columns: 1fr; }
  }

  /* Card */
  .ep-card {
    background: #fff;
    border: 1px solid #ede9fe;
    border-radius: 20px;
    padding: 28px 28px 32px;
    box-shadow: 0 4px 32px rgba(124,58,237,0.08), 0 1px 4px rgba(0,0,0,0.04);
  }

  /* Card header */
  .ep-card__header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f3f4f6;
  }
  .ep-card__avatar-wrap {
    position: relative;
    flex-shrink: 0;
  }
  .ep-card__avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    position: relative;
    z-index: 1;
  }
  .ep-card__avatar-ring {
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7C3AED, #06B6D4);
    z-index: 0;
    animation: epSpin 4s linear infinite;
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px));
  }
  @keyframes epSpin {
    to { transform: rotate(360deg); }
  }
  .ep-card__title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 2px;
    line-height: 1.3;
  }
  .ep-card__subtitle {
    font-size: 0.78rem;
    color: #9ca3af;
    margin: 0;
  }

  /* Form */
  .ep-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .ep-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .ep-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .ep-field--full {
    grid-column: 1 / -1;
  }
  .ep-label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #6b7280;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .ep-label__hint {
    font-weight: 400;
    text-transform: none;
    color: #d1d5db;
    font-size: 0.72rem;
    letter-spacing: 0;
  }
  .ep-input {
    width: 100%;
    padding: 9px 13px;
    font-size: 0.875rem;
    font-family: inherit;
    color: #111827;
    background: #fafafa;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
    box-sizing: border-box;
    appearance: none;
    -webkit-appearance: none;
  }
  .ep-input:focus {
    border-color: #7C3AED;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(124,58,237,0.10);
  }
  .ep-input::placeholder { color: #d1d5db; }
  .ep-select { cursor: pointer; }
  .ep-textarea {
    resize: vertical;
    min-height: 80px;
    line-height: 1.5;
  }

  /* Submit button */
  .ep-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 11px 20px;
    margin-top: 4px;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: inherit;
    color: #fff;
    background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
    border: none;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(124,58,237,0.30);
    transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
  }
  .ep-btn:hover {
    opacity: 0.93;
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(124,58,237,0.38);
  }
  .ep-btn:active {
    transform: translateY(0);
  }

  /* Preview panel */
  .ep-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding-top: 4px;
  }
  .ep-preview__label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #c4b5fd;
    background: #f5f3ff;
    border: 1px solid #ede9fe;
    border-radius: 20px;
    padding: 4px 14px;
    margin: 0;
  }
  .ep-preview__card {
    width: 100%;
    display: flex;
    justify-content: center;
    animation: epFadeIn 0.4s ease both;
  }
  @keyframes epFadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .ep-orb, .ep-card__avatar-ring, .ep-btn { animation: none !important; transition: none !important; }
  }
`;

export default EditProfile;
