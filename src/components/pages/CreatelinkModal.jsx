import { useState } from "react";
// import { api } from "../api";

// CreatelinkModal: modal form used to create a new short link.
// - Collects URL, optional label, custom code and expiry date.
// - On submit it calls the API (mocked here) and shows a success state with copy/QR.
export default function CreatelinkModal({ onClose, onCreated }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Handle form submit to create a link via API.
  // Sets loading state, handles errors, and calls `onCreated` with the result.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!url.trim()) return;
    setLoading(true);
    try {
      // TODO: pass custom_code and expires_at when backend supports it
      const data = await api.createLink({
        original_url: url,
        title: title || undefined,
        short_code: customCode || undefined,
        expires_at: expiry || undefined,
      });
      setResult(data);
      onCreated?.(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Copy the created short URL to the clipboard and show a transient UI state.
  const copy = async () => {
    await navigator.clipboard.writeText(result.short_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md card animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-syne font-semibold text-snow text-lg">
            Create Short Link
          </h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-snow transition-colors"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-ink mb-1.5">
                Destination URL *
              </label>
              <input
                className="input-dark"
                type="url"
                placeholder="https://your-very-long-url.com/goes/right/here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs text-ink mb-1.5">
                Label (optional)
              </label>
              <input
                className="input-dark"
                placeholder="e.g. Blog Post, Pitch Deck..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-ink mb-1.5">
                  Custom Code
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted font-mono">
                    lnkr.d/
                  </span>
                  <input
                    className="input-dark pl-[58px] font-mono text-xs"
                    placeholder="my-link"
                    value={customCode}
                    onChange={(e) =>
                      setCustomCode(
                        e.target.value.replace(/[^a-zA-Z0-9-_]/g, ""),
                      )
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-ink mb-1.5">
                  Expires On
                </label>
                <input
                  className="input-dark text-xs"
                  type="date"
                  value={expiry}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setExpiry(e.target.value)}
                  style={{ colorScheme: "dark" }}
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn-ghost flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Link"}
              </button>
            </div>
          </form>
        ) : (
          /* Success state */
          <div className="space-y-5">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-3">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <path
                    d="M4 10l4 4 8-8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="font-syne font-semibold text-snow">Link Created!</p>
            </div>

            {/* Short URL display */}
            <div className="bg-bg-secondary rounded-xl p-4 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-muted mb-1 uppercase tracking-wider">
                  Short Link
                </p>
                <p className="font-mono text-accent font-medium truncate">
                  {result.short_url}
                </p>
              </div>
              <button onClick={copy} className="btn-primary px-4 shrink-0">
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>

            {/* QR Code */}
            <div className="flex items-center justify-center bg-white rounded-xl p-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(result.short_url)}&size=160x160&bgcolor=ffffff&color=060a14`}
                alt="QR Code"
                width={160}
                height={160}
                className="rounded"
              />
            </div>
            <p className="text-xs text-center text-muted">
              Right-click the QR code to save it
            </p>

            <button onClick={onClose} className="btn-ghost w-full">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
