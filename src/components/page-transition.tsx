// Pass-through wrapper. Page transitions handled by browser-native @view-transition
// in globals.css (supported in Chromium/Edge/Safari TP). Removing framer-motion
// PageTransition shaves the perceived-latency hit from exit animations.
export function PageTransition({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
