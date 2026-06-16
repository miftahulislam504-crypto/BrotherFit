'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="w-full aspect-[4/5] bg-border rounded-none" />
    );
  }

  return (
    <div>
      {/* Main image — full width, no horizontal margin */}
      <div className="relative -mx-4 aspect-[4/5] bg-bg overflow-hidden">
        <Image
          key={activeIndex}
          src={images[activeIndex]}
          alt={`${productName} - image ${activeIndex + 1}`}
          fill
          className="object-cover animate-fade-in"
          priority={activeIndex === 0}
          sizes="100vw"
        />

        {/* Image count indicator */}
        {images.length > 1 && (
          <div
            className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm
                       text-white text-xs font-medium px-2.5 py-1 rounded-full"
          >
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="scroll-row mt-3 px-0 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'flex-none w-16 h-20 relative rounded-xl overflow-hidden border-2 transition-all duration-200',
                i === activeIndex
                  ? 'border-primary'
                  : 'border-transparent opacity-60 hover:opacity-100'
              )}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
              {/* More indicator on last thumb */}
              {i === 4 && images.length > 5 && (
                <div
                  className="absolute inset-0 bg-black/50 flex items-center
                             justify-center text-white text-xs font-medium"
                >
                  +{images.length - 5}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
