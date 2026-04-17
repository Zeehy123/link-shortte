import { useState } from "react";

const NAV = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg width="15" height="15" fill="none" viewBox="0 0 16 16">
        <rect
          x="1"
          y="1"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <rect
          x="9"
          y="1"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <rect
          x="1"
          y="9"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <rect
          x="9"
          y="9"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    ),
  },
  {
    id: "links",
    label: "My Links",
    icon: (
      <svg width="15" height="15" fill="none" viewBox="0 0 16 16">
        <path
          d="M6.5 9.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5L7.5 3.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5l1-1"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: (
      <svg width="15" height="15" fill="none" viewBox="0 0 16 16">
        <path
          d="M2 12l3.5-4 3 2.5L12 5l2 2"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 14h12"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg width="15" height="15" fill="none" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.1 3.1l1.1 1.1M11.8 11.8l1.1 1.1M12.9 3.1l-1.1 1.1M4.2 11.8l-1.1 1.1"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Sidebar({
  page = "dashboard",
  setPage = () => {},
  user = { name: "Guest", avatar: "G", plan: "Free" },
  onLogout = () => {},
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? "64px" : "220px",
        minWidth: collapsed ? "64px" : "220px",
        height: "100vh",
        background: "#070d1a",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease, min-width 0.25s ease",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle top glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          background:
            "radial-gradient(ellipse at 50% -20%, rgba(0,212,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Logo row */}
      <div
        style={{
          padding: "20px 16px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              background: "#00d4ff",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path
                d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5l1-1"
                stroke="#060a14"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M4.5 7.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5l-1 1"
                stroke="#060a14"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {!collapsed && (
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "17px",
                color: "#e8edf5",
                whiteSpace: "nowrap",
                letterSpacing: "-0.2px",
              }}
            >
              LinkerD
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed((s) => !s)}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "6px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#3d4f67",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background .15s, color .15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "#8fa3be";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "#3d4f67";
          }}
        >
          <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
            {collapsed ? (
              <path
                d="M4 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M8 2L4 6l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Nav label */}
      {!collapsed && (
        <div style={{ padding: "16px 16px 6px" }}>
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.1em",
              color: "#2a3a52",
              fontFamily: "'JetBrains Mono', monospace",
              textTransform: "uppercase",
            }}
          >
            Navigation
          </p>
        </div>
      )}

      {/* Nav items */}
      <nav
        style={{
          flex: 1,
          padding: collapsed ? "12px 8px" : "4px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          overflowY: "auto",
        }}
      >
        {NAV.map((item) => {
          const active = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              title={collapsed ? item.label : undefined}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: collapsed ? "10px" : "9px 12px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: active ? 500 : 400,
                justifyContent: collapsed ? "center" : "flex-start",
                transition: "all .15s",
                background: active ? "rgba(0,212,255,0.1)" : "transparent",
                color: active ? "#00d4ff" : "#5a7294",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "#e8edf5";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#5a7294";
                }
              }}
            >
              {/* Active indicator bar */}
              {active && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "20%",
                    bottom: "20%",
                    width: "3px",
                    borderRadius: "0 3px 3px 0",
                    background: "#00d4ff",
                  }}
                />
              )}
              <span
                style={{
                  color: active ? "#00d4ff" : "#3d4f67",
                  flexShrink: 0,
                  transition: "color .15s",
                }}
              >
                {item.icon}
              </span>
              {!collapsed && (
                <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Divider + usage bar */}
      {!collapsed && (
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "#3d4f67",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Links used
            </span>
            <span
              style={{
                fontSize: "10px",
                color: "#8fa3be",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              5 / ∞
            </span>
          </div>
          <div
            style={{
              height: "3px",
              borderRadius: "99px",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                width: "30%",
                height: "100%",
                borderRadius: "99px",
                background: "linear-gradient(90deg, #00d4ff, #0099cc)",
              }}
            />
          </div>
        </div>
      )}

      {/* User section */}
      <div
        style={{
          padding: collapsed ? "12px 8px" : "10px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: collapsed ? "8px" : "9px 10px",
            borderRadius: "10px",
            cursor: "pointer",
            justifyContent: collapsed ? "center" : "flex-start",
            transition: "background .15s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "rgba(168,85,247,0.15)",
              border: "1px solid rgba(168,85,247,0.3)",
              color: "#a855f7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {(user.avatar || user.name?.[0] || "G").toUpperCase()}
          </div>
          {!collapsed && (
            <>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#e8edf5",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {user.name}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    color: "#3d4f67",
                    margin: 0,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {user.plan} Plan
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLogout();
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#3d4f67",
                  cursor: "pointer",
                  padding: "2px",
                  display: "flex",
                  flexShrink: 0,
                  transition: "color .15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3d4f67")}
                title="Sign out"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path
                    d="M5 7h7M9 5l2 2-2 2"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
