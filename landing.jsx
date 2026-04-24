import { useEffect, useRef, useState } from "react";

const packages = [
  {
    label: "Package 01",
    name: "Visibility Boost",
    price: "₦1,500,000",
    desc: "For emerging talents and focused campaigns that need credible reach fast.",
    features: [
      "Editorial placement on 3 top platforms",
      "Press release written and distributed",
      "Social media push strategy",
      "4-week coverage window",
      "2 influencer seedings",
      "Campaign performance report",
      "Dedicated campaign manager",
    ],
  },
  {
    label: "Package 02",
    name: "Premium Visibility Sprint",
    price: "₦2,500,000",
    desc: "For major releases, premieres, red carpets, and high-impact public moments.",
    features: [
      "Editorial placement on 6-8 premium platforms",
      "Full press release suite",
      "Red carpet or launch event PR coordination",
      "Influencer seeding across 8 creators",
      "Paid ads management",
      "8-week extended coverage window",
      "Celebrity and industry peer amplification",
      "Crisis narrative management",
      "VIP campaign manager with direct line",
      "Detailed analytics and visibility report",
    ],
  },
];

const steps = [
  ["01", "Select Package", "Choose the visibility tier that matches your release, premiere, or launch window."],
  ["02", "Confirm Slot", "Secure checkout and campaign availability before your media window opens."],
  ["03", "Submit Brief", "Share assets, story angles, target audience, schedule, and must-hit platforms."],
  ["04", "Launch Sprint", "The campaign goes live within 48-72 hours with managed reporting."],
];

const addons = [
  ["Red Carpet / Launch PR", "On-ground coordination, press invites, arrival coverage, and recap amplification.", "Custom"],
  ["Influencer Seeding", "Targeted creator partnerships across Instagram, TikTok, and YouTube.", "From ₦250,000"],
  ["Paid Ads Management", "Performance-optimised campaigns across Meta, Google, and YouTube.", "From ₦300,000"],
  ["Press Release Distribution", "Written and distributed to media contacts, blogs, and entertainment desks.", "From ₦150,000"],
];

const outcomes = [
  ["Your release does not go unnoticed.", "Every drop is amplified to the right rooms, right voices, and right moment."],
  ["Your narrative becomes intentional.", "You control the story. We make sure it travels with the right framing."],
  ["Attention turns into influence.", "Visibility compounds into momentum that lasts beyond campaign week."],
];

const useInView = (threshold = 0.16) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
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
  const goToSection = () => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button className={`btn btn-${variant}`} onClick={goToSection}>
      {children}
    </button>
  );
};

const SectionTitle = ({ kicker, title, copy }) => (
  <Reveal className="section-head">
    <p className="kicker">{kicker}</p>
    <h2>{title}</h2>
    {copy && <p className="section-copy">{copy}</p>}
  </Reveal>
);

const PackageCard = ({ pkg, recommended }) => {
  const [open, setOpen] = useState(false);
  const shown = open ? pkg.features : pkg.features.slice(0, 5);

  return (
    <article className={`package-card ${recommended ? "featured" : ""}`}>
      {recommended && <div className="badge">Recommended</div>}
      <div>
        <p className="card-label">{pkg.label}</p>
        <h3>{pkg.name}</h3>
        <p className="card-copy">{pkg.desc}</p>
      </div>

      <div className="price-row">
        <p>{pkg.price}</p>
        <span>One-time campaign fee</span>
      </div>

      <ul className="feature-list">
        {shown.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      {pkg.features.length > 5 && (
        <button className="link-btn" onClick={() => setOpen((value) => !value)}>
          {open ? "Show less" : `Show ${pkg.features.length - 5} more inclusions`}
        </button>
      )}

      <CTAButton href="#addons" variant={recommended ? "primary" : "secondary"}>
        Start This Sprint
      </CTAButton>
    </article>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);

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
        <a className="brand" href="#top" aria-label="Entertainment Visibility Packages">
          EVP
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
          <img src="/hero-visibility.png" alt="" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="kicker">Entertainment Visibility Packages</p>
            <h1>
              Turn release week into a public moment.
            </h1>
            <p>
              A done-for-you visibility system for actors, musicians, and creatives launching work that needs more than a quiet post and crossed fingers.
            </p>
            <div className="hero-actions">
              <CTAButton href="#packages">Start Visibility Sprint</CTAButton>
              <CTAButton href="#process" variant="secondary">See The Process</CTAButton>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Campaign highlights">
            <div>
              <span>Launch speed</span>
              <strong>48-72 hrs</strong>
            </div>
            <div>
              <span>Campaign mode</span>
              <strong>Done for you</strong>
            </div>
            <div>
              <span>Best for</span>
              <strong>Releases, premieres, PR pushes</strong>
            </div>
          </aside>
        </div>
      </section>

      <section className="problem section">
        <div className="container split">
          <Reveal>
            <p className="kicker">The Problem</p>
            <h2>Great work still disappears when distribution is treated as an afterthought.</h2>
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
                  <span>{num}</span>
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
            <p className="kicker">What Changes</p>
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
            copy="Use add-ons to extend a campaign into events, influencer discovery, paid reach, or deeper media distribution."
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
          <p className="kicker">Ready</p>
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
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap");

  :root {
    --bg: #090908;
    --bg-2: #10100f;
    --panel: #171613;
    --panel-2: #1d1a14;
    --line: rgba(245, 238, 219, 0.13);
    --gold: #d6ae42;
    --gold-2: #f0cc6d;
    --red: #a64235;
    --ivory: #f5efe1;
    --muted: #a59b8b;
    --dim: #746b5e;
    font-family: "DM Sans", system-ui, sans-serif;
    color: var(--ivory);
    background: var(--bg);
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: var(--bg); }
  button, a { font: inherit; }
  a { color: inherit; }
  ::selection { background: rgba(214, 174, 66, 0.32); color: var(--ivory); }

  main {
    min-height: 100vh;
    overflow: hidden;
    background:
      linear-gradient(180deg, rgba(166, 66, 53, 0.08), transparent 24rem),
      var(--bg);
  }

  .nav {
    position: fixed;
    inset: 0 0 auto;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem clamp(1rem, 4vw, 3rem);
    color: var(--ivory);
    transition: background 0.25s ease, border-color 0.25s ease, backdrop-filter 0.25s ease;
    border-bottom: 1px solid transparent;
  }

  .nav-solid {
    background: rgba(9, 9, 8, 0.78);
    border-color: var(--line);
    backdrop-filter: blur(18px);
  }

  .brand {
    display: inline-grid;
    place-items: center;
    width: 2.6rem;
    height: 2.6rem;
    border: 1px solid rgba(214, 174, 66, 0.6);
    color: var(--gold-2);
    text-decoration: none;
    font-family: "Playfair Display", serif;
    font-size: 0.9rem;
    letter-spacing: 0.08em;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: clamp(0.75rem, 2vw, 2rem);
  }

  .nav-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.82rem;
    font-weight: 700;
  }

  .nav-links a:hover { color: var(--ivory); }

  .btn {
    min-height: 2.9rem;
    border: 1px solid transparent;
    padding: 0.86rem 1.2rem;
    color: var(--ivory);
    cursor: pointer;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }

  .btn:hover { transform: translateY(-2px); }
  .btn-primary { background: var(--gold); color: #151006; border-color: var(--gold); }
  .btn-primary:hover { background: var(--gold-2); border-color: var(--gold-2); }
  .btn-secondary { background: rgba(245, 239, 225, 0.04); border-color: var(--line); }
  .btn-secondary:hover { border-color: rgba(214, 174, 66, 0.65); color: var(--gold-2); }

  .hero {
    position: relative;
    min-height: 100svh;
    display: grid;
    align-items: end;
    padding: 7rem clamp(1rem, 4vw, 4rem) 3rem;
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
    filter: saturate(0.86) contrast(1.06);
  }

  .hero-overlay {
    background:
      linear-gradient(90deg, rgba(9, 9, 8, 0.98) 0%, rgba(9, 9, 8, 0.78) 42%, rgba(9, 9, 8, 0.35) 100%),
      linear-gradient(0deg, rgba(9, 9, 8, 0.95) 0%, rgba(9, 9, 8, 0.15) 46%, rgba(9, 9, 8, 0.72) 100%);
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    width: min(1180px, 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 21rem;
    gap: clamp(2rem, 6vw, 5rem);
    align-items: end;
  }

  .hero-copy {
    max-width: 720px;
    animation: heroIn 0.75s ease both;
  }

  .kicker {
    margin: 0 0 1rem;
    color: var(--gold-2);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  h1, h2, h3, p { margin-top: 0; }

  h1,
  h2 {
    font-family: "Playfair Display", Georgia, serif;
    letter-spacing: 0;
  }

  h1 {
    margin-bottom: 1.25rem;
    max-width: 780px;
    font-size: clamp(3.2rem, 8.4vw, 6.8rem);
    line-height: 0.92;
  }

  .hero-copy > p:not(.kicker) {
    max-width: 590px;
    margin-bottom: 2rem;
    color: var(--muted);
    font-size: clamp(1rem, 1.5vw, 1.16rem);
    line-height: 1.75;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .hero-panel {
    display: grid;
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.34);
  }

  .hero-panel div {
    background: rgba(16, 16, 15, 0.82);
    backdrop-filter: blur(16px);
    padding: 1.2rem;
  }

  .hero-panel span,
  .card-label,
  .price-row span {
    display: block;
    color: var(--dim);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .hero-panel strong {
    display: block;
    margin-top: 0.35rem;
    color: var(--ivory);
    font-size: 1.05rem;
  }

  .section {
    position: relative;
    padding: clamp(4.5rem, 8vw, 7rem) clamp(1rem, 4vw, 3rem);
    background: var(--bg);
    isolation: isolate;
    overflow: hidden;
  }

  .section::before,
  .section::after,
  .final-cta::before,
  .final-cta::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .section::before,
  .final-cta::before {
    opacity: 0.2;
    background-image:
      radial-gradient(rgba(245, 239, 225, 0.08) 0.7px, transparent 0.7px),
      radial-gradient(rgba(214, 174, 66, 0.05) 0.6px, transparent 0.6px);
    background-position: 0 0, 14px 14px;
    background-size: 28px 28px;
    mix-blend-mode: soft-light;
  }

  .section::after,
  .final-cta::after {
    opacity: 0.35;
    background:
      linear-gradient(115deg, rgba(255, 255, 255, 0.04), transparent 24%, transparent 76%, rgba(214, 174, 66, 0.05)),
      repeating-linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0.015) 0,
        rgba(255, 255, 255, 0.015) 2px,
        transparent 2px,
        transparent 10px
      );
  }

  .container {
    position: relative;
    z-index: 1;
    width: min(1120px, 100%);
    margin: 0 auto;
  }

  .section-head {
    max-width: 680px;
    margin: 0 auto 3rem;
    text-align: center;
  }

  .section h2 {
    margin-bottom: 1rem;
    font-size: clamp(2.1rem, 4.5vw, 4rem);
    line-height: 1.02;
  }

  .section-copy,
  .section p,
  .card-copy {
    color: var(--muted);
    line-height: 1.72;
  }

  .split {
    display: grid;
    grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
    gap: clamp(2rem, 6vw, 5rem);
    align-items: start;
  }

  .problem {
    background:
      radial-gradient(circle at 82% 18%, rgba(214, 174, 66, 0.08), transparent 26%),
      linear-gradient(135deg, rgba(166, 66, 53, 0.12), transparent 38%),
      var(--bg-2);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .statement-stack {
    display: grid;
    gap: 0.8rem;
  }

  .statement-stack p {
    margin: 0;
    padding: 1.05rem 1.2rem;
    color: var(--ivory);
    background: rgba(245, 239, 225, 0.045);
    border-left: 3px solid rgba(214, 174, 66, 0.55);
  }

  .step-grid,
  .addon-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
  }

  .step-card,
  .addon-card,
  .package-card,
  .outcome-list article {
    background: var(--panel);
  }

  .step-card {
    min-height: 18rem;
    padding: 1.5rem;
  }

  .step-card span {
    display: block;
    margin-bottom: 4rem;
    color: var(--gold);
    font-family: "Playfair Display", serif;
    font-size: 2.6rem;
    font-style: italic;
  }

  .step-card h3,
  .addon-card h3,
  .package-card h3,
  .outcome-list h3 {
    margin-bottom: 0.7rem;
    color: var(--ivory);
    font-family: "Playfair Display", Georgia, serif;
    font-size: 1.35rem;
    line-height: 1.2;
  }

  .packages {
    background:
      radial-gradient(circle at 12% 22%, rgba(240, 204, 109, 0.08), transparent 22%),
      repeating-linear-gradient(
        90deg,
        rgba(245, 239, 225, 0.025) 0,
        rgba(245, 239, 225, 0.025) 1px,
        transparent 1px,
        transparent 32px
      ),
      linear-gradient(180deg, rgba(214, 174, 66, 0.06), transparent 18rem),
      var(--bg-2);
  }

  .package-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    align-items: stretch;
  }

  .package-card {
    position: relative;
    display: flex;
    min-height: 100%;
    flex-direction: column;
    gap: 1.5rem;
    padding: clamp(1.35rem, 3vw, 2rem);
    border: 1px solid var(--line);
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  }

  .package-card:hover {
    transform: translateY(-5px);
    border-color: rgba(214, 174, 66, 0.42);
  }

  .package-card.featured {
    background:
      linear-gradient(145deg, rgba(214, 174, 66, 0.16), rgba(166, 66, 53, 0.08) 42%, var(--panel));
    border-color: rgba(214, 174, 66, 0.75);
    box-shadow: 0 28px 90px rgba(214, 174, 66, 0.09);
  }

  .badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.38rem 0.62rem;
    background: rgba(214, 174, 66, 0.16);
    border: 1px solid rgba(214, 174, 66, 0.5);
    color: var(--gold-2);
    font-size: 0.66rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .package-card h3 { font-size: clamp(1.65rem, 3vw, 2.2rem); }
  .card-copy { max-width: 34rem; }

  .price-row {
    padding-top: 1.3rem;
    border-top: 1px solid var(--line);
  }

  .price-row p {
    margin-bottom: 0.25rem;
    color: var(--gold-2);
    font-family: "Playfair Display", serif;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1;
  }

  .feature-list {
    display: grid;
    gap: 0.8rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .feature-list li {
    position: relative;
    padding-left: 1.45rem;
    color: #d6ccbd;
    line-height: 1.5;
  }

  .feature-list li::before {
    content: "";
    position: absolute;
    top: 0.64rem;
    left: 0;
    width: 0.42rem;
    height: 0.42rem;
    background: var(--gold);
    transform: rotate(45deg);
  }

  .link-btn {
    width: fit-content;
    border: 0;
    padding: 0;
    background: transparent;
    color: var(--gold-2);
    cursor: pointer;
    font-size: 0.88rem;
    font-weight: 800;
  }

  .package-card .btn { width: 100%; margin-top: auto; }

  .outcomes {
    background:
      radial-gradient(circle at 88% 78%, rgba(166, 66, 53, 0.1), transparent 24%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.015), transparent 20%),
      var(--bg);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .outcome-list {
    display: grid;
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
  }

  .outcome-list article {
    padding: 1.45rem;
  }

  .addons {
    background:
      radial-gradient(circle at 18% 82%, rgba(214, 174, 66, 0.06), transparent 22%),
      repeating-linear-gradient(
        0deg,
        rgba(245, 239, 225, 0.02) 0,
        rgba(245, 239, 225, 0.02) 1px,
        transparent 1px,
        transparent 36px
      ),
      var(--bg-2);
  }

  .addon-card {
    min-height: 15rem;
    padding: 1.4rem;
  }

  .addon-card strong {
    display: block;
    margin-top: 1.5rem;
    color: var(--gold-2);
  }

  .final-cta {
    position: relative;
    padding: clamp(5rem, 9vw, 8rem) 1rem;
    text-align: center;
    background:
      radial-gradient(circle at 50% 18%, rgba(245, 239, 225, 0.06), transparent 18%),
      linear-gradient(135deg, rgba(214, 174, 66, 0.12), transparent 30%),
      linear-gradient(315deg, rgba(166, 66, 53, 0.16), transparent 36%),
      #0d0c0a;
    isolation: isolate;
    overflow: hidden;
  }

  .final-cta > div {
    position: relative;
    z-index: 1;
    width: min(760px, 100%);
    margin: 0 auto;
  }

  .final-cta h2 {
    margin-bottom: 1rem;
    font-family: "Playfair Display", serif;
    font-size: clamp(2.4rem, 6vw, 5rem);
    line-height: 0.98;
  }

  .final-cta p:not(.kicker) {
    margin-bottom: 2rem;
    color: var(--muted);
  }

  footer {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 2rem clamp(1rem, 4vw, 3rem);
    border-top: 1px solid var(--line);
    background: #070706;
    color: var(--dim);
  }

  footer p {
    margin: 0;
    color: var(--gold-2);
    font-family: "Playfair Display", serif;
  }

  .reveal {
    opacity: 0;
    transform: translateY(1.4rem);
    transition: opacity 0.62s ease, transform 0.62s ease;
  }

  .reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  @keyframes heroIn {
    from { opacity: 0; transform: translateY(1.25rem); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 920px) {
    .nav { padding: 0.8rem 1rem; }
    .nav-links a { display: none; }
    .nav-links .btn { min-height: 2.45rem; padding: 0.68rem 0.86rem; font-size: 0.68rem; }
    .hero { min-height: auto; padding-top: 8rem; }
    .hero-inner,
    .split,
    .package-grid {
      grid-template-columns: 1fr;
    }
    .hero-panel { max-width: 34rem; }
    .step-grid,
    .addon-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 620px) {
    h1 { font-size: clamp(3rem, 18vw, 4.8rem); }
    .hero {
      padding-inline: 1rem;
      padding-bottom: 2rem;
    }
    .hero-overlay {
      background:
        linear-gradient(180deg, rgba(9, 9, 8, 0.74), rgba(9, 9, 8, 0.96) 54%, rgba(9, 9, 8, 1)),
        linear-gradient(90deg, rgba(9, 9, 8, 0.95), rgba(9, 9, 8, 0.48));
    }
    .hero-media img { object-position: 58% center; }
    .hero-actions,
    .hero-actions .btn {
      width: 100%;
    }
    .hero-panel div { padding: 1rem; }
    .section-head { text-align: left; }
    .step-grid,
    .addon-grid {
      grid-template-columns: 1fr;
    }
    .step-card { min-height: 13rem; }
    .step-card span { margin-bottom: 2rem; }
    .badge {
      position: static;
      width: fit-content;
      margin-bottom: -0.4rem;
    }
    footer { flex-direction: column; }
  }
`;
