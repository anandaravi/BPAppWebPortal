import Image from "next/image";
import { cn } from "@/lib/utils";

// Logo source: /public/bp_app.png — DO NOT replace or regenerate this file.
// Original aspect ratio: 798×313 (2.55:1)

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const HEIGHTS = { sm: 28, md: 36, lg: 48 };

export function Logo({ className, size = "md" }: LogoProps) {
  const h = HEIGHTS[size];
  const w = Math.round(h * (798 / 313));
  return (
    <Image
      src="/bp_app.png"
      alt="Papyrus BPApp"
      width={w}
      height={h}
      className={cn("shrink-0", className)}
      priority
    />
  );
}
