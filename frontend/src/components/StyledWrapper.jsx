import styled from "styled-components";

export const StyledWrapper = styled.div`
  /* ====== GLOBAL THEME ====== */
  --bg1: #080a0c;
  --bg2: #0d1116;
  --panel: #11161c;
  --border: rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.15);
  --text: rgba(255,255,255,0.9);
  --muted: rgba(255,255,255,0.6);

  min-height: 100vh;
  padding: 60px 20px;
  color: var(--text);

  background:
    radial-gradient(900px 500px at 20% 10%, rgba(255,255,255,0.06), transparent 60%),
    radial-gradient(800px 400px at 80% 60%, rgba(255,255,255,0.05), transparent 60%),
    linear-gradient(180deg, var(--bg1), var(--bg2));

  display: flex;
  justify-content: center;
  align-items: flex-start;

  font-family: 'VT323', monospace;

  /* ====== TILE ====== */
  .tile {
    background: linear-gradient(180deg, #0f141a, #0c1015);
    border: 1px solid var(--border);
    border-radius: 22px;
    box-shadow:
      0 25px 60px rgba(0,0,0,0.6),
      inset 0 1px 0 rgba(255,255,255,0.04);
  }

  .tile-pad {
    padding: 28px;
  }

  /* ====== AUTH FORM ====== */
  .auth-box {
    width: 380px;
  }

  .auth-title {
    font-family: 'Press Start 2P', monospace;
    font-size: 13px;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  .auth-sub {
    color: var(--muted);
    margin-bottom: 18px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .input {
    font-family: 'Press Start 2P', monospace;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 12px 14px;
    color: var(--text);
    font-size: 10px;
  }

  .input:focus {
    outline: none;
    border: 1px solid var(--border-strong);
  }

  .btn {
    font-family: 'Press Start 2P', monospace;
    margin-top: 12px;
    padding: 12px;
    border-radius: 14px;
    border: 1px solid var(--border-strong);
    background: rgba(255,255,255,0.06);
    color: var(--text);
    cursor: pointer;
    font-size: 12px;
  }

  .btn:hover {
    background: rgba(255,255,255,0.1);
  }

  .auth-footer {
    margin-top: 18px;
    color: var(--muted);
  }

  .auth-footer a {
    color: var(--text);
    text-decoration: none;
    border-bottom: 1px dotted rgba(255,255,255,0.4);
  }

  /* ====== DASHBOARD ====== */
  .dashboard {
    width: min(1000px, 95vw);
  }

  .dash-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
  }

  .dash-title {
    font-family: 'Press Start 2P', monospace;
    font-size: 13px;
  }

  .dash-grid {
    display: grid;
    gap: 18px;
  }

  @media (min-width: 860px) {
    .dash-grid {
      grid-template-columns: 380px 1fr;
    }
  }

  .section-title {
    font-family: 'Press Start 2P', monospace;
    font-size: 11px;
    margin-bottom: 16px;
  }

  .post-card {
    padding: 16px;
    border-bottom: 1px solid var(--border);

  }

  .post-card:last-child {
    border-bottom: none;
  }

  .post-name {
    font-size: 18px;
  }

  .post-meta {
    color: var(--muted);
    margin-top: 6px;
  }

  .action-row {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .small-btn {
    font-family: 'Press Start 2P', monospace;
    font-size: 8px;
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid var(--border-strong);
    background: rgba(255,255,255,0.06);
    color: var(--text);
    cursor: pointer;
  }

  .small-btn:hover {
    background: rgba(255,255,255,0.12);
  }
`;
