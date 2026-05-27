import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Papyrus BPApp — ERP for Paper Mills";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Amber glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, #F59E0B18 0%, transparent 70%)",
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 13,
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
                gap: 5,
                padding: "12px 10px",
              }}
            >
              {[40, 52, 44, 30].map((w, i) => (
                <div
                  key={i}
                  style={{
                    width: w,
                    height: 5,
                    borderRadius: 3,
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
                fontSize: 28,
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
                fontSize: 13,
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

        {/* Headline */}
        <div
          style={{
            fontSize: 62,
            fontWeight: 900,
            color: "white",
            letterSpacing: "-2px",
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          The ERP Built
          <br />
          <span style={{ color: "#F59E0B" }}>for Paper Mills.</span>
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 22,
            color: "#71717a",
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: 680,
          }}
        >
          44 modules. GST-native. AI-powered. Complete from orders to payroll.
        </div>

        {/* Bottom tag */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontSize: 15,
            color: "#3f3f46",
            fontWeight: 500,
            letterSpacing: "0.5px",
          }}
        >
          bpapperp.papyrus360.com
        </div>
      </div>
    ),
    { ...size }
  );
}
