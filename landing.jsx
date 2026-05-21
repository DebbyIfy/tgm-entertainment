import { useEffect, useRef, useState } from "react";

const packages = [
  {
    label: "Package 01",
    name: "Visibility Boost",
    price: "₦1,500,000",
    desc: "For emerging talents & focused campaign bursts.",
    checkoutUrl: "https://paystack.shop/pay/t9j4torqg3",
    features: [
      "1 campaign direction document",
      "Messaging framework (how you talk about your project)",
      "Content angle suggestions — viral + PR-driven",
      "30 strategic posts across platforms",
      "Platform adaptation: Instagram, X, TikTok, LinkedIn (optional)",
      "Key dates mapped to your release timeline",
      "1 curated digital interview placement",
      "Talking points + media prep guide",
      "Posting support — done-for-you for 2 weeks",
      "Hashtag + engagement direction",
      "End-of-campaign insights report",
      "What worked + next steps",
    ],
  },
  {
    label: "Package 02",
    name: "Premium Visibility Sprint",
    price: "₦2,500,000",
    desc: "For established talents, major releases & high-impact campaigns.",
    checkoutUrl: "https://paystack.shop/pay/qsx241c7g0",
    features: [
      "Everything in Visibility Boost",
      "Full campaign rollout plan — pre, during & post release",
      "Personal brand positioning during the campaign",
      "Audience targeting strategy",
      "10 designed posts (premium creatives)",
      "6 caption storytelling pieces",
      "4 short-form video concepts",
      "1 long-form content piece (feature article or blog)",
      "1 TV appearance secured on an entertainment/lifestyle show",
      "Full media training + talking points",
      "Interview positioning — narrative strategy",
      "2 additional digital features (blogs / media platforms)",
      "Online press mentions where applicable",
      "Trend monitoring + real-time content suggestions",
      "Influencer & creator collaboration strategy",
      "Weekly performance insights + campaign optimisation",
    ],
  },
];

const steps = [
  ["01", "Select Package", "Choose the visibility tier that matches your release moment, premiere, or campaign window."],
  ["02", "Make Payment", "Complete checkout instantly. No calls. No back and forth. Your slot is secured immediately."],
  ["03", "Fill Onboarding Form", "We send a welcome message and a short form — project details, release date, and assets."],
  ["04", "Campaign Launches", "Your sprint goes live within 48–72 hours. We manage it. You stay visible."],
];

const addons = [
  ["Red Carpet / Launch Event PR", "Full on-ground PR coverage for your event — press coordination, arrival coverage, and recap amplification.", "₦5,000,000"],
  ["Influencer Engagement", "Strategic creator partnerships to amplify your release across Instagram, TikTok, and YouTube.", "₦1,000,000"],
  ["Paid Ads Management", "Meta & YouTube ad campaigns managed for maximum reach during your campaign window.", "₦500,000"],
  ["Press Release Distribution", "Written and distributed to media contacts, entertainment blogs, and relevant desks.", "₦200,000"],
];

const outcomes = [
  ["Your release does not go unnoticed.", "Every drop is amplified to the right rooms, right voices, and right moment."],
  ["Your narrative becomes intentional.", "You control the story. We make sure it travels with the right framing."],
  ["Attention turns into influence.", "Visibility compounds into momentum that lasts beyond campaign week."],
];

const useInView = (threshold = 0.14) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

const CTAButton = ({ children, href = "#packages", variant = "primary" }) => {
  const go = () => {
    if (/^https?:\/\//.test(href)) { window.location.href = href; return; }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <button className={`btn btn-${variant}`} onClick={go}>
      {children}
    </button>
  );
};

const SectionTitle = ({ kicker, title, copy }) => (
  <Reveal className="section-head">
    <span className="kicker">{kicker}</span>
    <h2>{title}</h2>
    {copy && <p className="section-copy">{copy}</p>}
  </Reveal>
);

const PackageCard = ({ pkg, recommended }) => {
  const [open, setOpen] = useState(false);
  const shown = open ? pkg.features : pkg.features.slice(0, 5);

  return (
    <article className={`package-card ${recommended ? "featured" : ""}`}>
      {recommended && <div className="badge">Most Popular</div>}

      <div className="card-header">
        <p className="card-label">{pkg.label}</p>
        <h3>{pkg.name}</h3>
        <p className="card-copy">{pkg.desc}</p>
      </div>

      <div className="price-row">
        <p>{pkg.price}</p>
        <span>One-time campaign fee</span>
      </div>

      <ul className="feature-list">
        {shown.map((f) => <li key={f}>{f}</li>)}
      </ul>

      {pkg.features.length > 5 && (
        <button className="link-btn" onClick={() => setOpen((v) => !v)}>
          {open ? "Show less" : `+${pkg.features.length - 5} more inclusions`}
        </button>
      )}

      <CTAButton href={pkg.checkoutUrl || "#addons"} variant={recommended ? "primary" : "secondary"}>
        Start This Sprint
      </CTAButton>
    </article>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const heroImageSrc = `${import.meta.env.BASE_URL}hero-visibility.png`;
  const logoSrc = `${import.meta.env.BASE_URL}tgm-logo.png`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <style>{css}</style>

      <nav className={`nav ${scrolled ? "nav-solid" : ""}`}>
        <a className="brand" href="#top" aria-label="TGM Entertainment">
          <img src={logoSrc} alt="TGM Entertainment" />
        </a>
        <div className="nav-links">
          <a href="#process">Process</a>
          <a href="#packages">Packages</a>
          <a href="#addons">Add-Ons</a>
          <CTAButton href="#packages">Start Sprint</CTAButton>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="hero-media" aria-hidden="true">
          <img src={heroImageSrc} alt="" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-glow hero-glow-1" aria-hidden="true" />
        <div className="hero-glow hero-glow-2" aria-hidden="true" />

        <div className="hero-inner">
          <div className="hero-copy">
            <span className="kicker">Entertainment Visibility Packages</span>
            <h1>
              Turn release week<br />into a <em>public moment.</em>
            </h1>
            <p>
              A done-for-you visibility sprint for actors, musicians, and creatives. Your project doesn't just launch — it trends, resonates, and converts attention into influence. No long calls. No back and forth.
            </p>
            <div className="hero-actions">
              <CTAButton href="#packages">Start Visibility Sprint</CTAButton>
              <CTAButton href="#process" variant="secondary">See The Process</CTAButton>
            </div>
          </div>

          <aside className="hero-stats" aria-label="Campaign highlights">
            <div>
              <strong>48–72 hrs</strong>
              <span>Launch speed</span>
            </div>
            <div>
              <strong>Done for you</strong>
              <span>Campaign mode</span>
            </div>
            <div>
              <strong>Releases & Premieres</strong>
              <span>Best for</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="problem section">
        <div className="container split">
          <Reveal>
            <span className="kicker">The Problem</span>
            <h2>Great work still disappears when distribution is an afterthought.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="statement-stack">
              {[
                "Your release drops. No one hears it.",
                "You invest in production. Not enough in reach.",
                "Noise wins. Silence follows.",
                "Momentum waits for a plan.",
              ].map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="process" className="section">
        <div className="container">
          <SectionTitle
            kicker="How It Works"
            title="Four steps. Zero guesswork."
            copy="The campaign is built like a sprint: clear package, clear brief, clear launch window."
          />
          <div className="step-grid">
            {steps.map(([num, title, copy], index) => (
              <Reveal key={num} delay={index * 0.08}>
                <article className="step-card">
                  <span className="step-num">{num}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="section packages">
        <div className="container">
          <SectionTitle
            kicker="Packages"
            title="Choose the scale of your visibility sprint."
            copy="Every package is a managed campaign system, not a loose collection of PR tasks."
          />
          <div className="package-grid">
            {packages.map((pkg, index) => (
              <Reveal key={pkg.name} delay={index * 0.1}>
                <PackageCard pkg={pkg} recommended={index === 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section outcomes">
        <div className="container split">
          <Reveal>
            <span className="kicker">What Changes</span>
            <h2>Visibility becomes planned, measured, and repeatable.</h2>
          </Reveal>
          <div className="outcome-list">
            {outcomes.map(([title, copy], index) => (
              <Reveal key={title} delay={index * 0.1}>
                <article>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="addons" className="section addons">
        <div className="container">
          <SectionTitle
            kicker="Add-Ons"
            title="Layer in the channels your moment needs."
            copy="These are our service charges and do not include third-party costs. Use add-ons to extend a campaign into events, influencer reach, paid media, or press distribution."
          />
          <div className="addon-grid">
            {addons.map(([name, desc, price], index) => (
              <Reveal key={name} delay={index * 0.07}>
                <article className="addon-card">
                  <h3>{name}</h3>
                  <p>{desc}</p>
                  <strong>{price}</strong>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <Reveal>
          <span className="kicker">Ready</span>
          <h2>Your next release should be impossible to ignore.</h2>
          <p>Do not just release. Arrive with a visibility system already in motion.</p>
          <CTAButton href="#packages">Start Visibility Sprint</CTAButton>
        </Reveal>
      </section>

      <footer>
        <p>Entertainment Visibility Packages</p>
        <span>A done-for-you visibility system for high-stakes moments in entertainment.</span>
      </footer>
    </main>
  );
}

const css = `
  @import url("https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&display=swap");

  :root {
    --bg: #060605;
    --bg-2: #0c0b0a;
    --panel: #111010;
    --panel-2: #181614;
    --line: rgba(255, 255, 255, 0.07);
    --line-md: rgba(255, 255, 255, 0.11);
    --gold: #d4a843;
    --gold-2: #f0c84a;
    --gold-dim: rgba(212, 168, 67, 0.12);
    --red: #a64235;
    --ivory: #f5ede0;
    --muted: #7c7268;
    --dim: #524a42;
    --r: 14px;
    --r-sm: 8px;
    --r-full: 100px;
    font-family: "Inter", system-ui, sans-serif;
    color: var(--ivory);
    background: var(--bg);
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: var(--bg); }
  button, a { font: inherit; }
  a { color: inherit; text-decoration: none; }
  ::selection { background: rgba(212, 168, 67, 0.28); color: var(--ivory); }

  main { min-height: 100vh; overflow: hidden; }

  /* ── NAV ── */
  .nav {
    position: fixed;
    inset: 0 0 auto;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem clamp(1rem, 4vw, 3rem);
    transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
    border-bottom: 1px solid transparent;
  }

  .nav-solid {
    background: rgba(6, 6, 5, 0.82);
    border-color: var(--line-md);
    backdrop-filter: blur(24px) saturate(1.4);
  }

  .brand {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.75rem;
    transition: opacity 0.2s;
  }

  .brand img {
    height: 100%;
    width: auto;
    object-fit: contain;
    display: block;
  }

  .brand:hover { opacity: 0.82; }

  .nav-links {
    display: flex;
    align-items: center;
    gap: clamp(0.75rem, 2vw, 2rem);
  }

  .nav-links a {
    color: var(--muted);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    transition: color 0.2s;
  }

  .nav-links a:hover { color: var(--ivory); }

  /* ── BUTTONS ── */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 3rem;
    border: 1px solid transparent;
    border-radius: var(--r-full);
    padding: 0.72rem 1.55rem;
    cursor: pointer;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease,
      border-color 0.2s ease, box-shadow 0.25s ease;
    white-space: nowrap;
  }

  .btn:hover { transform: translateY(-2px); }

  .btn-primary {
    background: var(--gold);
    color: #120e00;
    border-color: var(--gold);
  }

  .btn-primary:hover {
    background: var(--gold-2);
    border-color: var(--gold-2);
    box-shadow: 0 6px 28px rgba(212, 168, 67, 0.38);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.04);
    border-color: var(--line-md);
    color: rgba(245, 237, 224, 0.7);
  }

  .btn-secondary:hover {
    border-color: rgba(212, 168, 67, 0.45);
    color: var(--gold-2);
    background: rgba(212, 168, 67, 0.06);
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: flex-end;
    padding: 7rem clamp(1rem, 4vw, 4rem) 4.5rem;
    overflow: hidden;
  }

  .hero-media,
  .hero-overlay {
    position: absolute;
    inset: 0;
  }

  .hero-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: saturate(0.78) contrast(1.1) brightness(0.88);
  }

  .hero-overlay {
    background:
      linear-gradient(90deg, rgba(6,6,5,0.97) 0%, rgba(6,6,5,0.72) 50%, rgba(6,6,5,0.22) 100%),
      linear-gradient(0deg, rgba(6,6,5,0.97) 0%, rgba(6,6,5,0.08) 52%, rgba(6,6,5,0.62) 100%);
  }

  .hero-glow {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(100px);
  }

  .hero-glow-1 {
    width: 520px;
    height: 520px;
    left: -80px;
    bottom: -120px;
    background: radial-gradient(circle, rgba(166, 66, 53, 0.26), transparent 70%);
  }

  .hero-glow-2 {
    width: 380px;
    height: 380px;
    right: 8%;
    top: 12%;
    background: radial-gradient(circle, rgba(212, 168, 67, 0.13), transparent 70%);
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    width: min(1140px, 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 19rem;
    gap: clamp(2.5rem, 7vw, 6rem);
    align-items: end;
  }

  .hero-copy { animation: heroIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) both; }

  /* ── KICKER ── */
  .kicker {
    display: inline-flex;
    align-items: center;
    margin-bottom: 1.35rem;
    padding: 0.38rem 0.95rem;
    background: rgba(212, 168, 67, 0.09);
    border: 1px solid rgba(212, 168, 67, 0.26);
    border-radius: var(--r-full);
    color: var(--gold-2);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  h1, h2, h3, p { margin-top: 0; }

  h1, h2 {
    font-family: "Playfair Display", Georgia, serif;
    letter-spacing: -0.02em;
  }

  h1 {
    margin-bottom: 1.5rem;
    font-size: clamp(3.4rem, 8.5vw, 7rem);
    line-height: 0.93;
  }

  h1 em {
    font-style: italic;
    background: linear-gradient(125deg, var(--gold) 20%, var(--gold-2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-copy > p {
    max-width: 540px;
    margin-bottom: 2.2rem;
    color: var(--muted);
    font-size: clamp(0.97rem, 1.4vw, 1.1rem);
    line-height: 1.82;
    font-weight: 400;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  /* hero stats sidebar */
  .hero-stats {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--line-md);
    border-radius: var(--r);
    overflow: hidden;
    background: rgba(11, 10, 9, 0.72);
    backdrop-filter: blur(20px) saturate(1.2);
  }

  .hero-stats div {
    padding: 1.2rem 1.4rem;
    border-bottom: 1px solid var(--line);
  }

  .hero-stats div:last-child { border-bottom: none; }

  .hero-stats strong {
    display: block;
    color: var(--ivory);
    font-size: 0.97rem;
    font-weight: 700;
    margin-bottom: 0.22rem;
  }

  .hero-stats span {
    display: block;
    color: var(--dim);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  /* ── SECTION BASE ── */
  .section {
    position: relative;
    padding: clamp(5rem, 9vw, 8rem) clamp(1rem, 4vw, 3rem);
    isolation: isolate;
  }

  .container {
    position: relative;
    z-index: 1;
    width: min(1120px, 100%);
    margin: 0 auto;
  }

  .section-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 660px;
    margin: 0 auto 4rem;
    text-align: center;
  }

  .section h2 {
    margin-bottom: 1rem;
    font-size: clamp(2.2rem, 4.8vw, 4rem);
    line-height: 1.02;
  }

  .section-copy, .card-copy {
    color: var(--muted);
    line-height: 1.75;
    font-size: 0.94rem;
    margin-bottom: 0;
  }

  .split {
    display: grid;
    grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
    gap: clamp(2.5rem, 7vw, 6rem);
    align-items: start;
  }

  /* ── PROBLEM ── */
  .problem {
    background:
      radial-gradient(circle at 88% 12%, rgba(212, 168, 67, 0.07), transparent 28%),
      radial-gradient(circle at 4% 88%, rgba(166, 66, 53, 0.1), transparent 32%),
      var(--bg-2);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .problem h2 {
    font-size: clamp(2rem, 4vw, 3.4rem);
    line-height: 1.06;
    margin-top: 0.6rem;
  }

  .statement-stack { display: grid; gap: 0.55rem; }

  .statement-stack p {
    margin: 0;
    padding: 1rem 1.3rem;
    color: var(--ivory);
    background: rgba(255, 255, 255, 0.028);
    border: 1px solid var(--line);
    border-left: 2px solid rgba(212, 168, 67, 0.55);
    border-radius: var(--r-sm);
    font-size: 0.94rem;
    font-weight: 500;
    line-height: 1.55;
    transition: background 0.22s, border-color 0.22s;
  }

  .statement-stack p:hover {
    background: rgba(212, 168, 67, 0.05);
    border-color: rgba(212, 168, 67, 0.28);
    border-left-color: var(--gold);
  }

  /* ── PROCESS ── */
  .step-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
  }

  .step-card {
    display: flex;
    flex-direction: column;
    padding: 1.75rem;
    min-height: 17rem;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: var(--r);
    transition: border-color 0.25s, transform 0.28s ease, box-shadow 0.28s ease;
  }

  .step-card:hover {
    border-color: rgba(212, 168, 67, 0.28);
    transform: translateY(-5px);
    box-shadow: 0 20px 56px rgba(0, 0, 0, 0.32);
  }

  .step-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--r-full);
    background: var(--gold-dim);
    border: 1px solid rgba(212, 168, 67, 0.28);
    color: var(--gold-2);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    margin-bottom: 2.4rem;
    flex-shrink: 0;
  }

  .step-card h3 {
    margin-bottom: 0.65rem;
    color: var(--ivory);
    font-family: "Playfair Display", serif;
    font-size: 1.22rem;
    line-height: 1.22;
    letter-spacing: -0.01em;
  }

  .step-card p {
    margin: 0;
    margin-top: auto;
    color: var(--muted);
    font-size: 0.87rem;
    line-height: 1.68;
  }

  /* ── PACKAGES ── */
  .packages {
    background:
      radial-gradient(circle at 10% 22%, rgba(212, 168, 67, 0.08), transparent 24%),
      radial-gradient(circle at 90% 78%, rgba(166, 66, 53, 0.08), transparent 24%),
      var(--bg-2);
  }

  .package-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
    align-items: start;
  }

  .package-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding: clamp(1.5rem, 3vw, 2.2rem);
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 20px;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .package-card:hover {
    transform: translateY(-6px);
    border-color: rgba(212, 168, 67, 0.32);
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.36);
  }

  .package-card.featured {
    background:
      linear-gradient(155deg, rgba(212, 168, 67, 0.1) 0%, rgba(166, 66, 53, 0.06) 38%, var(--panel) 68%);
    border-color: rgba(212, 168, 67, 0.5);
    box-shadow:
      0 0 0 1px rgba(212, 168, 67, 0.12),
      0 28px 80px rgba(0, 0, 0, 0.38),
      0 0 60px rgba(212, 168, 67, 0.07);
  }

  .package-card.featured:hover {
    box-shadow:
      0 0 0 1px rgba(212, 168, 67, 0.22),
      0 36px 96px rgba(0, 0, 0, 0.48),
      0 0 80px rgba(212, 168, 67, 0.12);
  }

  .badge {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    padding: 0.3rem 0.78rem;
    background: rgba(212, 168, 67, 0.13);
    border: 1px solid rgba(212, 168, 67, 0.38);
    border-radius: var(--r-full);
    color: var(--gold-2);
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .card-header { display: flex; flex-direction: column; gap: 0.45rem; }

  .card-label {
    display: block;
    color: var(--dim);
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin: 0;
  }

  .package-card h3 {
    margin: 0;
    color: var(--ivory);
    font-family: "Playfair Display", serif;
    font-size: clamp(1.7rem, 3vw, 2.3rem);
    line-height: 1.06;
    letter-spacing: -0.02em;
  }

  .card-copy {
    margin: 0;
    font-size: 0.87rem;
  }

  .price-row {
    padding-top: 1.4rem;
    border-top: 1px solid var(--line);
  }

  .price-row p {
    margin-bottom: 0.2rem;
    color: var(--gold-2);
    font-family: "Playfair Display", serif;
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .price-row span {
    display: block;
    color: var(--dim);
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .feature-list {
    display: flex;
    flex-direction: column;
    gap: 0.62rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .feature-list li {
    position: relative;
    padding-left: 1.5rem;
    color: rgba(245, 237, 224, 0.72);
    font-size: 0.87rem;
    line-height: 1.55;
  }

  .feature-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    top: 0;
    color: var(--gold);
    font-size: 0.8rem;
    font-weight: 700;
    line-height: 1.55;
  }

  .featured .feature-list li:first-child {
    color: var(--gold-2);
    font-weight: 600;
  }

  .link-btn {
    width: fit-content;
    border: 0;
    padding: 0;
    background: transparent;
    color: var(--gold-2);
    cursor: pointer;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    transition: opacity 0.2s;
  }

  .link-btn:hover { opacity: 0.7; }

  .package-card .btn { width: 100%; margin-top: auto; }

  /* ── OUTCOMES ── */
  .outcomes {
    background:
      radial-gradient(circle at 86% 76%, rgba(166, 66, 53, 0.09), transparent 26%),
      var(--bg);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .outcomes .split > div:first-child .kicker { margin-bottom: 1.2rem; }
  .outcomes h2 { font-size: clamp(2rem, 4vw, 3.4rem); line-height: 1.08; margin-top: 0.6rem; }

  .outcome-list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    counter-reset: outcomes;
  }

  .outcome-list article {
    padding: 1.5rem 1.6rem;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: var(--r);
    counter-increment: outcomes;
    transition: border-color 0.24s, background 0.24s;
  }

  .outcome-list article:hover {
    border-color: rgba(212, 168, 67, 0.24);
    background: rgba(212, 168, 67, 0.03);
  }

  .outcome-list article::before {
    content: "0" counter(outcomes);
    display: block;
    margin-bottom: 0.75rem;
    color: rgba(212, 168, 67, 0.32);
    font-family: "Playfair Display", serif;
    font-size: 1rem;
    font-style: italic;
  }

  .outcome-list h3 {
    margin-bottom: 0.4rem;
    color: var(--ivory);
    font-family: "Playfair Display", serif;
    font-size: 1.18rem;
    line-height: 1.28;
    letter-spacing: -0.01em;
  }

  .outcome-list p {
    margin: 0;
    color: var(--muted);
    font-size: 0.87rem;
    line-height: 1.68;
  }

  /* ── ADD-ONS ── */
  .addons {
    background:
      radial-gradient(circle at 22% 82%, rgba(212, 168, 67, 0.06), transparent 24%),
      var(--bg-2);
  }

  .addon-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
  }

  .addon-card {
    display: flex;
    flex-direction: column;
    padding: 1.6rem;
    min-height: 13rem;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: var(--r);
    transition: border-color 0.26s, transform 0.28s ease, box-shadow 0.28s ease;
  }

  .addon-card:hover {
    border-color: rgba(212, 168, 67, 0.28);
    transform: translateY(-5px);
    box-shadow: 0 18px 52px rgba(0, 0, 0, 0.3);
  }

  .addon-card h3 {
    margin-bottom: 0.65rem;
    color: var(--ivory);
    font-family: "Playfair Display", serif;
    font-size: 1.14rem;
    line-height: 1.28;
    letter-spacing: -0.01em;
  }

  .addon-card p {
    flex: 1;
    color: var(--muted);
    font-size: 0.84rem;
    line-height: 1.68;
  }

  .addon-card strong {
    display: inline-flex;
    align-self: flex-start;
    margin-top: 1.2rem;
    padding: 0.38rem 0.9rem;
    background: var(--gold-dim);
    border: 1px solid rgba(212, 168, 67, 0.24);
    border-radius: var(--r-full);
    color: var(--gold-2);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  /* ── FINAL CTA ── */
  .final-cta {
    position: relative;
    padding: clamp(6rem, 11vw, 10rem) 1rem;
    text-align: center;
    background:
      radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212, 168, 67, 0.1), transparent),
      radial-gradient(ellipse 60% 50% at 15% 100%, rgba(166, 66, 53, 0.12), transparent),
      radial-gradient(ellipse 60% 50% at 85% 100%, rgba(212, 168, 67, 0.07), transparent),
      #090807;
    overflow: hidden;
  }

  .final-cta > div {
    position: relative;
    z-index: 1;
    width: min(740px, 100%);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .final-cta h2 {
    margin-bottom: 1rem;
    font-family: "Playfair Display", serif;
    font-size: clamp(2.6rem, 6.5vw, 5.5rem);
    line-height: 0.95;
  }

  .final-cta p:not(.kicker) {
    margin-bottom: 2.5rem;
    color: var(--muted);
    font-size: 1rem;
    line-height: 1.78;
    max-width: 420px;
  }

  /* ── FOOTER ── */
  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 2rem clamp(1rem, 4vw, 3rem);
    border-top: 1px solid var(--line);
    background: var(--bg);
    color: var(--dim);
  }

  footer p {
    margin: 0;
    color: var(--gold-2);
    font-family: "Playfair Display", serif;
    font-size: 0.95rem;
    letter-spacing: -0.01em;
  }

  footer span { font-size: 0.82rem; }

  /* ── REVEAL ── */
  .reveal {
    opacity: 0;
    transform: translateY(1.6rem);
    transition: opacity 0.68s cubic-bezier(0.16, 1, 0.3, 1), transform 0.68s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .reveal.is-visible { opacity: 1; transform: translateY(0); }

  @keyframes heroIn {
    from { opacity: 0; transform: translateY(1.6rem); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 1060px) {
    .step-grid, .addon-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 920px) {
    .nav { padding: 0.85rem 1rem; }
    .nav-links a { display: none; }
    .nav-links .btn { min-height: 2.6rem; padding: 0.65rem 1.2rem; font-size: 0.72rem; }
    .hero { padding-top: 8rem; padding-bottom: 3.5rem; }
    .hero-inner { grid-template-columns: 1fr; gap: 2.5rem; }
    .hero-stats { flex-direction: row; border-radius: var(--r); }
    .hero-stats div { flex: 1; border-bottom: none; border-right: 1px solid var(--line); padding: 1rem 1.2rem; }
    .hero-stats div:last-child { border-right: none; }
    .split, .package-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 620px) {
    h1 { font-size: clamp(3rem, 17vw, 4.8rem); }
    .hero { padding-inline: 1rem; padding-bottom: 3rem; }
    .hero-overlay {
      background:
        linear-gradient(180deg, rgba(6,6,5,0.7) 0%, rgba(6,6,5,0.97) 55%),
        linear-gradient(90deg, rgba(6,6,5,0.94), rgba(6,6,5,0.4));
    }
    .hero-media img { object-position: 60% center; }
    .hero-actions, .hero-actions .btn { width: 100%; }
    .hero-stats { flex-direction: column; border-radius: var(--r); }
    .hero-stats div { border-right: none; border-bottom: 1px solid var(--line); }
    .hero-stats div:last-child { border-bottom: none; }
    .section-head { text-align: left; align-items: flex-start; }
    .step-grid, .addon-grid { grid-template-columns: 1fr; }
    .step-card { min-height: auto; }
    .badge { position: static; width: fit-content; margin-bottom: -0.5rem; }
    footer { flex-direction: column; align-items: flex-start; }
  }
`;
