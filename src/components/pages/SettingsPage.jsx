import { useState } from "react";

import { MOCK_USER } from "../data/mockData";

const S = {
  card: {
    background: "#0f1828",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "22px 24px",
  },
  input: (focused) => ({
    width: "100%",
    boxSizing: "border-box",
    background: focused ? "rgba(0,212,255,0.04)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${focused ? "rgba(0,212,255,0.35)" : "rgba(255,255,255,0.08)"}`,
    boxShadow: focused ? "0 0 0 3px rgba(0,212,255,0.07)" : "none",
    borderRadius: "10px",
    padding: "10px 14px",
    color: "#e8edf5",
    fontSize: "13px",
    outline: "none",
    fontFamily: "'Inter', sans-serif",
    transition: "all .2s",
  }),
  label: {
    fontSize: "11px",
    color: "#8fa3be",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "0.3px",
    marginBottom: "6px",
    display: "block",
  },
  hint: {
    fontSize: "10px",
    color: "#3d4f67",
    fontFamily: "'Inter', sans-serif",
    marginTop: "3px",
  },
  sectionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: "15px",
    color: "#e8edf5",
    marginBottom: "18px",
    paddingBottom: "14px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
};

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: "40px",
        height: "22px",
        borderRadius: "99px",
        border: "none",
        cursor: "pointer",
        background: on ? "#00d4ff" : "rgba(255,255,255,0.1)",
        position: "relative",
        transition: "background .2s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: "3px",
          left: on ? "21px" : "3px",
          transition: "left .2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
}

function GhostBtn({ children, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: "9px",
        background: danger
          ? "rgba(248,113,113,0.07)"
          : "rgba(255,255,255,0.05)",
        border: `1px solid ${danger ? "rgba(248,113,113,0.2)" : "rgba(255,255,255,0.08)"}`,
        color: danger ? "#f87171" : "#8fa3be",
        fontSize: "12px",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        transition: "all .15s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = danger
          ? "rgba(248,113,113,0.14)"
          : "rgba(255,255,255,0.09)";
        e.currentTarget.style.color = danger ? "#fca5a5" : "#e8edf5";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = danger
          ? "rgba(248,113,113,0.07)"
          : "rgba(255,255,255,0.05)";
        e.currentTarget.style.color = danger ? "#f87171" : "#8fa3be";
      }}
    >
      {children}
    </button>
  );
}

export default function SettingsPage() {
  const [name, setName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [saved, setSaved] = useState(false);
  const [focused, setFocused] = useState(null);
  const [twoFA, setTwoFA] = useState(false);
  const [notifs, setNotifs] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);

  const save = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const copyKey = async () => {
    await navigator.clipboard.writeText("lnkrd_sk_real_key_here");
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#060a14" }}>
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.018) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "32px 24px",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Page header */}
        <div style={{ marginBottom: "8px" }}>
          <p
            style={{
              fontSize: "10px",
              color: "#3d4f67",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.1em",
              marginBottom: "4px",
            }}
          >
            ACCOUNT
          </p>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "26px",
              color: "#e8edf5",
              letterSpacing: "-0.5px",
              lineHeight: 1,
            }}
          >
            Settings
          </h1>
        </div>

        {/* ── Profile ── */}
        <div style={S.card}>
          <p style={S.sectionTitle}>Profile</p>

          {/* Avatar row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "rgba(168,85,247,0.15)",
                border: "2px solid rgba(168,85,247,0.3)",
                color: "#a855f7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {MOCK_USER.avatar}
            </div>
            <div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#e8edf5",
                  fontFamily: "'Syne', sans-serif",
                  marginBottom: "2px",
                }}
              >
                {name}
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: "#3d4f67",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {email}
              </p>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <GhostBtn>Change Avatar</GhostBtn>
            </div>
          </div>

          <form
            onSubmit={save}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <div>
                <label style={S.label}>Display Name</label>
                <input
                  style={S.input(focused === "name")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <div>
                <label style={S.label}>Email Address</label>
                <input
                  style={S.input(focused === "email")}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                />
                <p style={S.hint}>Used for login & notifications</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="submit"
                style={{
                  padding: "9px 20px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  background: saved
                    ? "rgba(52,211,153,0.15)"
                    : "linear-gradient(135deg,#00d4ff,#0099cc)",
                  color: saved ? "#34d399" : "#060a14",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  transition: "all .2s",
                }}
              >
                {saved ? "✓ Saved" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* ── Plan & Billing ── */}
        <div style={S.card}>
          <p style={S.sectionTitle}>Plan & Billing</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "4px",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#e8edf5",
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  Pro Plan
                </p>
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "'JetBrains Mono', monospace",
                    padding: "2px 8px",
                    borderRadius: "99px",
                    background: "rgba(0,212,255,0.1)",
                    color: "#00d4ff",
                    border: "1px solid rgba(0,212,255,0.2)",
                  }}
                >
                  Active
                </span>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#3d4f67",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Unlimited links · Advanced analytics · Custom domains
              </p>
            </div>
            <GhostBtn>Manage Plan</GhostBtn>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "10px",
            }}
          >
            {[
              ["Links Used", "5 / ∞"],
              ["Clicks / Month", "5,798"],
              ["Next Billing", "May 1, 2026"],
            ].map(([l, v]) => (
              <div
                key={l}
                style={{
                  background: "#0d1525",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "10px",
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    color: "#3d4f67",
                    marginBottom: "5px",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {l}
                </p>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#e8edf5",
                  }}
                >
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Security ── */}
        <div style={S.card}>
          <p style={S.sectionTitle}>Security</p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {[
              {
                label: "Password",
                hint: "Last changed 30 days ago",
                action: <GhostBtn>Change Password</GhostBtn>,
              },
              {
                label: "Two-Factor Authentication",
                hint: twoFA
                  ? "Your account is protected with 2FA"
                  : "Add an extra layer of security",
                action: (
                  <Toggle on={twoFA} onToggle={() => setTwoFA((v) => !v)} />
                ),
              },
              {
                label: "Email Notifications",
                hint: "Receive click alerts and reports",
                action: (
                  <Toggle on={notifs} onToggle={() => setNotifs((v) => !v)} />
                ),
              },
            ]
              .map(({ label, hint, action }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#e8edf5",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        marginBottom: "2px",
                      }}
                    >
                      {label}
                    </p>
                    <p style={S.hint}>{hint}</p>
                  </div>
                  {action}
                </div>
              ))
              .map((el, i, arr) =>
                i === arr.length - 1 ? (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    {el.props.children}
                  </div>
                ) : (
                  el
                ),
              )}
          </div>
        </div>

        {/* ── API ── */}
        <div style={S.card}>
          <p style={S.sectionTitle}>API Access</p>
          <label style={S.label}>API Key</label>
          <p style={{ ...S.hint, marginBottom: "10px", marginTop: "-2px" }}>
            Use this key to authenticate API requests from your apps
          </p>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                padding: "10px 14px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#8fa3be",
                letterSpacing: "0.05em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {revealed
                ? "lnkrd_sk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4"
                : "lnkrd_sk_••••••••••••••••••••••••••••••"}
            </div>
            <GhostBtn onClick={() => setRevealed((v) => !v)}>
              {revealed ? "Hide" : "Reveal"}
            </GhostBtn>
            <GhostBtn onClick={copyKey}>
              {keyCopied ? "✓ Copied" : "Copy"}
            </GhostBtn>
          </div>
          <div
            style={{
              marginTop: "12px",
              padding: "10px 14px",
              background: "rgba(0,212,255,0.04)",
              border: "1px solid rgba(0,212,255,0.1)",
              borderRadius: "9px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                color: "#8fa3be",
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.6,
              }}
            >
              <span
                style={{
                  color: "#00d4ff",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                POST
              </span>{" "}
              requests to{" "}
              <span
                style={{
                  color: "#00d4ff",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                api.linker.d/v1/links
              </span>{" "}
              with{" "}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#a78bfa",
                }}
              >
                Authorization: Bearer &lt;key&gt;
              </span>
            </p>
          </div>
        </div>

        {/* ── Danger Zone ── */}
        <div
          style={{
            ...S.card,
            border: "1px solid rgba(248,113,113,0.15)",
            background: "rgba(248,113,113,0.03)",
          }}
        >
          <p
            style={{
              ...S.sectionTitle,
              color: "#fca5a5",
              borderColor: "rgba(248,113,113,0.15)",
            }}
          >
            Danger Zone
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                border: "1px solid rgba(248,113,113,0.12)",
                borderRadius: "12px",
                background: "rgba(248,113,113,0.04)",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#fca5a5",
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif",
                    marginBottom: "2px",
                  }}
                >
                  Export All Data
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#3d4f67",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Download a copy of your links and analytics
                </p>
              </div>
              <GhostBtn danger={false}>Export</GhostBtn>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                border: "1px solid rgba(248,113,113,0.2)",
                borderRadius: "12px",
                background: "rgba(248,113,113,0.06)",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#f87171",
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif",
                    marginBottom: "2px",
                  }}
                >
                  Delete Account
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#3d4f67",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Permanently delete your account and all data. This cannot be
                  undone.
                </p>
              </div>
              <GhostBtn danger>Delete</GhostBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
