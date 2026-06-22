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
      className="mt-4"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
        transition: 'opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      <div ref={emblaRef} className="overflow-hidden rounded-2xl">
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
      className="relative h-48 rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #EDE8E1 0%, #F8F6F2 100%)' }}
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

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(44,24,16,0.45) 0%, transparent 65%)',
        }}
      />

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col justify-center p-5">
        <p
          className="text-xs font-medium text-accent/90 uppercase tracking-widest mb-1.5"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
          }}
        >
          New Collection
        </p>
        <h2
          className="font-serif text-2xl text-white leading-tight max-w-[180px] drop-shadow-sm"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
          }}
        >
          {banner.title}
        </h2>
        {banner.subtitle && (
          <p
            className="text-xs text-white/70 mt-1 max-w-[160px]"
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
          className="mt-3"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s',
          }}
        >
          <span
            className="inline-flex items-center gap-1.5 bg-white text-primary
                       text-xs font-semibold px-4 py-2 rounded-full
                       hover:scale-105 transition-transform duration-200"
          >
            Shop Now
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
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
