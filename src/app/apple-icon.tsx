import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            background: "#F59E0B",
            borderRadius: 28,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            padding: "26px 22px",
          }}
        >
          {[68, 90, 78, 54].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 10,
                borderRadius: 5,
                background: "white",
                opacity: i === 3 ? 0.6 : 0.95,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
