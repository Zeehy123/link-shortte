export const MOCK_USER = {
  id: 1,
  name: "Alex Okafor",
  email: "alex@linker.d",
  avatar: "AO",
  plan: "Pro",
};

const now = new Date();
const daysAgo = (n) => new Date(now - n * 86400000);

export const MOCK_LINKS = [
  {
    id: 1,
    original_url:
      "https://github.com/alexokafor/awesome-project/tree/main/docs/getting-started",
    short_code: "gh-docs",
    short_url: "lnkr.d/gh-docs",
    title: "GitHub Docs",
    created_at: daysAgo(12).toISOString(),
    total_clicks: 1284,
    is_active: true,
    expires_at: null,
    qr_url:
      "https://api.qrserver.com/v1/create-qr-code/?data=https://lnkr.d/gh-docs&size=200x200",
  },
  {
    id: 2,
    original_url:
      "https://www.figma.com/file/abc123/LinkerD-Design-System?node-id=0%3A1",
    short_code: "figma-ds",
    short_url: "lnkr.d/figma-ds",
    title: "Design System",
    created_at: daysAgo(8).toISOString(),
    total_clicks: 892,
    is_active: true,
    expires_at: daysAgo(-30).toISOString(),
    qr_url:
      "https://api.qrserver.com/v1/create-qr-code/?data=https://lnkr.d/figma-ds&size=200x200",
  },
  {
    id: 3,
    original_url:
      "https://docs.google.com/presentation/d/1XYZ_abc/edit#slide=id.p",
    short_code: "pitch-v2",
    short_url: "lnkr.d/pitch-v2",
    title: "Pitch Deck v2",
    created_at: daysAgo(5).toISOString(),
    total_clicks: 439,
    is_active: true,
    expires_at: null,
    qr_url:
      "https://api.qrserver.com/v1/create-qr-code/?data=https://lnkr.d/pitch-v2&size=200x200",
  },
  {
    id: 4,
    original_url:
      "https://medium.com/@alexokafor/building-a-link-shortener-with-django-and-react",
    short_code: "blog-post",
    short_url: "lnkr.d/blog-post",
    title: "Blog Post",
    created_at: daysAgo(20).toISOString(),
    total_clicks: 3107,
    is_active: true,
    expires_at: null,
    qr_url:
      "https://api.qrserver.com/v1/create-qr-code/?data=https://lnkr.d/blog-post&size=200x200",
  },
  {
    id: 5,
    original_url: "https://calendly.com/alexokafor/30min-intro-call",
    short_code: "book-me",
    short_url: "lnkr.d/book-me",
    title: "Calendly Booking",
    created_at: daysAgo(3).toISOString(),
    total_clicks: 76,
    is_active: false,
    expires_at: daysAgo(1).toISOString(),
    qr_url:
      "https://api.qrserver.com/v1/create-qr-code/?data=https://lnkr.d/book-me&size=200x200",
  },
];

// Generate daily click data for the last 30 days
export function generateClickTimeline(totalClicks, days = 30) {
  const data = [];
  let remaining = totalClicks;
  for (let i = days; i >= 0; i--) {
    const variance = Math.random() * 0.8 + 0.2;
    const base = Math.floor((totalClicks / days) * variance);
    const clicks = i === 0 ? Math.max(0, remaining) : Math.min(base, remaining);
    remaining -= clicks;
    data.push({
      date: daysAgo(i).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      clicks: Math.max(0, clicks),
    });
  }
  return data;
}

export const DEVICE_DATA = [
  { name: "Desktop", value: 52, color: "#00d4ff" },
  { name: "Mobile", value: 38, color: "#a855f7" },
  { name: "Tablet", value: 10, color: "#3d4f67" },
];

export const BROWSER_DATA = [
  { name: "Chrome", value: 61 },
  { name: "Safari", value: 22 },
  { name: "Firefox", value: 10 },
  { name: "Edge", value: 7 },
];

export const GEO_DATA = [
  { country: "Nigeria", flag: "🇳🇬", clicks: 512 },
  { country: "United States", flag: "🇺🇸", clicks: 298 },
  { country: "United Kingdom", flag: "🇬🇧", clicks: 187 },
  { country: "Canada", flag: "🇨🇦", clicks: 143 },
  { country: "Germany", flag: "🇩🇪", clicks: 96 },
  { country: "Ghana", flag: "🇬🇭", clicks: 48 },
];

export const REFERRER_DATA = [
  { source: "Direct", clicks: 440 },
  { source: "Twitter", clicks: 312 },
  { source: "LinkedIn", clicks: 228 },
  { source: "WhatsApp", clicks: 176 },
  { source: "Google", clicks: 128 },
];
