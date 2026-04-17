import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { generateClickTimeline, MOCK_LINKS } from "../data/mockData";
import CreateLinkModal from "./CreateLinkModal";

// Dashboard: overview of link performance and quick actions.
// - Shows key stats, a clicks-over-time chart, top links, and recent activity.
// - Uses mocked data via `MOCK_LINKS` for UI/demo purposes.

const TOTAL_CLICKS = MOCK_LINKS.reduce((s, l) => s + l.total_clicks, 0);
const CHART_DATA = generateClickTimeline(TOTAL_CLICKS, 30);

// Tiny sparkline data per stat
const spark = (base, trend) =>
  Array.from({ length: 7 }, (_, i) => ({
    v: Math.max(
      0,
      Math.round(
        base *
          (0.7 + Math.random() * 0.6) *
          (trend > 0 ? 1 + i * 0.04 : 1 - i * 0.02),
      ),
    ),
  }));

const STATS = [
  {
    label: "Total Clicks",
    value: TOTAL_CLICKS.toLocaleString(),
    delta: 12,
    raw: TOTAL_CLICKS,
    icon: "cursor",
    spark: spark(TOTAL_CLICKS / 7, 1),
    accent: true,
  },
  {
    label: "Active Links",
    value: MOCK_LINKS.filter((l) => l.is_active).length,
    delta: 5,
    raw: 4,
    icon: "link",
    spark: spark(3, 1),
  },
  {
    label: "Today's Clicks",
    value: "284",
    delta: -3,
    raw: 284,
    icon: "today",
    spark: spark(280, -1),
  },
  {
    label: "Click Rate",
    value: "3.2%",
    delta: 8,
    raw: 3.2,
    icon: "rate",
    spark: spark(3, 1),
  },
];

const ICON = {
  cursor: (
    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
      <path
        d="M3 2l10 5.5-5 1.5-2 5L3 2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  link: (
    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
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
  today: (
    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
      <rect
        x="2"
        y="3"
        width="12"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M5 1v3M11 1v3M2 7h12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  rate: (
    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
      <path
        d="M2 11l3.5-4 3 2.5L12 4l2 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

function MiniSpark({ data, positive }) {
  const max = Math.max(...data.map((d) => d.v));
  const pts = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 60;
      const y = 18 - (d.v / max) * 16;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width="60" height="20" style={{ display: "block" }}>
      <polyline
        points={pts}
        fill="none"
        stroke={positive ? "#34d399" : "#f87171"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatCard({ label, value, delta, icon, sparkData, accent }) {
  const pos = delta > 0;
  return (
    <div
      style={{
        background: accent ? "rgba(0,212,255,0.06)" : "#0f1828",
        border: `1px solid ${accent ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "16px",
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "9px",
            background: accent
              ? "rgba(0,212,255,0.15)"
              : "rgba(255,255,255,0.06)",
            color: accent ? "#00d4ff" : "#8fa3be",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {ICON[icon]}
        </div>
        <MiniSpark data={sparkData} positive={pos} />
      </div>
      <div>
        <p
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: "26px",
            color: accent ? "#00d4ff" : "#e8edf5",
            lineHeight: 1,
            marginBottom: "4px",
          }}
        >
          {value}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#8fa3be",
            fontFamily: "'Inter',sans-serif",
          }}
        >
          {label}
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <span
          style={{
            fontSize: "11px",
            color: pos ? "#34d399" : "#f87171",
            fontFamily: "'JetBrains Mono',monospace",
          }}
        >
          {pos ? "↑" : "↓"} {Math.abs(delta)}%
        </span>
        <span
          style={{
            fontSize: "11px",
            color: "#3d4f67",
            fontFamily: "'Inter',sans-serif",
          }}
        >
          vs last month
        </span>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#0f1828",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "10px",
        padding: "8px 12px",
        fontSize: "12px",
      }}
    >
      <p
        style={{
          color: "#8fa3be",
          marginBottom: "3px",
          fontFamily: "'Inter',sans-serif",
        }}
      >
        {label}
      </p>
      <p
        style={{
          color: "#00d4ff",
          fontFamily: "'JetBrains Mono',monospace",
          fontWeight: 600,
        }}
      >
        {payload[0].value} clicks
      </p>
    </div>
  );
};

const PERIODS = ["7d", "14d", "30d"];

export default function Dashboard({ onNavigate }) {
  const [showCreate, setShowCreate] = useState(false);
  const [links, setLinks] = useState(MOCK_LINKS);
  const [period, setPeriod] = useState("30d");

  const days = parseInt(period);
  const chartSlice = CHART_DATA.slice(-days);
  const topLinks = [...links]
    .sort((a, b) => b.total_clicks - a.total_clicks)
    .slice(0, 4);
  const maxClicks = topLinks[0]?.total_clicks || 1;

  return (
    <div style={{ flex: 2, overflowY: "auto", background: "#060a14" }}>
      {/* Grid texture */}
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
          maxWidth: "960px",
          margin: "0 auto",
          padding: "32px 24px",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "12px",
                color: "#3d4f67",
                fontFamily: "'JetBrains Mono',monospace",
                marginBottom: "4px",
                letterSpacing: "0.05em",
              }}
            >
              {new Date()
                .toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })
                .toUpperCase()}
            </p>
            <h1
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "28px",
                color: "#e8edf5",
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              Good morning, Alex
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#8fa3be",
                marginTop: "5px",
                fontFamily: "'Inter',sans-serif",
              }}
            >
              Your links got{" "}
              <span style={{ color: "#00d4ff", fontWeight: 600 }}>284</span>{" "}
              clicks today so far.
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            style={{
              background: "linear-gradient(135deg,#00d4ff,#0099cc)",
              color: "#060a14",
              fontFamily: "'Syne',sans-serif",
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

        {/* ── Stat Cards ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "12px",
          }}
        >
          {STATS.map((s) => (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
              delta={s.delta}
              icon={s.icon}
              sparkData={s.spark}
              accent={s.accent}
            />
          ))}
        </div>

        {/* ── Chart ── */}
        <div
          style={{
            background: "#0f1828",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            padding: "20px 22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "#e8edf5",
                  marginBottom: "3px",
                }}
              >
                Clicks Over Time
              </h2>
              <p
                style={{
                  fontSize: "12px",
                  color: "#3d4f67",
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                All links combined
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "3px",
                background: "#0d1220",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "9px",
                padding: "3px",
              }}
            >
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "11px",
                    transition: "all .15s",
                    background: period === p ? "#0f1828" : "transparent",
                    color: period === p ? "#00d4ff" : "#3d4f67",
                    boxShadow:
                      period === p ? "0 1px 4px rgba(0,0,0,0.3)" : "none",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={chartSlice}
              margin={{ top: 4, right: 4, left: -22, bottom: 0 }}
            >
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#3d4f67", fontFamily: "Inter" }}
                tickLine={false}
                axisLine={false}
                interval={Math.floor(days / 6)}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#3d4f67", fontFamily: "Inter" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#00d4ff"
                strokeWidth={2}
                fill="url(#grad)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#00d4ff",
                  stroke: "#060a14",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ── Bottom row: Top Links + Quick Actions ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "12px",
            alignItems: "start",
          }}
        >
          {/* Top Links */}
          <div
            style={{
              background: "#0f1828",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              padding: "20px 22px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "18px",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "#e8edf5",
                }}
              >
                Top Links
              </h2>
              <button
                onClick={() => onNavigate("links")}
                style={{
                  fontSize: "11px",
                  color: "#00d4ff",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                View all →
              </button>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {topLinks.map((link, i) => {
                const pct = Math.round((link.total_clicks / maxClicks) * 100);
                return (
                  <div
                    key={link.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "7px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: "11px",
                          color: "#3d4f67",
                          width: "14px",
                          textAlign: "center",
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </span>
                      <img
                        src={`https://www.google.com/s2/favicons?sz=32&domain=${new URL(link.original_url).hostname}`}
                        alt=""
                        width={18}
                        height={18}
                        style={{ borderRadius: "4px", flexShrink: 0 }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#e8edf5",
                            margin: 0,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {link.title || link.short_code}
                        </p>
                        <p
                          style={{
                            fontSize: "10px",
                            color: "#00d4ff",
                            fontFamily: "'JetBrains Mono',monospace",
                            margin: 0,
                          }}
                        >
                          {link.short_url}
                        </p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p
                          style={{
                            fontFamily: "'JetBrains Mono',monospace",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#e8edf5",
                            margin: 0,
                          }}
                        >
                          {link.total_clicks.toLocaleString()}
                        </p>
                        <p
                          style={{
                            fontSize: "10px",
                            color: "#3d4f67",
                            margin: 0,
                          }}
                        >
                          clicks
                        </p>
                      </div>
                      <button
                        onClick={() => onNavigate("analytics", link)}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "7px",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#8fa3be",
                          fontSize: "11px",
                          cursor: "pointer",
                          fontFamily: "'Inter',sans-serif",
                          flexShrink: 0,
                        }}
                      >
                        Stats
                      </button>
                    </div>
                    {/* Progress bar */}
                    <div
                      style={{
                        marginLeft: "24px",
                        height: "3px",
                        borderRadius: "99px",
                        background: "rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: "99px",
                          width: `${pct}%`,
                          background:
                            i === 0 ? "#00d4ff" : "rgba(0,212,255,0.35)",
                          transition: "width .4s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column: Quick actions + Recent */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {/* Quick actions */}
            <div
              style={{
                background: "#0f1828",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "18px 20px",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#e8edf5",
                  marginBottom: "14px",
                }}
              >
                Quick Actions
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {[
                  {
                    label: "Shorten a URL",
                    icon: "↗",
                    action: () => setShowCreate(true),
                    primary: true,
                  },
                  {
                    label: "View analytics",
                    icon: "→",
                    action: () => onNavigate("analytics"),
                  },
                  {
                    label: "Manage links",
                    icon: "→",
                    action: () => onNavigate("links"),
                  },
                ].map(({ label, icon, action, primary }) => (
                  <button
                    key={label}
                    onClick={action}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "none",
                      cursor: "pointer",
                      background: primary
                        ? "rgba(0,212,255,0.08)"
                        : "rgba(255,255,255,0.04)",
                      color: primary ? "#00d4ff" : "#8fa3be",
                      fontSize: "13px",
                      fontFamily: "'Inter',sans-serif",
                      transition: "background .15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = primary
                        ? "rgba(0,212,255,0.14)"
                        : "rgba(255,255,255,0.07)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = primary
                        ? "rgba(0,212,255,0.08)"
                        : "rgba(255,255,255,0.04)";
                    }}
                  >
                    {label}
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: "14px",
                      }}
                    >
                      {icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity feed */}
            <div
              style={{
                background: "#0f1828",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "18px 20px",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#e8edf5",
                  marginBottom: "14px",
                }}
              >
                Recent Clicks
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {[
                  {
                    code: "blog-post",
                    time: "2m ago",
                    country: "🇳🇬",
                    device: "Mobile",
                  },
                  {
                    code: "gh-docs",
                    time: "8m ago",
                    country: "🇺🇸",
                    device: "Desktop",
                  },
                  {
                    code: "pitch-v2",
                    time: "15m ago",
                    country: "🇬🇧",
                    device: "Desktop",
                  },
                  {
                    code: "figma-ds",
                    time: "22m ago",
                    country: "🇨🇦",
                    device: "Mobile",
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "#00d4ff",
                        opacity: 0.5,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: "11px",
                          color: "#00d4ff",
                          margin: 0,
                        }}
                      >
                        lnkr.d/{c.code}
                      </p>
                      <p
                        style={{
                          fontSize: "10px",
                          color: "#3d4f67",
                          margin: 0,
                          fontFamily: "'Inter',sans-serif",
                        }}
                      >
                        {c.device} · {c.time}
                      </p>
                    </div>
                    <span style={{ fontSize: "14px" }}>{c.country}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCreate && (
        <CreateLinkModal
          onClose={() => setShowCreate(false)}
          onCreated={(link) => setLinks((prev) => [link, ...prev])}
        />
      )}
    </div>
  );
}
