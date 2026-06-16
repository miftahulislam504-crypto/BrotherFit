'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Banner } from '@/types';

interface BannerSliderProps {
  banners: Banner[];
}

export default function BannerSlider({ banners }: BannerSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(0);

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  // Track current slide
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
        <div className="flex justify-center gap-1.5 mt-3">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-5 h-1.5 bg-primary'
                  : 'w-1.5 h-1.5 bg-border'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BannerCard({ banner }: { banner: Banner }) {
  const content = (
    <div
      className="relative h-44 rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #EDE8E1 0%, #F8F6F2 100%)' }}
    >
      {banner.image && (
        <Image
          src={banner.image}
          alt={banner.title}
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col justify-center p-5">
        <p className="text-xs font-medium text-accent uppercase tracking-widest mb-1">
          New Collection
        </p>
        <h2 className="font-serif text-2xl text-primary leading-tight max-w-[180px]">
          {banner.title}
        </h2>
        {banner.subtitle && (
          <p className="text-xs text-muted mt-1 max-w-[160px]">
            {banner.subtitle}
          </p>
        )}
        <div className="mt-3">
          <span
            className="inline-flex items-center gap-1 bg-primary text-white
                       text-xs font-medium px-4 py-2 rounded-full"
          >
            Shop Now
          </span>
        </div>
      </div>
    </div>
  );

  return banner.link ? (
    <Link href={banner.link}>{content}</Link>
  ) : (
    <div>{content}</div>
  );
}
