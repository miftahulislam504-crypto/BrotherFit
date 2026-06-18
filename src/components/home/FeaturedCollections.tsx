import Link from 'next/link';
import RevealSection from '@/components/ui/RevealSection';

const COLLECTIONS = [
  {
    slug: 'essentials',
    label: 'Essentials',
    desc: 'Everyday must-haves',
    emoji: '🖤',
    gradient: 'from-slate-900 to-slate-700',
    accent: '#64748B',
  },
  {
    slug: 'oversized',
    label: 'Oversized',
    desc: 'Relaxed & bold fits',
    emoji: '💪',
    gradient: 'from-stone-800 to-stone-600',
    accent: '#78716C',
  },
  {
    slug: 'performance',
    label: 'Performance',
    desc: 'Built for the grind',
    emoji: '⚡',
    gradient: 'from-blue-900 to-blue-700',
    accent: '#3B82F6',
  },
  {
    slug: 'streetwear',
    label: 'Streetwear',
    desc: 'Street-ready style',
    emoji: '🔥',
    gradient: 'from-amber-900 to-amber-700',
    accent: '#F59E0B',
  },
];

export default function FeaturedCollections() {
  return (
    <section className="mt-8 container-app">
      <RevealSection direction="up">
        <div className="section-header">
          <h2 className="font-serif text-xl text-primary">Collections</h2>
          <Link
            href="/products"
            className="text-xs text-muted hover:text-primary transition-colors"
          >
            View All →
          </Link>
        </div>
      </RevealSection>

      <div className="grid grid-cols-2 gap-3">
        {COLLECTIONS.map((col, i) => (
          <RevealSection key={col.slug} direction="up" delay={i * 80}>
            <Link
              href={`/products?category=${col.slug}`}
              className="group block relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: '1/1' }}
            >
              {/* Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${col.gradient} transition-all duration-500 group-hover:scale-105`}
              />

              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${col.accent}30 0%, transparent 70%)`,
                }}
              />

              {/* Border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: `inset 0 0 0 1px ${col.accent}50`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-4">
                {/* Emoji */}
                <span className="text-3xl">{col.emoji}</span>

                {/* Labels — slide up on hover */}
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-sm leading-tight">
                    {col.label}
                  </p>
                  <p
                    className="text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {col.desc}
                  </p>
                </div>
              </div>
            </Link>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}
