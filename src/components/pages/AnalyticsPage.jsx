import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  MOCK_LINKS,
  generateClickTimeline,
  DEVICE_DATA,
  BROWSER_DATA,
  GEO_DATA,
  REFERRER_DATA,
} from "../data/mockData";

// AnalyticsPage: detailed per-link analytics view.
// - Displays time-series charts, device/browser/geo/referrer breakdowns.
// - Select a link to view its metrics (uses mock data for demo).

const DAYS_OPTIONS = [7, 14, 30, 90];
const S = {
  card: {
    background: "#0f1828",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
  },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#0d1525",
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

function StatCard({ label, value, sub, accent }) {
  return (
    <div
      style={{
        ...S.card,
        padding: "16px 18px",
        background: accent ? "rgba(0,212,255,0.06)" : "#0f1828",
        borderColor: accent ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.07)",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          color: "#3d4f67",
          fontFamily: "'JetBrains Mono',monospace",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        {label}
      </p>
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
      {sub && (
        <p
          style={{
            fontSize: "11px",
            color: "#3d4f67",
            fontFamily: "'Inter',sans-serif",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export default function AnalyticsPage({ link: propLink }) {
  const [selectedLink, setSelectedLink] = useState(propLink || MOCK_LINKS[0]);
  const [days, setDays] = useState(30);
  const chartData = generateClickTimeline(selectedLink.total_clicks, days);

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
          maxWidth: "960px",
          margin: "0 auto",
          padding: "32px 24px",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "10px",
                color: "#3d4f67",
                fontFamily: "'JetBrains Mono',monospace",
                letterSpacing: "0.1em",
                marginBottom: "4px",
              }}
            >
              LINK ANALYTICS
            </p>
            <h1
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "26px",
                color: "#e8edf5",
                letterSpacing: "-0.5px",
                lineHeight: 1,
                marginBottom: "4px",
              }}
            >
              Analytics
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "#8fa3be",
                fontFamily: "'Inter',sans-serif",
              }}
            >
              Deep dive into link performance
            </p>
          </div>
          <select
            value={selectedLink.id}
            onChange={(e) =>
              setSelectedLink(MOCK_LINKS.find((l) => l.id === +e.target.value))
            }
            style={{
              background: "#0f1828",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "9px 14px",
              color: "#e8edf5",
              fontSize: "13px",
              outline: "none",
              cursor: "pointer",
              fontFamily: "'Inter',sans-serif",
              colorScheme: "dark",
              minWidth: "180px",
            }}
          >
            {MOCK_LINKS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title || l.short_code}
              </option>
            ))}
          </select>
        </div>

        {/* Link info bar */}
        <div
          style={{
            ...S.card,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "9px",
              background: "#141e30",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={`https://www.google.com/s2/favicons?sz=32&domain=${new URL(selectedLink.original_url).hostname}`}
              width={18}
              height={18}
              style={{ borderRadius: "3px" }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#e8edf5",
                margin: 0,
              }}
            >
              {selectedLink.title || selectedLink.short_code}
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "#3d4f67",
                fontFamily: "'Inter',sans-serif",
                margin: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {selectedLink.original_url}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "12px",
                color: "#00d4ff",
                background: "rgba(0,212,255,0.07)",
                padding: "4px 9px",
                borderRadius: "6px",
              }}
            >
              {selectedLink.short_url}
            </span>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "'JetBrains Mono',monospace",
                padding: "3px 8px",
                borderRadius: "99px",
                background: "rgba(52,211,153,0.1)",
                color: "#34d399",
                border: "1px solid rgba(52,211,153,0.2)",
              }}
            >
              Active
            </span>
          </div>
        </div>

        {/* Stat cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,minmax(0,1fr))",
            gap: "10px",
          }}
        >
          <StatCard
            label="Total Clicks"
            value={selectedLink.total_clicks.toLocaleString()}
            sub="all time"
            accent
          />
          <StatCard label="Today" value="47" sub="+12 vs yesterday" />
          <StatCard label="This Week" value="284" sub="7-day window" />
          <StatCard
            label="Avg / Day"
            value={Math.round(selectedLink.total_clicks / 30)}
            sub="last 30 days"
          />
        </div>

        {/* Clicks over time */}
        <div style={{ ...S.card, padding: "20px 22px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "18px",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#e8edf5",
                  marginBottom: "2px",
                }}
              >
                Clicks Over Time
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: "#3d4f67",
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                Showing last {days} days
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
              {DAYS_OPTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "11px",
                    transition: "all .15s",
                    background: days === d ? "#0f1828" : "transparent",
                    color: days === d ? "#00d4ff" : "#3d4f67",
                    boxShadow: days === d ? "0 1px 4px rgba(0,0,0,.3)" : "none",
                  }}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={chartData}
              margin={{ top: 4, right: 4, left: -22, bottom: 0 }}
            >
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
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
                interval={Math.floor(days / 7)}
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
                fill="url(#ag)"
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

        {/* Row: Devices + Browsers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {/* Devices */}
          <div style={{ ...S.card, padding: "20px 22px" }}>
            <p
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                color: "#e8edf5",
                marginBottom: "18px",
              }}
            >
              Device Breakdown
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ flexShrink: 0 }}>
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie
                      data={DEVICE_DATA}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={34}
                      outerRadius={56}
                      paddingAngle={3}
                    >
                      {DEVICE_DATA.map((e) => (
                        <Cell key={e.name} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v) => [`${v}%`, ""]}
                      contentStyle={{
                        background: "#0f1828",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 8,
                        fontSize: 11,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {DEVICE_DATA.map((d) => (
                  <div key={d.name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "7px",
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: d.color,
                            flexShrink: 0,
                            display: "inline-block",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#8fa3be",
                            fontFamily: "'Inter',sans-serif",
                          }}
                        >
                          {d.name}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "12px",
                          fontFamily: "'JetBrains Mono',monospace",
                          fontWeight: 600,
                          color: "#e8edf5",
                        }}
                      >
                        {d.value}%
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
                          width: `${d.value}%`,
                          height: "100%",
                          borderRadius: "99px",
                          background: d.color,
                          opacity: 0.7,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Browsers */}
          <div style={{ ...S.card, padding: "20px 22px" }}>
            <p
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                color: "#e8edf5",
                marginBottom: "18px",
              }}
            >
              Browsers
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {BROWSER_DATA.map((b, i) => (
                <div key={b.name}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#8fa3be",
                        fontFamily: "'Inter',sans-serif",
                      }}
                    >
                      {b.name}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontFamily: "'JetBrains Mono',monospace",
                        color: "#e8edf5",
                      }}
                    >
                      {b.value}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "4px",
                      borderRadius: "99px",
                      background: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      style={{
                        width: `${b.value}%`,
                        height: "100%",
                        borderRadius: "99px",
                        background:
                          i === 0
                            ? "#a855f7"
                            : `rgba(168,85,247,${0.6 - i * 0.12})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row: Geo + Referrers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {/* Geo */}
          <div style={{ ...S.card, padding: "20px 22px" }}>
            <p
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                color: "#e8edf5",
                marginBottom: "16px",
              }}
            >
              Top Countries
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {GEO_DATA.map((g, i) => {
                const pct = Math.round((g.clicks / GEO_DATA[0].clicks) * 100);
                return (
                  <div key={g.country}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "5px",
                      }}
                    >
                      <span style={{ fontSize: "16px", flexShrink: 0 }}>
                        {g.flag}
                      </span>
                      <span
                        style={{
                          flex: 1,
                          fontSize: "12px",
                          color: "#e8edf5",
                          fontFamily: "'Inter',sans-serif",
                        }}
                      >
                        {g.country}
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: "12px",
                          color: i === 0 ? "#00d4ff" : "#8fa3be",
                        }}
                      >
                        {g.clicks}
                      </span>
                    </div>
                    <div
                      style={{
                        height: "3px",
                        borderRadius: "99px",
                        background: "rgba(255,255,255,0.06)",
                        marginLeft: "26px",
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          borderRadius: "99px",
                          background:
                            i === 0 ? "#00d4ff" : "rgba(0,212,255,0.35)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Referrers */}
          <div style={{ ...S.card, padding: "20px 22px" }}>
            <p
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                color: "#e8edf5",
                marginBottom: "16px",
              }}
            >
              Top Referrers
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {REFERRER_DATA.map((r, i) => {
                const pct = Math.round(
                  (r.clicks / REFERRER_DATA[0].clicks) * 100,
                );
                return (
                  <div key={r.source}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "5px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background:
                              i === 0 ? "#a855f7" : "rgba(168,85,247,0.4)",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#8fa3be",
                            fontFamily: "'Inter',sans-serif",
                          }}
                        >
                          {r.source}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: "12px",
                          color: "#e8edf5",
                        }}
                      >
                        {r.clicks}
                      </span>
                    </div>
                    <div
                      style={{
                        height: "3px",
                        borderRadius: "99px",
                        background: "rgba(255,255,255,0.06)",
                        marginLeft: "14px",
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          borderRadius: "99px",
                          background:
                            i === 0
                              ? "#a855f7"
                              : `rgba(168,85,247,${0.6 - i * 0.1})`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
