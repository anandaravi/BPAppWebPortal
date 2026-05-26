import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#f59e0b", fontSize: 12, fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>404</p>
        <h1 style={{ fontSize: 40, fontWeight: 900, marginBottom: 16 }}>Page not found</h1>
        <p style={{ color: "#a1a1aa", marginBottom: 32 }}>
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" style={{ display: "inline-block", padding: "12px 24px", background: "#f59e0b", color: "#000", fontWeight: 700, borderRadius: 8, textDecoration: "none" }}>Back to home</Link>
      </div>
    </div>
  );
}
