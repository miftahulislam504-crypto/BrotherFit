'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';

export default function LifestyleSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      className="mt-12 relative overflow-hidden"
      style={{
        background: '#0A0F1F',
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        padding: '80px 0',
      }}
    >
      {/* Background layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 80% 20%, rgba(29, 78, 216, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(200, 155, 109, 0.18) 0%, transparent 50%)
          `,
        }}
      />

      {/* Decorative line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(200,155,109,0.4), transparent)',
        }}
      />

      <div
        ref={ref}
        className="max-w-md mx-auto px-6 text-center"
      >
        {/* Eyebrow */}
        <div
          className="flex items-center justify-center gap-3 mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <div className="h-px w-10" style={{ background: 'rgba(200,155,109,0.5)' }} />
          <span
            className="text-[10px] font-semibold tracking-[0.25em] uppercase"
            style={{ color: '#C89B6D' }}
          >
            The BrotherFit Way
          </span>
          <div className="h-px w-10" style={{ background: 'rgba(200,155,109,0.5)' }} />
        </div>

        {/* Headline */}
        <h2
          className="font-serif text-white leading-tight mb-4"
          style={{
            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out 0.1s, transform 0.8s ease-out 0.1s',
          }}
        >
          More Than Clothing.
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #C89B6D 0%, #E8C9A0 50%, #C89B6D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            A Brotherhood.
          </span>
        </h2>

        {/* Body text */}
        <p
          className="text-sm leading-relaxed mb-8"
          style={{
            color: '#94A3B8',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
          }}
        >
          Every stitch tells a story. Every fit builds confidence. BrotherFit is not just a brand — it&apos;s a mindset worn by those who choose excellence every day.
        </p>

        {/* Values pills */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease-out 0.3s',
          }}
        >
          {['Premium Quality', 'Bold Design', 'True Fit', 'Local Pride'].map((val) => (
            <span
              key={val}
              className="px-4 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#CBD5E1',
              }}
            >
              {val}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
          }}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
            style={{
              background: 'linear-gradient(135deg, #C89B6D, #E8C9A0)',
              color: '#0A0F1F',
              boxShadow: '0 8px 24px rgba(200,155,109,0.3)',
            }}
          >
            Explore the Collection
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      {/* Decorative line bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(200,155,109,0.4), transparent)',
        }}
      />
    </section>
  );
}
