const testimonials = [
  {
    name: "Arjun Rao",
    role: "Full-stack dev",
    city: "Mumbai",
    initials: "AR",
    color: "blue",
    featured: true,
    quote:
      "Found my open-source co-founder here. We were both in different cities — Mumbai and Pune — and DevConnect bridged the gap. We shipped our first product three months after matching.",
  },
  {
    name: "Priya Sharma",
    role: "Frontend dev",
    city: "Jaipur",
    initials: "PS",
    color: "teal",
    featured: false,
    quote:
      "I was the only React dev in my town. DevConnect connected me with a senior engineer from Bangalore who mentored me for months. My career changed completely.",
  },
  {
    name: "Karan Mehta",
    role: "Backend dev",
    city: "Delhi",
    initials: "KM",
    color: "purple",
    featured: false,
    quote:
      "Met three amazing backend developers across Delhi, Hyderabad, and Chennai. We now run a small freelance agency together — all started with a connection on DevConnect.",
  },
  {
    name: "Neha Verma",
    role: "DevOps engineer",
    city: "Ahmedabad",
    initials: "NV",
    color: "coral",
    featured: false,
    quote:
      "The skill-matching is incredibly accurate. I swiped right on a DevOps engineer from Pune and we've been collaborating on a SaaS product for six months now.",
  },
  {
    name: "Sourav Das",
    role: "Self-taught dev",
    city: "Kolkata",
    initials: "SD",
    color: "amber",
    featured: false,
    quote:
      "As a self-taught developer in Kolkata, I felt isolated. Within a week on DevConnect I had five connections and a study group that meets every Sunday on video call.",
  },
  {
    name: "Riya Iyer",
    role: "Mobile dev",
    city: "Bangalore",
    initials: "RI",
    color: "pink",
    featured: false,
    quote:
      "Matched with a UI/UX designer from Chennai who had the exact skills I was missing. We launched our mobile app two months later and got 500 users in the first week.",
  },
];

const stats = [
  { value: "12k+", label: "Developers joined" },
  { value: "38",   label: "Cities connected"  },
  { value: "4.9",  label: "Average rating"    },
];

const avatarColors = {
  blue:   { bg: "#E6F1FB", color: "#0C447C" },
  teal:   { bg: "#E1F5EE", color: "#085041" },
  purple: { bg: "#EEEDFE", color: "#3C3489" },
  coral:  { bg: "#FAECE7", color: "#712B13" },
  amber:  { bg: "#FAEEDA", color: "#633806" },
  pink:   { bg: "#FBEAF0", color: "#72243E" },
};

const Stars = () => (
  <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
    {[...Array(5)].map((_, i) => (
      <span key={i} style={{ color: "#EF9F27", fontSize: 14 }}>★</span>
    ))}
  </div>
);

const Avatar = ({ initials, color }) => {
  const { bg, color: textColor } = avatarColors[color] || avatarColors.blue;
  return (
    <div style={{
      width: 38, height: 38, borderRadius: "50%",
      background: bg, color: textColor,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 600, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
};

const TestimonialCard = ({ t, index }) => (
  <div
    className="tm-card"
    style={{
      border: t.featured ? "2px solid #7C3AED" : "1px solid #f0ebff",
      animationDelay: `${index * 80}ms`,
    }}
  >
    {t.featured && (
      <span className="tm-badge">⭐ Featured</span>
    )}
    <Stars />
    <p className="tm-quote">"{t.quote}"</p>
    <div className="tm-divider" />
    <div className="tm-author">
      <Avatar initials={t.initials} color={t.color} />
      <div>
        <p className="tm-name">{t.name}</p>
        <p className="tm-meta">{t.role} · {t.city}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => (
  <>
    <style>{css}</style>
    <section className="tm-root">
      {/* Orbs */}
      <div className="tm-orb tm-orb--a" aria-hidden="true" />
      <div className="tm-orb tm-orb--b" aria-hidden="true" />

      <div className="tm-inner">
        {/* Header */}
        <div className="tm-header">
          <span className="tm-eyebrow">Developer stories</span>
          <h2 className="tm-title">Devs connecting across cities</h2>
          <p className="tm-subtitle">Real experiences from the DevConnect community</p>
        </div>

        {/* Stats */}
        <div className="tm-stats">
          {stats.map((s) => (
            <div key={s.label} className="tm-stat">
              <p className="tm-stat__num">{s.value}</p>
              <p className="tm-stat__label">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Cards — row 1 */}
        <div className="tm-grid">
          {testimonials.slice(0, 3).map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* Cards — row 2 */}
        <div className="tm-grid">
          {testimonials.slice(3).map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  </>
);

const css = `
  .tm-root {
    position: relative;
    background: #fff;
    overflow: hidden;
    padding: 80px 24px;
    font-family: 'Inter', system-ui, sans-serif;
  }

  /* Orbs */
  .tm-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(90px);
    animation: tmPulse ease-in-out infinite alternate;
  }
  .tm-orb--a {
    width: 500px; height: 500px;
    background: rgba(124,58,237,0.07);
    top: -120px; left: -120px;
    animation-duration: 10s;
  }
  .tm-orb--b {
    width: 400px; height: 400px;
    background: rgba(6,182,212,0.06);
    bottom: -80px; right: -80px;
    animation-duration: 13s;
  }
  @keyframes tmPulse {
    from { transform: scale(1); }
    to   { transform: scale(1.14); }
  }

  /* Inner */
  .tm-inner {
    position: relative;
    z-index: 1;
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  /* Header */
  .tm-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .tm-eyebrow {
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
  }
  .tm-title {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    font-weight: 800;
    color: #111827;
    margin: 0;
    letter-spacing: -0.025em;
  }
  .tm-subtitle {
    font-size: 1rem;
    color: #9ca3af;
    margin: 0;
  }

  /* Stats */
  .tm-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }
  .tm-stat {
    background: #fafafa;
    border: 1px solid #f0ebff;
    border-radius: 16px;
    padding: 20px;
    text-align: center;
  }
  .tm-stat__num {
    font-size: 2rem;
    font-weight: 800;
    color: #7C3AED;
    margin: 0 0 4px;
    letter-spacing: -0.03em;
  }
  .tm-stat__label {
    font-size: 0.82rem;
    color: #9ca3af;
    margin: 0;
  }

  /* Grid */
  .tm-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  /* Card */
  .tm-card {
    background: #fff;
    border-radius: 20px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 2px 16px rgba(124,58,237,0.06), 0 1px 3px rgba(0,0,0,0.04);
    transition: transform 0.22s cubic-bezier(0.34,1.3,0.64,1), box-shadow 0.22s ease;
    animation: tmCardIn 0.5s cubic-bezier(0.34,1.2,0.64,1) both;
  }
  .tm-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 36px rgba(124,58,237,0.13), 0 2px 8px rgba(0,0,0,0.05);
  }
  @keyframes tmCardIn {
    from { opacity: 0; transform: translateY(20px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }

  /* Featured badge */
  .tm-badge {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    color: #7C3AED;
    background: #f5f3ff;
    border: 1px solid #ede9fe;
    border-radius: 20px;
    padding: 3px 10px;
    width: fit-content;
  }

  /* Quote */
  .tm-quote {
    font-size: 0.88rem;
    color: #4b5563;
    line-height: 1.65;
    margin: 0;
    flex: 1;
  }

  /* Divider */
  .tm-divider {
    height: 1px;
    background: #f3f4f6;
    margin: 2px 0;
  }

  /* Author */
  .tm-author {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .tm-name {
    font-size: 0.875rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }
  .tm-meta {
    font-size: 0.75rem;
    color: #9ca3af;
    margin: 0;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .tm-grid { grid-template-columns: repeat(2, 1fr); }
    .tm-stats { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 560px) {
    .tm-grid { grid-template-columns: 1fr; }
    .tm-stats { grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .tm-root { padding: 56px 16px; }
    .tm-stat__num { font-size: 1.5rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .tm-card, .tm-orb { animation: none !important; transition: none !important; }
  }
`;

export default Testimonials;
