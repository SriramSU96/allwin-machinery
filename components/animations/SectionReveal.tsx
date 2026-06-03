"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function SectionReveal({ children, delay = 0, className }: SectionRevealProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "visible", className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
