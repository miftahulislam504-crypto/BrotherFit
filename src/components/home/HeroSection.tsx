'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const hero = heroRef.current;
    hero?.addEventListener('mousemove', handleMouseMove);
    return () => hero?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxStyle = {
    transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -8}px)`,
    transition: 'transform 0.3s ease-out',
  };

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden"
      style={{
        minHeight: '100dvh',
        background: '#0A0F1F',
      }}
    >
      {/* ── Animated mesh gradient background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 15% 25%, rgba(29, 78, 216, 0.28) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 75%, rgba(200, 155, 109, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 20%, rgba(99, 102, 241, 0.18) 0%, transparent 40%),
            radial-gradient(ellipse at 40% 80%, rgba(44, 24, 16, 0.4) 0%, transparent 50%),
            #0A0F1F
          `,
        }}
      />

      {/* ── Noise texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* ── Floating orbs ── */}
      <div
        className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(29,78,216,0.15) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
          filter: 'blur(20px)',
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(200,155,109,0.2) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out 2s infinite',
          filter: 'blur(16px)',
        }}
      />

      {/* ── Main content ── */}
      <div
        className="relative z-10 flex flex-col justify-center"
        style={{
          minHeight: '100dvh',
          paddingTop: 'var(--header-height)',
          paddingBottom: '80px',
        }}
      >
        <div className="container-app flex flex-col gap-8 pt-8">

          {/* Eyebrow */}
          <div
            className="flex items-center gap-3"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s',
            }}
          >
            <div className="h-px w-8 bg-accent opacity-60" />
            <span
              className="text-[11px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#C89B6D' }}
            >
              New Collection 2026
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
            }}
          >
            <h1
              className="font-serif leading-[1.05] text-white"
              style={{ fontSize: 'clamp(2.6rem, 10vw, 4.5rem)' }}
            >
              Built For
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #C89B6D 0%, #E8C9A0 50%, #C89B6D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Brotherhood.
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <p
            className="text-sm leading-relaxed max-w-xs"
            style={{
              color: '#94A3B8',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.35s, transform 0.8s ease-out 0.35s',
            }}
          >
            Premium Streetwear & Fitness Apparel — crafted for those who move with purpose.
          </p>

          {/* Product visual with parallax */}
          <div
            className="relative mx-auto w-full max-w-[280px]"
            style={{
              opacity: mounted ? 1 : 0,
              transition: 'opacity 1s ease-out 0.4s',
            }}
          >
            {/* Glow behind product */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(29,78,216,0.35) 0%, transparent 70%)',
                filter: 'blur(30px)',
                transform: 'scale(0.8)',
                animation: 'pulseGlow 4s ease-in-out infinite',
              }}
            />

            {/* Product image container */}
            <div
              className="relative z-10 mx-auto"
              style={parallaxStyle}
            >
              <div
                className="relative w-full rounded-3xl overflow-hidden"
                style={{
                  aspectRatio: '3/4',
                  background: 'linear-gradient(180deg, rgba(29,78,216,0.08) 0%, rgba(10,15,31,0.4) 100%)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
                  animation: 'float 7s ease-in-out infinite',
                }}
              >
                <Image
                  src="/logo.png"
                  alt="BrotherFit Premium Collection"
                  fill
                  className="object-contain p-8"
                  priority
                  sizes="280px"
                />
                {/* Shimmer overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
                  }}
                />
              </div>
            </div>

            {/* Floating badge — top right */}
            <div
              className="absolute -top-3 -right-3 z-20 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'linear-gradient(135deg, #C89B6D, #E8C9A0)',
                color: '#0A0F1F',
                boxShadow: '0 4px 16px rgba(200,155,109,0.4)',
                animation: 'float 5s ease-in-out 1s infinite',
              }}
            >
              New Drop ✦
            </div>

            {/* Floating badge — bottom left */}
            <div
              className="absolute -bottom-3 -left-3 z-20 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#E2E8F0',
                animation: 'float 6s ease-in-out 0.5s infinite',
              }}
            >
              🇧🇩 Made for Bangladesh
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col gap-3"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s',
            }}
          >
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-sm"
              style={{
                background: 'linear-gradient(135deg, #C89B6D 0%, #E8C9A0 100%)',
                color: '#0A0F1F',
                boxShadow: '0 8px 32px rgba(200,155,109,0.35)',
              }}
            >
              Shop Now
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link
              href="/products?sort=newest"
              className="flex items-center justify-center gap-2 py-4 rounded-full font-medium text-sm"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#E2E8F0',
                backdropFilter: 'blur(8px)',
              }}
            >
              Explore Collection
            </Link>
          </div>

          {/* Stats strip */}
          <div
            className="flex items-center justify-around pt-2 pb-2"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.07)',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 1s ease-out 0.7s',
            }}
          >
            {[
              { value: '50K+', label: 'Customers' },
              { value: '4.9★', label: 'Rating' },
              { value: '100%', label: 'Original' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span
                  className="text-lg font-bold font-serif"
                  style={{ color: '#C89B6D' }}
                >
                  {value}
                </span>
                <span className="text-[10px] font-medium" style={{ color: '#64748B' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        style={{
          animation: 'float 2.5s ease-in-out infinite',
          opacity: 0.5,
        }}
      >
        <span className="text-[10px] tracking-widest uppercase text-white/40">Scroll</span>
        <ChevronDown size={14} className="text-white/40" />
      </div>

      {/* ── Bottom fade into warm section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #F8F6F2 100%)',
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
