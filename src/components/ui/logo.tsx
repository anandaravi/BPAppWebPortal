import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: { badge: 32, text: 18, sub: 9, gap: 10, totalW: 140 },
  md: { badge: 40, text: 22, sub: 11, gap: 12, totalW: 180 },
  lg: { badge: 52, text: 28, sub: 13, gap: 16, totalW: 230 },
};

export function Logo({ className, iconOnly = false, size = "md" }: LogoProps) {
  const s = SIZES[size];
  const h = s.badge;
  const w = iconOnly ? h : s.totalW;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      className={cn("shrink-0", className)}
      style={{ height: h, width: w }}
      aria-label="Papyrus BPApp"
    >
      {/* Badge */}
      <rect x="0" y="0" width={h} height={h} rx={h * 0.2} fill="#F59E0B" />

      {/* Stacked paper lines */}
      <rect x={h * 0.2} y={h * 0.26} width={h * 0.42} height={h * 0.09} rx={h * 0.04} fill="white" opacity="0.92" />
      <rect x={h * 0.2} y={h * 0.41} width={h * 0.58} height={h * 0.09} rx={h * 0.04} fill="white" opacity="0.92" />
      <rect x={h * 0.2} y={h * 0.56} width={h * 0.48} height={h * 0.09} rx={h * 0.04} fill="white" opacity="0.92" />
      <rect x={h * 0.2} y={h * 0.71} width={h * 0.34} height={h * 0.09} rx={h * 0.04} fill="white" opacity="0.6" />

      {/* Right vertical bar (P stem) */}
      <rect x={h * 0.72} y={h * 0.26} width={h * 0.09} height={h * 0.29} rx={h * 0.04} fill="white" opacity="0.92" />

      {!iconOnly && (
        <>
          {/* Papyrus wordmark */}
          <text
            x={h + s.gap}
            y={h * 0.6}
            fontFamily="'Geist', 'Inter', -apple-system, sans-serif"
            fontWeight="800"
            fontSize={s.text}
            fill="white"
            letterSpacing="-0.5"
          >
            Papyrus
          </text>
          {/* BPApp tag */}
          <text
            x={h + s.gap + 1}
            y={h * 0.9}
            fontFamily="'Geist Mono', 'JetBrains Mono', monospace"
            fontWeight="500"
            fontSize={s.sub}
            fill="#F59E0B"
            letterSpacing="1.2"
          >
            BPApp
          </text>
        </>
      )}
    </svg>
  );
}
