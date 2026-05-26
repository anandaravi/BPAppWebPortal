import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

function clamp(s: string | null, max: number): string {
  if (!s) return "";
  const t = s.trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trimEnd() + "…";
}

function safeColor(raw: string | null, fallback: string): string {
  if (!raw) return fallback;
  const v = raw.startsWith("#") ? raw : `#${raw}`;
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v) ? v : fallback;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const title = clamp(url.searchParams.get("title"), 80) || "Papyrus BPApp";
  const subtitle = clamp(
    url.searchParams.get("subtitle"),
    140,
  ) || "The ERP Built for Paper Mills";
  const tag = clamp(url.searchParams.get("tag"), 40) || "";
  const accent = safeColor(url.searchParams.get("accent"), "#F59E0B");
  const eyebrow = clamp(url.searchParams.get("eyebrow"), 30) || "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#080808",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          }}
        />

        {/* Accent stripe left */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 80,
            bottom: 80,
            width: 4,
            background: `linear-gradient(to bottom, transparent, ${accent}, transparent)`,
          }}
        />

        {/* Logo + brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#F59E0B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                padding: "10px 9px",
              }}
            >
              {[34, 44, 38, 26].map((w, i) => (
                <div
                  key={i}
                  style={{
                    width: w,
                    height: 4,
                    borderRadius: 2,
                    background: "white",
                    opacity: i === 3 ? 0.6 : 0.95,
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              Papyrus
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#F59E0B",
                letterSpacing: "2px",
                marginTop: 3,
              }}
            >
              BPApp
            </span>
          </div>
        </div>

        {/* Tag pill (optional) */}
        {tag && (
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 16px",
              borderRadius: 999,
              border: `1px solid ${accent}55`,
              background: `${accent}15`,
              color: accent,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 22,
            }}
          >
            {tag}
          </div>
        )}

        {/* Eyebrow (optional, replaces tag if both, prefer eyebrow as small mono) */}
        {!tag && eyebrow && (
          <div
            style={{
              display: "flex",
              fontSize: 14,
              fontWeight: 700,
              color: accent,
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </div>
        )}

        {/* Headline */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 40 ? 56 : 68,
            fontWeight: 900,
            color: "white",
            letterSpacing: "-2px",
            lineHeight: 1.05,
            marginBottom: 22,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#a1a1aa",
            fontWeight: 400,
            lineHeight: 1.45,
            maxWidth: 920,
          }}
        >
          {subtitle}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#71717a",
              fontWeight: 500,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Papyrus360 · A Netique Infotech product
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#52525b",
              fontWeight: 500,
              letterSpacing: "0.5px",
            }}
          >
            papyrusbpapp.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...SIZE },
  );
}
