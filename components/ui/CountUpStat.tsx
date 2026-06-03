"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface CountUpStatProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function CountUpStat({ value, suffix = "", className = "" }: CountUpStatProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [inView, value]);

  return (
    <span
      ref={ref}
      className={`font-heading font-black text-white text-2xl md:text-3xl ${className}`}
    >
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
