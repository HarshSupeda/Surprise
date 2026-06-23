"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5 }}>
      {/* Bypass the strict type check mismatch for Vercel */}
      {children as any}
    </ReactLenis>
  );
}