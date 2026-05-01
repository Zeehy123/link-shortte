import { useState } from "react";
// import { api } from "../api";

const steps = ["details", "options", "success"];

const inputStyle = (focused) => ({
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
});

const labelStyle = {
  display: "block",
  fontSize: "11px",
  color: "#8fa3be",
  marginBottom: "6px",
  fontFamily: "'Inter', sans-serif",
  letterSpacing: "0.3px",
};

export default function CreateLinkModal({ onClose, onCreated }) {
  const [step, setStep] = useState(0); // 0=details, 1=options, 2=success
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!url.trim()) return;
    setLoading(true);
    try {
      const data = await api.createLink({
        original_url: url,
        title: title || undefined,
        short_code: customCode || undefined,
        expires_at: expiry || undefined,
      });
      setResult(data);
      onCreated?.(data);
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(result.short_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#0d1525",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: "3px",
            background: "linear-gradient(90deg, #00d4ff, #a855f7, #00d4ff)",
            backgroundSize: "200% 100%",
          }}
        />

        {/* Header */}
        <div
          style={{
            padding: "20px 24px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "48px",
                height: "28px",
                borderRadius: "8px",
                background: "rgba(0,212,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 14 14">
                <path
                  d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5l1-1"
                  stroke="#00d4ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M4.5 7.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5l-1 1"
                  stroke="#00d4ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#e8edf5",
              }}
            >
              {step === 2 ? "Link Created!" : "Create Short Link"}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "28px",
              height: "78px",
              borderRadius: "7px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#3d4f67",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all .15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#e8edf5";
              e.currentTarget.style.background = "rgba(255,255,255,0.09)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#3d4f67";
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 14 14">
              <path
                d="M2 2l10 10M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Step indicators (only for form steps) */}
        {step < 2 && (
          <div
            style={{
              padding: "14px 24px 0",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {["Details", "Options"].map((label, i) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      background:
                        i === step
                          ? "#00d4ff"
                          : i < step
                            ? "rgba(0,212,255,0.2)"
                            : "rgba(255,255,255,0.07)",
                      color:
                        i === step
                          ? "#060a14"
                          : i < step
                            ? "#00d4ff"
                            : "#3d4f67",
                      transition: "all .2s",
                    }}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: i === step ? "#e8edf5" : "#3d4f67",
                      fontFamily: "'Inter', sans-serif",
                      transition: "color .2s",
                    }}
                  >
                    {label}
                  </span>
                </div>
                {i < 1 && (
                  <div
                    style={{
                      width: "32px",
                      height: "1px",
                      background:
                        i < step ? "#00d4ff" : "rgba(255,255,255,0.08)",
                      transition: "background .2s",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ padding: "18px 24px 24px" }}>
          {/* ── Step 0: Details ── */}
          {step === 0 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <div>
                <label style={labelStyle}>
                  Destination URL <span style={{ color: "#f87171" }}>*</span>
                </label>
                <input
                  type="url"
                  placeholder="https://your-very-long-url.com/path"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  autoFocus
                  required
                  style={inputStyle(focused === "url")}
                  onFocus={() => setFocused("url")}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <div>
                <label style={labelStyle}>
                  Label{" "}
                  <span style={{ color: "#3d4f67", fontStyle: "italic" }}>
                    (optional)
                  </span>
                </label>
                <input
                  placeholder="e.g. Blog Post, Q4 Report…"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={inputStyle(focused === "title")}
                  onFocus={() => setFocused("title")}
                  onBlur={() => setFocused(null)}
                />
              </div>
              {error && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#f87171",
                    background: "rgba(248,113,113,0.08)",
                    border: "1px solid rgba(248,113,113,0.2)",
                    borderRadius: "9px",
                    padding: "10px 14px",
                  }}
                >
                  {error}
                </div>
              )}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginTop: "4px",
                }}
              >
                <button
                  onClick={onClose}
                  style={{
                    padding: "11px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    color: "#8fa3be",
                    fontSize: "13px",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    transition: "all .15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "#e8edf5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "#8fa3be";
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (url.trim()) setStep(1);
                  }}
                  style={{
                    padding: "11px",
                    borderRadius: "10px",
                    border: "none",
                    background: url.trim()
                      ? "linear-gradient(135deg,#00d4ff,#0099cc)"
                      : "rgba(255,255,255,0.08)",
                    color: url.trim() ? "#060a14" : "#3d4f67",
                    fontSize: "13px",
                    cursor: url.trim() ? "pointer" : "default",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    transition: "all .2s",
                  }}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 1: Options ── */}
          {step === 1 && (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {/* URL preview */}
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg width="12" height="12" fill="none" viewBox="0 0 14 14">
                  <path
                    d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5l1-1"
                    stroke="#3d4f67"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.5 7.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5l-1 1"
                    stroke="#3d4f67"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#5a7294",
                    fontFamily: "'Inter', sans-serif",
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {url}
                </span>
              </div>

              <div>
                <label style={labelStyle}>Custom Short Code</label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "11px",
                      color: "#3d4f67",
                      fontFamily: "'JetBrains Mono', monospace",
                      pointerEvents: "none",
                    }}
                  >
                    lnkr.d/
                  </span>
                  <input
                    placeholder="my-link"
                    value={customCode}
                    onChange={(e) =>
                      setCustomCode(
                        e.target.value.replace(/[^a-zA-Z0-9-_]/g, ""),
                      )
                    }
                    style={{
                      ...inputStyle(focused === "code"),
                      paddingLeft: "60px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                    }}
                    onFocus={() => setFocused("code")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <p
                  style={{
                    fontSize: "10px",
                    color: "#3d4f67",
                    marginTop: "4px",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Leave empty to auto-generate
                </p>
              </div>

              <div>
                <label style={labelStyle}>Expiry Date</label>
                <input
                  type="date"
                  value={expiry}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setExpiry(e.target.value)}
                  style={{
                    ...inputStyle(focused === "expiry"),
                    colorScheme: "dark",
                  }}
                  onFocus={() => setFocused("expiry")}
                  onBlur={() => setFocused(null)}
                />
                <p
                  style={{
                    fontSize: "10px",
                    color: "#3d4f67",
                    marginTop: "4px",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Link will stop working after this date
                </p>
              </div>

              {error && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#f87171",
                    background: "rgba(248,113,113,0.08)",
                    border: "1px solid rgba(248,113,113,0.2)",
                    borderRadius: "9px",
                    padding: "10px 14px",
                  }}
                >
                  {error}
                </div>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginTop: "4px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  style={{
                    padding: "11px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    color: "#8fa3be",
                    fontSize: "13px",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "11px",
                    borderRadius: "10px",
                    border: "none",
                    background: loading
                      ? "rgba(0,212,255,0.3)"
                      : "linear-gradient(135deg,#00d4ff,#0099cc)",
                    color: "#060a14",
                    fontSize: "13px",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {loading ? "Creating…" : "Create Link"}
                </button>
              </div>
            </form>
          )}

          {/* ── Step 2: Success ── */}
          {step === 2 && result && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Success icon */}
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "rgba(52,211,153,0.1)",
                    border: "1px solid rgba(52,211,153,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                  }}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M4 10l4 4 8-8"
                      stroke="#34d399"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "#e8edf5",
                    marginBottom: "4px",
                  }}
                >
                  Your link is live!
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#3d4f67",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Share it anywhere — every click is tracked
                </p>
              </div>

              {/* Short URL + copy */}
              <div
                style={{
                  background: "rgba(0,212,255,0.06)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#3d4f67",
                      marginBottom: "3px",
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: "0.08em",
                    }}
                  >
                    SHORT LINK
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#00d4ff",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {result.short_url}
                  </p>
                </div>
                <button
                  onClick={copy}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "9px",
                    border: "none",
                    background: copied ? "rgba(52,211,153,0.15)" : "#00d4ff",
                    color: copied ? "#34d399" : "#060a14",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    transition: "all .2s",
                    flexShrink: 0,
                  }}
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>

              {/* QR Code */}
              <div
                style={{
                  background: "white",
                  borderRadius: "14px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(result.short_url)}&size=160x160&bgcolor=ffffff&color=060a14`}
                  alt="QR Code"
                  width={160}
                  height={160}
                  style={{ display: "block", borderRadius: "6px" }}
                />
                <p
                  style={{
                    fontSize: "11px",
                    color: "#8fa3be",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Right-click to save the QR code
                </p>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => {
                    setStep(0);
                    setUrl("");
                    setTitle("");
                    setCustomCode("");
                    setExpiry("");
                    setResult(null);
                  }}
                  style={{
                    padding: "11px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    color: "#8fa3be",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Create Another
                </button>
                <button
                  onClick={onClose}
                  style={{
                    padding: "11px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(135deg,#00d4ff,#0099cc)",
                    color: "#060a14",
                    fontSize: "13px",
                    cursor: "pointer",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
