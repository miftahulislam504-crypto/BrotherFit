'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 700);
    const t3 = setTimeout(() => setPhase(3), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg overflow-hidden">

      {/* Progress line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-border overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent/60 via-accent to-accent/60 origin-left"
          style={{
            transform: `scaleX(${phase === 0 ? 0 : phase === 1 ? 0.4 : phase === 2 ? 0.75 : 1})`,
            transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
      </div>

      {/* Background shimmer orb */}
      <div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(200,155,109,0.08) 0%, transparent 70%)',
          filter: 'blur(32px)',
          animation: 'float 4s ease-in-out infinite',
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(12px)',
          transition: 'opacity 0.7s cubic-bezier(0.34,1.56,0.64,1), transform 0.7s cubic-bezier(0.34,1.56,0.64,1)',
          filter: phase >= 1 ? 'blur(0)' : 'blur(6px)',
        }}
      >
        <div className="relative w-20 h-20 animate-pulse-glow rounded-2xl overflow-hidden">
          <Image
            src="/logo.png"
            alt="BrotherFit"
            fill
            priority
            unoptimized
            className="object-contain"
          />
        </div>
      </div>

      {/* Brand name */}
      <div
        className="flex items-baseline gap-0 mt-5 overflow-hidden"
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        }}
      >
        <span
          className="text-2xl font-extrabold tracking-tight text-accent"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          BROTHER
        </span>
        <span
          className="text-2xl font-extrabold tracking-tight text-primary"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          FIT
        </span>
      </div>

      {/* Tagline */}
      <p
        className="mt-1 text-[11px] text-muted tracking-[0.2em] uppercase"
        style={{
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s',
        }}
      >
        Premium Fashion
      </p>

      {/* Dots */}
      <div
        className="flex items-center gap-1.5 mt-8"
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transition: 'opacity 0.4s ease-out',
        }}
      >
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent"
            style={{
              animation: 'bounce 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
