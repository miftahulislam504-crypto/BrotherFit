'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Fallback: কোনো image না থাকলে placeholder দেখাও
  if (!images.length) {
    return (
      <div className="w-full aspect-[4/5] bg-border/40 rounded-none flex items-center justify-center">
        <span className="text-muted text-sm">No image</span>
      </div>
    );
  }

  const activeImage = images[activeIdx];
  // Thumbnail গুলো: সব image — বেশি হলে +N badge
  const MAX_THUMBS = 5;
  const thumbs = images.slice(0, MAX_THUMBS);
  const extra = images.length - MAX_THUMBS;

  return (
    <div className="flex flex-col gap-3">

      {/* ── Main image ─────────────────────────────── */}
      <div className="relative w-full aspect-[4/5] bg-bg overflow-hidden">
        <Image
          key={activeIdx}
          src={activeImage}
          alt={`${productName} – image ${activeIdx + 1}`}
          fill
          priority={activeIdx === 0}
          className="object-cover transition-opacity duration-300"
          sizes="100vw"
        />

        {/* Image counter badge — top-right */}
        <span
          className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm
                     text-white text-[10px] font-medium px-2 py-0.5 rounded-full"
        >
          {activeIdx + 1} / {images.length}
        </span>
      </div>

      {/* ── Thumbnail row ──────────────────────────── */}
      {images.length > 1 && (
        <div className="flex gap-2 px-4 overflow-x-auto scrollbar-none">
          {thumbs.map((src, idx) => {
            const isLast = idx === MAX_THUMBS - 1 && extra > 0;
            return (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  'relative flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden',
                  'border-2 transition-all duration-200',
                  activeIdx === idx
                    ? 'border-primary scale-[1.04] shadow-md'
                    : 'border-border/50 hover:border-border'
                )}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={src}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />

                {/* +N overlay on last thumb */}
                {isLast && (
                  <div
                    className="absolute inset-0 bg-black/55 flex items-center
                               justify-center text-white text-xs font-semibold"
                  >
                    +{extra}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
}
