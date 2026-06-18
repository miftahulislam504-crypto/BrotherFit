'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star } from 'lucide-react';
import RevealSection from '@/components/ui/RevealSection';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rakib Hassan',
    location: 'Dhaka',
    rating: 5,
    review:
      'BrotherFit-এর quality সত্যিই অনেক ভালো। দাম একটু বেশি হলেও worth it। প্রতিটি পোশাক পরলে confidence অনেক বাড়ে।',
    avatar: 'RH',
    avatarBg: '#1D4ED8',
    product: 'Oversized Tee',
  },
  {
    id: 2,
    name: 'Tanvir Ahmed',
    location: 'Chittagong',
    rating: 5,
    review:
      'Gym wear-এর জন্য এত comfortable কাপড় আগে কোথাও পাইনি। Delivery ছিল super fast, packaging-ও premium।',
    avatar: 'TA',
    avatarBg: '#2C1810',
    product: 'Performance Shorts',
  },
  {
    id: 3,
    name: 'Imran Hossain',
    location: 'Sylhet',
    rating: 5,
    review:
      'বন্ধুরা সবাই জিজ্ঞেস করে কোথা থেকে কিনেছি। BrotherFit-এর ডিজাইন একদম unique। এখন শুধু এখান থেকেই কিনি।',
    avatar: 'IH',
    avatarBg: '#92400E',
    product: 'Streetwear Hoodie',
  },
  {
    id: 4,
    name: 'Fahim Rahman',
    location: 'Rajshahi',
    rating: 5,
    review:
      'Material quality অনেক ভালো, wash করার পরেও shape বা color নষ্ট হয়নি। True to size। Highly recommended!',
    avatar: 'FR',
    avatarBg: '#065F46',
    product: 'Essential Polo',
  },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(timer);
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

  return (
    <section className="mt-12 mb-4">
      <RevealSection direction="up">
        <div className="container-app section-header">
          <h2 className="font-serif text-xl text-primary">What They Say</h2>
          <div className="flex items-center gap-1">
            <Star size={12} fill="#C89B6D" className="text-accent" />
            <span className="text-xs font-semibold text-primary">4.9</span>
            <span className="text-xs text-muted">(2.4k)</span>
          </div>
        </div>
      </RevealSection>

      <RevealSection direction="up" delay={100}>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-3 px-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="flex-none w-[85vw] max-w-sm"
              >
                <div
                  className="rounded-2xl p-5 h-full flex flex-col gap-4"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #EDE8E1',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={13} fill="#C89B6D" className="text-accent" />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-sm text-text leading-relaxed flex-1">
                    &ldquo;{t.review}&rdquo;
                  </p>

                  {/* Product tag */}
                  <span
                    className="self-start px-2.5 py-1 rounded-full text-[10px] font-medium"
                    style={{ background: '#F8F6F2', color: '#9A8C82' }}
                  >
                    {t.product}
                  </span>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3 pt-1 border-t border-border">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: t.avatarBg }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary">{t.name}</p>
                      <p className="text-[10px] text-muted">{t.location}</p>
                    </div>
                    <div className="ml-auto">
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: '#EDE8E1', color: '#9A8C82' }}
                      >
                        ✓ Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '20px' : '6px',
                height: '6px',
                background: i === current ? '#2C1810' : '#EDE8E1',
              }}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </RevealSection>
    </section>
  );
}
