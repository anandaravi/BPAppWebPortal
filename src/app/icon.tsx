import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F59E0B",
          borderRadius: 7,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2.5,
          padding: "6px 5px",
        }}
      >
        {[16, 22, 19, 13].map((w, i) => (
          <div
            key={i}
            style={{
              width: w,
              height: 2.5,
              borderRadius: 1.5,
              background: "white",
              opacity: i === 3 ? 0.6 : 0.95,
            }}
          />
        ))}
      </div>
    ),
    { ...size },
  );
}
