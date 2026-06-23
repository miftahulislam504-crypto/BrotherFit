'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { Banner } from '@/types';

interface BannerSliderProps {
  banners: Banner[];
}

export default function BannerSlider({ banners }: BannerSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 28 });
  const [current, setCurrent] = useState(0);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 4200);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  if (!banners.length) return null;

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
        transition: 'opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {banners.map((banner, i) => (
            <div key={banner.id} className="flex-none w-full">
              <BannerCard banner={banner} isActive={i === current} />
            </div>
          ))}
        </div>
      </div>

      {banners.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className="transition-all duration-400 rounded-full"
              style={{
                width:  i === current ? 20 : 6,
                height: 6,
                background: i === current ? '#2C1810' : '#D9D1C7',
                transition: 'width 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.25s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BannerCard({ banner, isActive }: { banner: Banner; isActive: boolean }) {
  const content = (
    <div
      className="relative overflow-hidden"
      style={{
        height: 'clamp(350px, 130vw, 750px)',
        background: 'linear-gradient(135deg, #EDE8E1 0%, #F8F6F2 100%)',
      }}
    >
      {banner.image && (
        <Image
          src={banner.image}
          alt={banner.title}
          fill
          className="object-cover"
          style={{
            transform: isActive ? 'scale(1)' : 'scale(1.04)',
            transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
          priority
          unoptimized
        />
      )}

      {/* Gradient overlay — richer for premium feel */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(120deg, rgba(44,24,16,0.62) 0%, rgba(44,24,16,0.28) 55%, transparent 80%)',
        }}
      />
      {/* Bottom vignette */}
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{ background: 'linear-gradient(to top, rgba(44,24,16,0.35), transparent)' }}
      />

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 pb-7">
        <p
          className="text-[11px] font-semibold text-accent uppercase tracking-[0.2em] mb-2"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}
        >
          New Collection
        </p>
        <h2
          className="font-serif text-[28px] text-white leading-tight max-w-[200px] drop-shadow-md"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
            textShadow: '0 2px 12px rgba(0,0,0,0.25)',
          }}
        >
          {banner.title}
        </h2>
        {banner.subtitle && (
          <p
            className="text-[13px] text-white/75 mt-1.5 max-w-[190px] leading-snug"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s',
            }}
          >
            {banner.subtitle}
          </p>
        )}
        <div
          className="mt-4"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s',
          }}
        >
          <span
            className="inline-flex items-center gap-2 text-primary
                       text-[13px] font-bold px-5 py-2.5 rounded-full
                       hover:scale-105 active:scale-95 transition-transform duration-200"
            style={{
              background: 'rgba(255,255,255,0.95)',
              boxShadow: '0 4px 16px rgba(44,24,16,0.18)',
              backdropFilter: 'blur(8px)',
            }}
          >
            Shop Now
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 5h6M5 2l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );

  return banner.link ? (
    <Link href={banner.link} data-cursor="Shop" style={{ cursor: 'none' }}>{content}</Link>
  ) : (
    <div>{content}</div>
  );
}
