import { ImageResponse } from "next/og";
import { site } from "@/config/site";

// ─────────────────────────────────────────────────────────────────────────────
// OPEN GRAPH IMAGE — the preview card shown when your link is shared
// (Discord, LinkedIn, iMessage, Slack, etc.). Next.js generates this image
// from the JSX below at build time — no design tool needed. It automatically
// matches your site's identity: warm paper, ink, cobalt accent.
//
// This file lives at app/opengraph-image.tsx and Next.js wires it up for you.
// It also serves as the Twitter card image via twitter-image (re-exported).
// ─────────────────────────────────────────────────────────────────────────────

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfaf8",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: mono eyebrow */}
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6f6b63",
            fontFamily: "monospace",
          }}
        >
          Field Notes
        </div>

        {/* Middle: name + identity line */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              color: "#191815",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#6f6b63",
              maxWidth: "900px",
              lineHeight: 1.3,
            }}
          >
            Computer Engineering @ Queen&apos;s · hardware, firmware, and the
            software around them
          </div>
        </div>

        {/* Bottom: mark + url */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 10,
                background: "#2438e8",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              {site.mark}
            </div>
            <div style={{ fontSize: 28, color: "#191815", fontWeight: 600 }}>
              ishanbijukuchhay.com
            </div>
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#6f6b63",
              fontFamily: "monospace",
            }}
          >
            5 selected projects
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
