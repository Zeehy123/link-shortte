import { useState } from "react";
import CreateLinkModal from "./CreateLinkModal";
import { MOCK_LINKS } from "../data/mockData";

// LinksPage: displays and manages the user's shortened links.
// - Provides search, filter, sort, and actions (copy, QR, analytics, toggle, delete).
// - Uses local mock data for demo purposes.

const S = {
  card: {
    background: "#0f1828",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
  },
  badge: (type) =>
    ({
      active: {
        background: "rgba(52,211,153,0.1)",
        color: "#34d399",
        border: "1px solid rgba(52,211,153,0.2)",
      },
      expired: {
        background: "rgba(248,113,113,0.1)",
        color: "#f87171",
        border: "1px solid rgba(248,113,113,0.2)",
      },
      inactive: {
        background: "rgba(61,79,103,0.2)",
        color: "#3d4f67",
        border: "1px solid rgba(61,79,103,0.3)",
      },
    })[type],
};

function StatusBadge({ active, expired }) {
  const type = expired ? "expired" : active ? "active" : "inactive";
  const label = expired ? "Expired" : active ? "Active" : "Inactive";
  return (
    <span
      style={{
        ...S.badge(type),
        padding: "2px 8px",
        borderRadius: "99px",
        fontSize: "10px",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {label}
    </span>
  );
}

function QRModal({ link, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          ...S.card,
          width: "260px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              color: "#e8edf5",
            }}
          >
            QR Code
          </p>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#3d4f67",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div
          style={{
            background: "white",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "12px",
          }}
        >
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(`https://${link.short_url}`)}&size=180x180&bgcolor=ffffff&color=060a14`}
            alt="QR"
            width={180}
            height={180}
            style={{ display: "block", margin: "0 auto" }}
          />
        </div>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: "#00d4ff",
            marginBottom: "4px",
          }}
        >
          {link.short_url}
        </p>
        <p style={{ fontSize: "10px", color: "#3d4f67", marginBottom: "14px" }}>
          Right-click to save image
        </p>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "9px",
            borderRadius: "9px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#8fa3be",
            fontSize: "12px",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function ActionBtn({ onClick, title, children, danger, accent }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "7px",
        border: "none",
        background: "rgba(255,255,255,0.04)",
        color: "#3d4f67",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all .15s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = danger
          ? "rgba(248,113,113,0.12)"
          : accent
            ? "rgba(0,212,255,0.12)"
            : "rgba(255,255,255,0.09)";
        e.currentTarget.style.color = danger
          ? "#f87171"
          : accent
            ? "#00d4ff"
            : "#e8edf5";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.color = "#3d4f67";
      }}
    >
      {children}
    </button>
  );
}

export default function LinksPage({ onAnalytics }) {
  const [links, setLinks] = useState(MOCK_LINKS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [qrLink, setQrLink] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [sortBy, setSortBy] = useState("clicks");

  const now = new Date();
  const isExpired = (l) => l.expires_at && new Date(l.expires_at) < now;

  const filtered = links
    .filter((l) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        l.title?.toLowerCase().includes(q) ||
        l.short_code.toLowerCase().includes(q) ||
        l.original_url.toLowerCase().includes(q);
      const matchFilter =
        filter === "all" ||
        (filter === "active" && l.is_active && !isExpired(l)) ||
        (filter === "inactive" && (!l.is_active || isExpired(l)));
      return matchSearch && matchFilter;
    })
    .sort((a, b) =>
      sortBy === "clicks"
        ? b.total_clicks - a.total_clicks
        : new Date(b.created_at) - new Date(a.created_at),
    );

  const copy = async (link) => {
    await navigator.clipboard.writeText(`https://${link.short_url}`);
    setCopiedId(link.id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const deleteLink = (id) => {
    if (!confirm("Delete this link?")) return;
    setLinks((p) => p.filter((l) => l.id !== id));
  };
  const toggleActive = (id) =>
    setLinks((p) =>
      p.map((l) => (l.id === id ? { ...l, is_active: !l.is_active } : l)),
    );

  const counts = {
    all: links.length,
    active: links.filter((l) => l.is_active && !isExpired(l)).length,
    inactive: links.filter((l) => !l.is_active || isExpired(l)).length,
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
          maxWidth: "970px",
          margin: "0 auto",
          padding: "32px 24px",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "10px",
                color: "#3d4f67",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.1em",
                marginBottom: "4px",
              }}
            >
              LINK MANAGER
            </p>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "26px",
                color: "#e8edf5",
                letterSpacing: "-0.5px",
                lineHeight: 1,
                marginBottom: "4px",
              }}
            >
              My Links
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#8fa3be",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span
                style={{
                  color: "#00d4ff",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                }}
              >
                {links.length}
              </span>{" "}
              links ·{" "}
              <span
                style={{
                  color: "#34d399",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {counts.active} active
              </span>
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            style={{
              background: "linear-gradient(135deg,#00d4ff,#0099cc)",
              color: "#060a14",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              border: "none",
              borderRadius: "10px",
              padding: "10px 18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
              <path
                d="M6 1v10M1 6h10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            New Link
          </button>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Search */}
          <div style={{ flex: 1, position: "relative" }}>
            <svg
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#3d4f67",
              }}
              width="13"
              height="13"
              fill="none"
              viewBox="0 0 14 14"
            >
              <circle
                cx="6"
                cy="6"
                r="4.5"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M9.5 9.5L13 13"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <input
              placeholder="Search links, codes, URLs…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: "#0f1828",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "10px",
                padding: "9px 12px 9px 34px",
                color: "#e8edf5",
                fontSize: "13px",
                outline: "none",
                fontFamily: "'Inter', sans-serif",
                transition: "border-color .2s",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(0,212,255,0.35)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.07)")
              }
            />
          </div>

          {/* Filter tabs */}
          <div
            style={{
              display: "flex",
              background: "#0d1220",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "10px",
              padding: "3px",
              gap: "2px",
            }}
          >
            {["all", "active", "inactive"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "7px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  transition: "all .15s",
                  background: filter === f ? "#0f1828" : "transparent",
                  color: filter === f ? "#e8edf5" : "#3d4f67",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "'JetBrains Mono', monospace",
                    color: filter === f ? "#00d4ff" : "#3d4f67",
                  }}
                >
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: "#0f1828",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px",
              padding: "9px 12px",
              color: "#8fa3be",
              fontSize: "12px",
              outline: "none",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              colorScheme: "dark",
            }}
          >
            <option value="clicks">Sort: Clicks</option>
            <option value="date">Sort: Date</option>
          </select>
        </div>

        {/* Table card */}
        <div style={{ ...S.card, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Link", "Short URL", "Clicks", "Created", "Status", ""].map(
                  (h, i) => (
                    <th
                      key={h}
                      style={{
                        textAlign: i === 2 ? "right" : "left",
                        padding: "11px 16px",
                        fontSize: "9px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#2a3a52",
                        fontWeight: 400,
                        fontFamily: "'JetBrains Mono', monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((link, idx) => (
                <tr
                  key={link.id}
                  style={{
                    borderBottom:
                      idx < filtered.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                    transition: "background .15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {/* Link info */}
                  <td style={{ padding: "12px 16px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: "#141e30",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={`https://www.google.com/s2/favicons?sz=32&domain=${new URL(link.original_url).hostname}`}
                          width={16}
                          height={16}
                          style={{ borderRadius: "2px" }}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#e8edf5",
                            margin: 0,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "180px",
                          }}
                        >
                          {link.title || link.short_code}
                        </p>
                        <p
                          style={{
                            fontSize: "10px",
                            color: "#3d4f67",
                            margin: 0,
                            fontFamily: "'Inter', sans-serif",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "180px",
                          }}
                        >
                          {new URL(link.original_url).hostname}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* Short URL */}
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "12px",
                        color: "#00d4ff",
                        background: "rgba(0,212,255,0.07)",
                        padding: "3px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      {link.short_url}
                    </span>
                  </td>
                  {/* Clicks */}
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#e8edf5",
                      }}
                    >
                      {link.total_clicks.toLocaleString()}
                    </span>
                  </td>
                  {/* Created */}
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#5a7294",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {new Date(link.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  {/* Status */}
                  <td style={{ padding: "12px 16px" }}>
                    <StatusBadge
                      active={link.is_active}
                      expired={isExpired(link)}
                    />
                  </td>
                  {/* Actions */}
                  <td style={{ padding: "12px 16px" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        justifyContent: "flex-end",
                      }}
                    >
                      <ActionBtn onClick={() => copy(link)} title="Copy" accent>
                        {copiedId === link.id ? (
                          <svg
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              d="M2.5 7l3 3 6-6"
                              stroke="#00d4ff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <rect
                              x="4"
                              y="4"
                              width="8"
                              height="8"
                              rx="1.5"
                              stroke="currentColor"
                              strokeWidth="1.3"
                            />
                            <path
                              d="M2 10V2h8"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </ActionBtn>
                      <ActionBtn
                        onClick={() => setQrLink(link)}
                        title="QR Code"
                      >
                        <svg
                          width="12"
                          height="12"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <rect
                            x="1"
                            y="1"
                            width="5"
                            height="5"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />
                          <rect
                            x="8"
                            y="1"
                            width="5"
                            height="5"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />
                          <rect
                            x="1"
                            y="8"
                            width="5"
                            height="5"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />
                          <path
                            d="M8 8h2v2H8zM10 10h3v3h-3z"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />
                        </svg>
                      </ActionBtn>
                      <ActionBtn
                        onClick={() => onAnalytics(link)}
                        title="Analytics"
                      >
                        <svg
                          width="12"
                          height="12"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            d="M1 10.5l3-3 2.5 2L10 4l3 2"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </ActionBtn>
                      <ActionBtn
                        onClick={() => toggleActive(link.id)}
                        title={link.is_active ? "Deactivate" : "Activate"}
                      >
                        <svg
                          width="12"
                          height="12"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <circle
                            cx="7"
                            cy="7"
                            r="5.5"
                            stroke={link.is_active ? "#34d399" : "currentColor"}
                            strokeWidth="1.3"
                          />
                          <circle
                            cx="7"
                            cy="7"
                            r="2"
                            fill={link.is_active ? "#34d399" : "currentColor"}
                          />
                        </svg>
                      </ActionBtn>
                      <ActionBtn
                        onClick={() => deleteLink(link.id)}
                        title="Delete"
                        danger
                      >
                        <svg
                          width="12"
                          height="12"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            d="M2 3.5h10M5.5 3.5V2h3v1.5M4 3.5l.5 8h5l.5-8"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </ActionBtn>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      padding: "60px 16px",
                      textAlign: "center",
                      color: "#3d4f67",
                      fontSize: "13px",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    No links found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && (
        <CreateLinkModal
          onClose={() => setShowCreate(false)}
          onCreated={(link) => setLinks((p) => [link, ...p])}
        />
      )}
      {qrLink && <QRModal link={qrLink} onClose={() => setQrLink(null)} />}
    </div>
  );
}
