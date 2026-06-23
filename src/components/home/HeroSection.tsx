'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

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
    transform: `translate(${mousePos.x * -16}px, ${mousePos.y * -10}px)`,
    transition: 'transform 0.4s ease-out',
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
      {/* ── Full-bleed background image (NEW: premium backdrop) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 10% 20%, rgba(29, 78, 216, 0.38) 0%, transparent 55%),
              radial-gradient(ellipse at 90% 80%, rgba(200, 155, 109, 0.28) 0%, transparent 55%),
              radial-gradient(ellipse at 55% 15%, rgba(99, 102, 241, 0.22) 0%, transparent 45%),
              radial-gradient(ellipse at 35% 85%, rgba(44, 24, 16, 0.5) 0%, transparent 55%),
              linear-gradient(160deg, #0A0F1F 0%, #111827 50%, #0A0F1F 100%)
            `,
          }}
        />
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
          }}
        />
      </div>

      {/* ── Floating orbs (bigger, more premium) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '8%', left: '5%',
          width: '340px', height: '340px',
          background: 'radial-gradient(circle, rgba(29,78,216,0.18) 0%, transparent 70%)',
          animation: 'float 9s ease-in-out infinite',
          filter: 'blur(50px)',
          zIndex: 1,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '15%', right: '2%',
          width: '280px', height: '280px',
          background: 'radial-gradient(circle, rgba(200,155,109,0.22) 0%, transparent 70%)',
          animation: 'float 7s ease-in-out 2s infinite',
          filter: 'blur(40px)',
          zIndex: 1,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '40%', left: '30%',
          width: '180px', height: '180px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          animation: 'float 11s ease-in-out 1s infinite',
          filter: 'blur(30px)',
          zIndex: 1,
        }}
      />

      {/* ── Main content ── */}
      <div
        className="relative flex flex-col"
        style={{
          minHeight: '100dvh',
          paddingTop: 'var(--header-height)',
          paddingBottom: '90px',
          zIndex: 10,
        }}
      >
        <div className="container-app flex flex-col flex-1 pt-6">

          {/* Eyebrow pill — premium */}
          <div
            className="flex items-center gap-2 mb-5"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s',
            }}
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(200,155,109,0.12)',
                border: '1px solid rgba(200,155,109,0.3)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Sparkles size={11} style={{ color: '#C89B6D' }} />
              <span
                className="text-[10px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: '#C89B6D' }}
              >
                New Collection 2026
              </span>
              <Sparkles size={11} style={{ color: '#C89B6D' }} />
            </div>
          </div>

          {/* Headline — bigger, more impactful */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
            }}
          >
            <h1
              className="font-serif leading-[1.0] text-white mb-3"
              style={{ fontSize: 'clamp(3rem, 13vw, 5.5rem)' }}
            >
              Built For
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #C89B6D 0%, #F0D9B5 40%, #E8C9A0 65%, #C89B6D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 24px rgba(200,155,109,0.35))',
                }}
              >
                Brotherhood.
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <p
            className="text-sm leading-relaxed mb-5"
            style={{
              color: '#94A3B8',
              maxWidth: '280px',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
            }}
          >
            Premium Streetwear & Fitness Apparel — crafted for those who move with purpose.
          </p>

          {/* ── HERO PRODUCT BANNER (much bigger & premium) ── */}
          <div
            className="relative w-full mb-6"
            style={{
              opacity: mounted ? 1 : 0,
              transition: 'opacity 1s ease-out 0.35s',
            }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute -inset-3 rounded-[36px] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(29,78,216,0.2) 0%, rgba(200,155,109,0.12) 50%, transparent 70%)',
                filter: 'blur(20px)',
                animation: 'pulseGlow 4s ease-in-out infinite',
              }}
            />

            {/* Main banner card */}
            <div
              className="relative w-full rounded-[28px] overflow-hidden"
              style={{
                aspectRatio: '9/13',
                background: 'linear-gradient(170deg, rgba(29,78,216,0.12) 0%, rgba(10,15,31,0.6) 40%, rgba(200,155,109,0.08) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: `
                  0 40px 100px rgba(0,0,0,0.6),
                  0 0 0 1px rgba(200,155,109,0.08),
                  inset 0 1px 0 rgba(255,255,255,0.08)
                `,
              }}
            >
              {/* Product image with parallax */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={parallaxStyle}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/logo.png"
                    alt="BrotherFit Premium Collection"
                    fill
                    className="object-contain p-10"
                    priority
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                </div>
              </div>

              {/* Premium top-left tag */}
              <div
                className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(10,15,31,0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(200,155,109,0.25)',
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: '#C89B6D',
                    animation: 'blink 2s ease-in-out infinite',
                  }}
                />
                <span className="text-[10px] font-semibold tracking-wide" style={{ color: '#C89B6D' }}>
                  PREMIUM
                </span>
              </div>

              {/* New Drop badge — top right */}
              <div
                className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full text-[11px] font-bold"
                style={{
                  background: 'linear-gradient(135deg, #C89B6D, #E8C9A0)',
                  color: '#0A0F1F',
                  boxShadow: '0 4px 20px rgba(200,155,109,0.45)',
                  animation: 'float 5s ease-in-out 1s infinite',
                }}
              >
                New Drop ✦
              </div>

              {/* Bottom info bar */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4"
                style={{
                  background: 'linear-gradient(to top, rgba(10,15,31,0.92) 0%, transparent 100%)',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p
                      className="text-xs font-medium mb-0.5"
                      style={{ color: '#94A3B8' }}
                    >
                      BrotherFit Exclusive
                    </p>
                    <p
                      className="text-base font-bold font-serif"
                      style={{ color: '#F1F5F9' }}
                    >
                      SS'26 Collection
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {'★★★★★'.split('').map((s, i) => (
                        <span key={i} style={{ color: '#C89B6D', fontSize: '11px' }}>{s}</span>
                      ))}
                      <span className="text-[10px] ml-1" style={{ color: '#64748B' }}>4.9 (2.1k)</span>
                    </div>
                  </div>
                  <div
                    className="flex flex-col items-end"
                    style={{ animation: 'float 6s ease-in-out 0.5s infinite' }}
                  >
                    <span className="text-[10px]" style={{ color: '#64748B' }}>🇧🇩 BD Made</span>
                    <span
                      className="text-lg font-bold font-serif mt-0.5"
                      style={{ color: '#C89B6D' }}
                    >
                      ৳1,299+
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Side floating accent — left */}
            <div
              className="absolute -left-2 top-1/3 z-20 px-2 py-2 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                animation: 'float 7s ease-in-out 1.5s infinite',
              }}
            >
              <span className="text-base">🔥</span>
            </div>

            {/* Side floating accent — right */}
            <div
              className="absolute -right-2 top-2/3 z-20 px-2 py-2 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                animation: 'float 8s ease-in-out 0.8s infinite',
              }}
            >
              <span className="text-base">💪</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col gap-3 mb-5"
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
                background: 'linear-gradient(135deg, #C89B6D 0%, #E8C9A0 50%, #C89B6D 100%)',
                backgroundSize: '200% 100%',
                color: '#0A0F1F',
                boxShadow: '0 8px 36px rgba(200,155,109,0.4)',
                letterSpacing: '0.03em',
              }}
            >
              Shop Now
              <ArrowRight size={16} strokeWidth={2.5} className="btn-arrow" />
            </Link>
            <Link
              href="/products?sort=newest"
              className="flex items-center justify-center gap-2 py-4 rounded-full font-medium text-sm"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#E2E8F0',
                backdropFilter: 'blur(8px)',
              }}
            >
              Explore Collection
            </Link>
          </div>

          {/* Stats strip */}
          <div
            className="flex items-center justify-around py-3 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(8px)',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 1s ease-out 0.7s',
            }}
          >
            {[
              { value: '50K+', label: 'Customers' },
              { value: '4.9★', label: 'Rating' },
              { value: '100%', label: 'Original' },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex flex-col items-center gap-0.5 flex-1">
                {i > 0 && (
                  <div
                    className="absolute h-6 w-px"
                    style={{ background: 'rgba(255,255,255,0.08)', left: `${i * 33.3}%` }}
                  />
                )}
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
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        style={{
          animation: 'float 2.5s ease-in-out infinite',
          opacity: 0.45,
        }}
      >
        <span className="text-[10px] tracking-widest uppercase text-white/40">Scroll</span>
        <ChevronDown size={14} className="text-white/40" />
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #F8F6F2 100%)',
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
