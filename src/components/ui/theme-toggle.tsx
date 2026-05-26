"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, SunMoon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ORDER = ["system", "light", "dark"] as const;
type Mode = (typeof ORDER)[number];

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const current: Mode = mounted ? ((theme as Mode) ?? "system") : "system";
  const next = () => {
    const idx = ORDER.indexOf(current);
    setTheme(ORDER[(idx + 1) % ORDER.length]);
  };

  const Icon = current === "light" ? Sun : current === "dark" ? Moon : SunMoon;
  const label = `Theme: ${current}. Click to cycle.`;

  return (
    <button
      type="button"
      onClick={next}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded-md text-text-2 hover:text-foreground hover:bg-amber-500/10 transition-colors",
        className
      )}
    >
      <Icon size={16} />
    </button>
  );
}
