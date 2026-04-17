import { useState } from "react";

const FLOATING_LINKS = [
  { code: "lnkr.d/pitch-v2", clicks: "3,107", label: "Pitch Deck", up: true },
  { code: "lnkr.d/gh-docs", clicks: "1,284", label: "GitHub Docs", up: true },
  { code: "lnkr.d/figma-ds", clicks: "892", label: "Design System", up: false },
];

export default function AuthPage({ onAuth }) {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth();
    }, 900);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#060a14",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Left panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "-40px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "#00d4ff",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 14 14">
              <path
                d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5l1-1"
                stroke="#060a14"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <path
                d="M4.5 7.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5l-1 1"
                stroke="#060a14"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              color: "#e8edf5",
            }}
          >
            LinkerD
          </span>
        </div>

        {/* Hero */}
        <div style={{ position: "relative" }}>
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px,3.5vw,46px)",
              color: "#e8edf5",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              marginBottom: "16px",
            }}
          >
            One link.
            <br />
            <span style={{ color: "#00d4ff" }}>All the data.</span>
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "#8fa3be",
              lineHeight: 1.6,
              maxWidth: "340px",
            }}
          >
            Shorten, share, and track every click — location, device, time, all
            in one clean dashboard.
          </p>

          <div
            style={{
              marginTop: "36px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {FLOATING_LINKS.map((link, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "rgba(15,24,40,0.85)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  backdropFilter: "blur(8px)",
                  animation: `floatIn 0.5s ease ${i * 0.12}s both`,
                }}
              >
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: link.up ? "#34d399" : "#f87171",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                    color: "#00d4ff",
                    flex: 1,
                  }}
                >
                  {link.code}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#3d4f67",
                    marginRight: "6px",
                  }}
                >
                  {link.label}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#e8edf5",
                  }}
                >
                  {link.clicks}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: link.up ? "#34d399" : "#f87171",
                  }}
                >
                  {link.up ? "↑" : "↓"}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "28px", display: "flex", gap: "32px" }}>
            {[
              ["5,798", "clicks today"],
              ["99.9%", "uptime"],
              ["< 50ms", "redirect"],
            ].map(([v, l]) => (
              <div key={l}>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "17px",
                    color: "#e8edf5",
                  }}
                >
                  {v}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#3d4f67",
                    marginTop: "2px",
                  }}
                >
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: "11px", color: "#3d4f67", position: "relative" }}>
          Trusted by developers & marketers worldwide
        </p>
      </div>

      {/* Right panel */}
      <div
        style={{
          width: "440px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 44px",
          background: "#08111e",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "22px",
              color: "#e8edf5",
              marginBottom: "6px",
            }}
          >
            {tab === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p style={{ fontSize: "13px", color: "#8fa3be" }}>
            {tab === "login"
              ? "Sign in to access your dashboard"
              : "Start shortening and tracking in seconds"}
          </p>
        </div>

        {/* Tab toggle */}
        <div
          style={{
            display: "flex",
            background: "#0d1220",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "10px",
            padding: "4px",
            marginBottom: "26px",
          }}
        >
          {["login", "register"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setError("");
              }}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "7px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                transition: "all 0.2s",
                background: tab === t ? "#0f1828" : "transparent",
                color: tab === t ? "#e8edf5" : "#3d4f67",
                boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.3)" : "none",
              }}
            >
              {t === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {tab === "register" && (
            <Field label="Full Name" focused={focused === "name"}>
              <input
                style={inputStyle(focused === "name")}
                placeholder="Alex Okafor"
                value={name}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
          )}
          <Field label="Email Address" focused={focused === "email"}>
            <input
              style={inputStyle(focused === "email")}
              type="email"
              placeholder="you@example.com"
              value={email}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field
            label="Password"
            focused={focused === "pw"}
            right={
              tab === "login" && (
                <button
                  type="button"
                  style={{
                    fontSize: "11px",
                    color: "#00d4ff",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Forgot password?
                </button>
              )
            }
          >
            <input
              style={inputStyle(focused === "pw")}
              type="password"
              placeholder="••••••••"
              value={password}
              onFocus={() => setFocused("pw")}
              onBlur={() => setFocused(null)}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          {error && (
            <div
              style={{
                fontSize: "12px",
                color: "#f87171",
                background: "rgba(248,113,113,0.08)",
                border: "1px solid rgba(248,113,113,0.2)",
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "4px",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              background: loading
                ? "rgba(0,212,255,0.3)"
                : "linear-gradient(135deg,#00d4ff 0%,#0099cc 100%)",
              color: "#060a14",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.2px",
            }}
          >
            {loading
              ? tab === "login"
                ? "Signing in…"
                : "Creating account…"
              : tab === "login"
                ? "Sign In →"
                : "Create Account →"}
          </button>
        </form>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "22px 0",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.06)",
            }}
          />
          <span style={{ fontSize: "11px", color: "#3d4f67" }}>
            or continue with
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.06)",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          {[
            {
              label: "Google",
              icon: (
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "13px",
                    color: "#ea4335",
                  }}
                >
                  G
                </span>
              ),
            },
            {
              label: "GitHub",
              icon: (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="#8fa3be">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              ),
            },
          ].map(({ label, icon }) => (
            <button
              key={label}
              type="button"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.color = "#e8edf5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.color = "#8fa3be";
              }}
              style={{
                padding: "10px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#8fa3be",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.2s",
              }}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#3d4f67",
            marginTop: "26px",
          }}
        >
          {tab === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            onClick={() => setTab(tab === "login" ? "register" : "login")}
            style={{
              color: "#00d4ff",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {tab === "login" ? "Sign up free" : "Sign in"}
          </button>
        </p>
      </div>

      <style>{`
        @keyframes floatIn {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function Field({ label, focused, right, children }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <label
          style={{
            fontSize: "11px",
            color: focused ? "#00d4ff" : "#8fa3be",
            transition: "color 0.2s",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.3px",
          }}
        >
          {label}
        </label>
        {right}
      </div>
      {children}
    </div>
  );
}

function inputStyle(focused) {
  return {
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
    transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
  };
}
