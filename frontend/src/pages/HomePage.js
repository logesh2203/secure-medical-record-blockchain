import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <style>
        {`
          .home-page {
            min-height: 100vh;
            background:
              radial-gradient(circle at top left, rgba(59, 130, 246, 0.14), transparent 32%),
              radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.16), transparent 28%),
              linear-gradient(180deg, #f8fbff 0%, #eef4f7 100%);
            color: #102033;
          }

          .home-shell {
            width: min(1120px, calc(100% - 32px));
            margin: 0 auto;
          }

          .home-navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 22px 0;
          }

          .home-logo {
            font-size: 1.2rem;
            font-weight: 800;
            letter-spacing: 0.02em;
            color: #0f172a;
            text-decoration: none;
          }

          .home-nav-actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }

          .home-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 12px 20px;
            border-radius: 999px;
            border: 1px solid #cbd5e1;
            background: #ffffff;
            color: #0f172a;
            text-decoration: none;
            font-weight: 700;
            transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
          }

          .home-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 16px 36px rgba(15, 23, 42, 0.1);
          }

          .home-btn.primary {
            border-color: #0f766e;
            background: linear-gradient(135deg, #0f766e 0%, #0891b2 100%);
            color: #ffffff;
          }

          .hero-section {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 32px;
            align-items: center;
            padding: 48px 0 72px;
          }

          .hero-card,
          .info-card,
          .feature-card {
            background: rgba(255, 255, 255, 0.88);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 24px;
            box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
            backdrop-filter: blur(8px);
          }

          .hero-copy {
            padding: 32px;
          }

          .hero-eyebrow {
            display: inline-flex;
            padding: 8px 14px;
            border-radius: 999px;
            background: rgba(14, 116, 144, 0.1);
            color: #0f766e;
            font-size: 0.9rem;
            font-weight: 700;
            letter-spacing: 0.03em;
          }

          .hero-title {
            margin: 18px 0 14px;
            font-size: clamp(2.2rem, 4vw, 4.2rem);
            line-height: 1.08;
            color: #0f172a;
          }

          .hero-subtitle {
            margin: 0;
            max-width: 640px;
            font-size: 1.05rem;
            line-height: 1.75;
            color: #475569;
          }

          .hero-actions {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
            margin-top: 28px;
          }

          .hero-panel {
            padding: 28px;
          }

          .hero-panel-grid {
            display: grid;
            gap: 16px;
          }

          .hero-stat {
            padding: 18px;
            border-radius: 18px;
            background: linear-gradient(135deg, rgba(14, 116, 144, 0.08), rgba(15, 118, 110, 0.14));
          }

          .hero-stat h3 {
            margin: 0 0 8px;
            font-size: 1rem;
            color: #0f172a;
          }

          .hero-stat p {
            margin: 0;
            color: #475569;
            line-height: 1.6;
          }

          .section-block {
            padding: 24px 0 72px;
          }

          .section-header {
            max-width: 760px;
            margin-bottom: 28px;
          }

          .section-label {
            display: inline-block;
            margin-bottom: 10px;
            color: #0f766e;
            font-weight: 700;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            font-size: 0.82rem;
          }

          .section-header h2 {
            margin: 0 0 10px;
            font-size: clamp(1.8rem, 2.8vw, 2.8rem);
            color: #0f172a;
          }

          .section-header p {
            margin: 0;
            color: #475569;
            line-height: 1.75;
          }

          .about-grid,
          .feature-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
          }

          .info-card,
          .feature-card {
            padding: 24px;
          }

          .info-card h3,
          .feature-card h3 {
            margin: 0 0 12px;
            color: #0f172a;
          }

          .info-card p,
          .feature-card p {
            margin: 0;
            color: #475569;
            line-height: 1.75;
          }

          .feature-icon {
            width: 48px;
            height: 48px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 14px;
            margin-bottom: 16px;
            font-weight: 800;
            color: #0f766e;
            background: rgba(15, 118, 110, 0.12);
          }

          .home-footer {
            padding: 28px 0 36px;
            border-top: 1px solid rgba(148, 163, 184, 0.25);
            color: #64748b;
            text-align: center;
          }

          @media (max-width: 900px) {
            .hero-section,
            .about-grid,
            .feature-grid {
              grid-template-columns: 1fr;
            }

            .home-navbar {
              gap: 18px;
              flex-direction: column;
              align-items: flex-start;
            }
          }

          @media (max-width: 640px) {
            .home-shell {
              width: min(100% - 24px, 1120px);
            }

            .hero-copy,
            .hero-panel,
            .info-card,
            .feature-card {
              padding: 20px;
            }

            .hero-actions,
            .home-nav-actions {
              width: 100%;
            }

            .home-btn {
              width: 100%;
            }
          }
        `}
      </style>

      <div className="home-page">
        <div className="home-shell">
          <nav className="home-navbar">
            <Link to="/" className="home-logo">
              MedChain Secure
            </Link>
            <div className="home-nav-actions">
              
            </div>
          </nav>

          <section className="hero-section">
            <div className="hero-card hero-copy">
              <span className="hero-eyebrow">Blockchain Healthcare Platform</span>
              <h1 className="hero-title">Secure Medical Record System using Blockchain</h1>
              <p className="hero-subtitle">Privacy-first decentralized healthcare data management</p>
              <div className="hero-actions">
                <Link to="/login" className="home-btn primary">
                  Login
                </Link>
                <Link to="/signup" className="home-btn">
                  Sign Up
                </Link>
              </div>
            </div>

            <div className="hero-card hero-panel">
              <div className="hero-panel-grid">
                <div className="hero-stat">
                  <h3>Encrypted trust layer</h3>
                  <p>Blockchain-backed permissions help protect medical records from unauthorized changes and silent tampering.</p>
                </div>
                <div className="hero-stat">
                  <h3>Patient-led consent</h3>
                  <p>Patients decide which hospital can access their files, creating a transparent and accountable permission flow.</p>
                </div>
                <div className="hero-stat">
                  <h3>Hospital-based access</h3>
                  <p>Doctors can only view records when their registered hospital has active on-chain approval from the patient.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="section-block">
            <div className="section-header">
              <span className="section-label">About</span>
              <h2>Built for privacy, integrity, and real clinical control</h2>
              <p>
                This system combines MERN and blockchain to give healthcare teams a secure workflow while keeping the patient in control of hospital access and record visibility.
              </p>
            </div>

            <div className="about-grid">
              <article className="info-card">
                <h3>Blockchain security</h3>
                <p>Access decisions are anchored on-chain, helping preserve an auditable and tamper-resistant record of who is allowed to view protected files.</p>
              </article>
              <article className="info-card">
                <h3>Patient-controlled access</h3>
                <p>Patients grant and revoke permission directly, ensuring healthcare data remains governed by explicit consent instead of broad implicit sharing.</p>
              </article>
              <article className="info-card">
                <h3>Hospital-based permission system</h3>
                <p>Each doctor is tied to a hospital identity, and record access is validated against the hospital approved by the patient before files are shown.</p>
              </article>
            </div>
          </section>

          <section className="section-block">
            <div className="section-header">
              <span className="section-label">Features</span>
              <h2>Core capabilities for trusted medical record sharing</h2>
              <p>Designed to keep healthcare records available to the right institution, while denying access everywhere else.</p>
            </div>

            <div className="feature-grid">
              <article className="feature-card">
                <div className="feature-icon">01</div>
                <h3>Secure Storage</h3>
                <p>Medical documents are managed through a protected workflow built to reduce exposure and strengthen confidence in sensitive data handling.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">02</div>
                <h3>Access Control</h3>
                <p>Only hospitals explicitly approved by the patient can view available records, helping enforce strict permission boundaries.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">03</div>
                <h3>Tamper Proof</h3>
                <p>On-chain access validation improves traceability and helps reveal unauthorized permission changes before records are exposed.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">04</div>
                <h3>Decentralized</h3>
                <p>Blockchain coordination reduces dependence on a single trust point and supports a more resilient medical data-sharing model.</p>
              </article>
            </div>
          </section>

          <footer className="home-footer">
            <p>© 2026 Secure Medical Record System using Blockchain. Privacy-first healthcare access management.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default HomePage;
