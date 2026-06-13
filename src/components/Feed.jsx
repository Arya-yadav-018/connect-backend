import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import Usercard from './UserCard';

const backendurl = import.meta.env.VITE_BACKEND_URL;

const particles = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  size: Math.random() * 2.5 + 0.5,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 10,
  opacity: Math.random() * 0.5 + 0.1,
}));

const ParticleField = () => (
  <div className="feed-particles" aria-hidden="true">
    {particles.map((p) => (
      <span key={p.id} className="feed-particle" style={{
        width: p.size, height: p.size,
        left: `${p.x}%`, top: `${p.y}%`,
        opacity: p.opacity,
        animationDuration: `${p.duration}s`,
        animationDelay: `${p.delay}s`,
      }} />
    ))}
  </div>
);

const AmbientOrbs = () => (
  <div className="feed-orbs" aria-hidden="true">
    <div className="feed-orb feed-orb--violet" />
    <div className="feed-orb feed-orb--cyan" />
    <div className="feed-orb feed-orb--indigo" />
  </div>
);

const LoadingState = () => (
  <div className="feed-status">
    <div className="feed-loader">
      <div className="feed-loader__ring feed-loader__ring--outer" />
      <div className="feed-loader__ring feed-loader__ring--inner" />
      <div className="feed-loader__dot" />
    </div>
    <p className="feed-status__label">Finding developers&hellip;</p>
  </div>
);

const EmptyState = () => (
  <div className="feed-status">
    <div className="feed-empty__icon">🚀</div>
    <h1 className="feed-empty__heading">You've seen everyone</h1>
    <p className="feed-empty__sub">No more developers in your orbit right now. Check back soon.</p>
  </div>
);

const ANIM_DURATION = 380;

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [visibleUser, setVisibleUser] = useState(null);
  const [animState, setAnimState] = useState('enter');

  // Refs so callbacks always see latest values without stale closures
  const visibleUserRef = useRef(null);
  const isAnimating = useRef(false);
  const pendingUser = useRef(null);

  // Keep ref in sync with state
  const updateVisibleUser = (u) => {
    visibleUserRef.current = u;
    setVisibleUser(u);
  };

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(
        `${backendurl}/api/connection/feed`,
        { withCredentials: true }
      );
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log("Feed Error:", error);
    }
  };

  useEffect(() => { getFeed(); }, []);

  useEffect(() => {
    // feed is null = not loaded yet
    if (feed === null || feed === undefined) return;
    // feed is empty array = no more users
    if (feed.length === 0) return;

    const nextUser = feed[0];

    // First card ever — just show it
    if (!visibleUserRef.current) {
      updateVisibleUser(nextUser);
      setAnimState('enter');
      return;
    }

    // Same user still at top (e.g. unrelated re-render) — do nothing
    if (visibleUserRef.current._id === nextUser._id) return;

    // Queue if mid-animation
    if (isAnimating.current) {
      pendingUser.current = nextUser;
      return;
    }

    swapCard(nextUser);
  }, [feed]);

  const swapCard = (nextUser) => {
    isAnimating.current = true;

    // Step 1: exit current card to the right
    setAnimState('exit-right');

    setTimeout(() => {
      // Step 2: mount new card (enters from left)
      updateVisibleUser(nextUser);
      setAnimState('enter');

      setTimeout(() => {
        isAnimating.current = false;
        // Drain queue
        if (pendingUser.current) {
          const queued = pendingUser.current;
          pendingUser.current = null;
          swapCard(queued);
        }
      }, ANIM_DURATION);
    }, ANIM_DURATION);
  };

  return (
    <>
      <style>{feedStyles}</style>
      <div className="feed-root">
        <ParticleField />
        <AmbientOrbs />
        <div className="feed-grid" aria-hidden="true" />
        <div className="feed-content">
          {feed === null && <LoadingState />}
          {feed !== null && feed?.length === 0 && !visibleUser && <EmptyState />}
          {visibleUser && (
            <div className={`feed-card-wrapper feed-card--${animState}`}>
              <Usercard user={visibleUser} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const feedStyles = `
  .feed-root {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    overflow: hidden;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  }
  .feed-particles { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
  .feed-particle {
    position: absolute; border-radius: 50%; background: #7C3AED;
    animation: feedDrift linear infinite;
  }
  @keyframes feedDrift {
    0%   { transform: translateY(0px)   scale(1); }
    50%  { transform: translateY(-18px) scale(1.2); opacity: 0.05; }
    100% { transform: translateY(0px)   scale(1); }
  }
  .feed-orbs { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
  .feed-orb { position: absolute; border-radius: 50%; filter: blur(90px); animation: feedPulse ease-in-out infinite alternate; }
  .feed-orb--violet { width: 520px; height: 520px; background: rgba(124,58,237,0.10); top: -120px; left: -120px; animation-duration: 9s; }
  .feed-orb--cyan { width: 400px; height: 400px; background: rgba(6,182,212,0.08); bottom: -100px; right: -80px; animation-duration: 11s; animation-delay: 2s; }
  .feed-orb--indigo { width: 300px; height: 300px; background: rgba(99,102,241,0.07); top: 50%; left: 55%; animation-duration: 13s; animation-delay: 4s; }
  @keyframes feedPulse { from { transform: scale(1) rotate(0deg); } to { transform: scale(1.15) rotate(8deg); } }
  .feed-grid {
    position: absolute; inset: 0; pointer-events: none; z-index: 2;
    background-image: linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
  }
  .feed-content {
    position: relative; z-index: 10;
    display: flex; align-items: center; justify-content: center;
    width: 100%; padding: 2rem; overflow: hidden;
  }
  .feed-card-wrapper {
    filter: drop-shadow(0 0 40px rgba(124,58,237,0.25));
    will-change: transform, opacity;
  }
  .feed-card--enter {
    animation: feedSlideIn ${ANIM_DURATION}ms cubic-bezier(0.34, 1.3, 0.64, 1) both;
  }
  @keyframes feedSlideIn {
    from { opacity: 0; transform: translateX(-120px) scale(0.92) rotate(-3deg); }
    to   { opacity: 1; transform: translateX(0) scale(1) rotate(0deg); }
  }
  .feed-card--exit-right {
    animation: feedSlideOutRight ${ANIM_DURATION}ms cubic-bezier(0.4, 0, 1, 1) both;
  }
  @keyframes feedSlideOutRight {
    from { opacity: 1; transform: translateX(0) scale(1) rotate(0deg); }
    to   { opacity: 0; transform: translateX(140px) scale(0.92) rotate(4deg); }
  }
  .feed-card--idle { transform: translateX(0) scale(1); opacity: 1; }

  .feed-status { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; color: #1e1b4b; text-align: center; }
  .feed-loader { position: relative; width: 72px; height: 72px; display: flex; align-items: center; justify-content: center; }
  .feed-loader__ring { position: absolute; border-radius: 50%; border: 2px solid transparent; animation: feedSpin linear infinite; }
  .feed-loader__ring--outer { inset: 0; border-top-color: #7C3AED; border-right-color: rgba(124,58,237,0.3); animation-duration: 1.2s; }
  .feed-loader__ring--inner { inset: 12px; border-top-color: #06B6D4; border-left-color: rgba(6,182,212,0.3); animation-duration: 0.8s; animation-direction: reverse; }
  .feed-loader__dot { width: 8px; height: 8px; border-radius: 50%; background: #a78bfa; animation: feedBlink 1s ease-in-out infinite alternate; }
  @keyframes feedSpin { to { transform: rotate(360deg); } }
  @keyframes feedBlink { from { opacity: 1; } to { opacity: 0.2; } }
  .feed-status__label { font-size: 0.95rem; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; }
  .feed-empty__icon { font-size: 4rem; animation: feedFloat 3s ease-in-out infinite; }
  @keyframes feedFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  .feed-empty__heading {
    font-size: clamp(1.5rem, 4vw, 2.25rem); font-weight: 700;
    background: linear-gradient(135deg, #a78bfa, #06B6D4);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0;
  }
  .feed-empty__sub { font-size: 1rem; color: #6b7280; max-width: 340px; line-height: 1.6; margin: 0; }
  @media (prefers-reduced-motion: reduce) {
    .feed-particle, .feed-orb, .feed-loader__ring, .feed-loader__dot,
    .feed-card--enter, .feed-card--exit-right, .feed-empty__icon { animation: none !important; }
  }
`;

export default Feed;
