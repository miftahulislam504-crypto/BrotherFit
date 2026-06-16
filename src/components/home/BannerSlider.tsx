'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Banner } from '@/types';

interface BannerSliderProps {
  banners: Banner[];
}

export default function BannerSlider({ banners }: BannerSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 28 });
  const [current, setCurrent] = useState(0);

  // Autoplay — pauses on interaction
  useEffect(() => {
    if (!emblaApi) return;
    let timer = setInterval(() => emblaApi.scrollNext(), 4500);
    const reset = () => {
      clearInterval(timer);
      timer = setInterval(() => emblaApi.scrollNext(), 4500);
    };
    emblaApi.on('pointerDown', reset);
    return () => {
      clearInterval(timer);
      emblaApi.off('pointerDown', reset);
    };
  }, [emblaApi]);

  // Sync dot indicator
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
    <div className="mt-4">
      {/* Carousel viewport */}
      <div ref={emblaRef} className="overflow-hidden rounded-2xl">
        <div className="flex">
          {banners.map((banner) => (
            <div key={banner.id} className="flex-none w-full">
              <BannerCard banner={banner} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot pagination */}
      {banners.length > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-3">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'rounded-full transition-all duration-300',
                i === current
                  ? 'w-5 h-1.5 bg-primary'
                  : 'w-1.5 h-1.5 bg-border hover:bg-accent/50'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BannerCard({ banner }: { banner: Banner }) {
  const inner = (
    <div
      className="relative h-44 rounded-2xl overflow-hidden flex"
      style={{ background: 'linear-gradient(135deg, #EDE8E1 0%, #F0EBE3 100%)' }}
    >
      {/* ── Left: text content ── */}
      <div className="relative z-10 flex flex-col justify-center px-5 py-5 flex-1 min-w-0">
        {/* Eyebrow label */}
        <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.15em] mb-1.5">
          New Collection
        </p>

        {/* Title */}
        <h2
          className="font-serif leading-tight text-primary"
          style={{ fontSize: 'clamp(1.1rem, 5vw, 1.4rem)', maxWidth: '10rem' }}
        >
          {banner.title}
        </h2>

        {/* Subtitle */}
        {banner.subtitle && (
          <p
            className="text-muted mt-1 leading-snug"
            style={{ fontSize: '0.7rem', maxWidth: '9rem' }}
          >
            {banner.subtitle}
          </p>
        )}

        {/* CTA */}
        <div className="mt-4">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 text-xs font-semibold',
              'bg-primary text-white rounded-full px-4 py-2',
              'transition-opacity duration-200 hover:opacity-90'
            )}
          >
            Shop Now
            <ArrowRight size={12} strokeWidth={2.5} />
          </span>
        </div>
      </div>

      {/* ── Right: image ── */}
      {banner.image ? (
        <div className="relative w-[46%] flex-shrink-0">
          {/* Soft left-edge fade so image blends into the card */}
          <div
            className="absolute inset-y-0 left-0 w-8 z-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, #EDE8E1 0%, transparent 100%)',
            }}
          />
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 448px) 46vw, 200px"
          />
        </div>
      ) : (
        /* Placeholder block when no image is set */
        <div
          className="w-[46%] flex-shrink-0 flex items-end justify-center pb-4"
          style={{
            background: 'linear-gradient(180deg, #EDE8E1 0%, #D6CCBF 100%)',
          }}
        >
          <div
            className="w-20 h-28 rounded-2xl opacity-30"
            style={{ background: '#C89B6D' }}
          />
        </div>
      )}

      {/* ── Subtle bottom-left decorative arc ── */}
      <svg
        className="absolute bottom-0 left-0 opacity-[0.06] pointer-events-none"
        width="120"
        height="80"
        viewBox="0 0 120 80"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="0" cy="80" r="100" stroke="#2C1810" strokeWidth="24" />
      </svg>
    </div>
  );

  return banner.link ? (
    <Link href={banner.link} className="block">
      {inner}
    </Link>
  ) : (
    <div>{inner}</div>
  );
}
