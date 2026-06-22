import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook } from 'lucide-react';

const LINKS = {
  Shop: [
    { label: 'Men',          href: '/products?gender=men' },
    { label: 'Collections',  href: '/products' },
    { label: 'New Arrivals', href: '/products?sort=newest' },
    { label: 'Best Sellers', href: '/products?sort=popular' },
  ],
  Company: [
    { label: 'About Us',  href: '/support' },
    { label: 'Contact',   href: '/support' },
    { label: 'Blog',      href: '/support' },
  ],
  Support: [
    { label: 'Shipping & Delivery', href: '/support' },
    { label: 'Returns & Refunds',   href: '/support' },
    { label: 'FAQ',                 href: '/support' },
    { label: 'Track Order',         href: '/account/orders' },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0A0F1F',
        paddingBottom: 'calc(var(--bottom-nav-height) + 16px)',
      }}
    >
      {/* Top border */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(200,155,109,0.4), transparent)',
        }}
      />

      <div className="container-app py-10">

        {/* Brand */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 mb-3">
            <Image
              src="/logo.png"
              alt="BrotherFit"
              width={32}
              height={32}
              className="object-contain brightness-0 invert"
            />
            <div className="flex items-baseline">
              <span
                className="text-base font-extrabold tracking-tight leading-none"
                style={{ color: '#C89B6D', fontFamily: 'var(--font-dm-sans)' }}
              >
                BROTHER
              </span>
              <span
                className="text-base font-extrabold tracking-tight leading-none"
                style={{ color: '#FFFFFF', fontFamily: 'var(--font-dm-sans)' }}
              >
                FIT
              </span>
            </div>
          </Link>
          <p className="text-xs leading-relaxed max-w-[220px]" style={{ color: '#64748B' }}>
            Premium streetwear & fitness apparel. Built for brotherhood. Made in Bangladesh.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 mt-4">
            {[
              { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
              { icon: Facebook,  href: 'https://facebook.com',  label: 'Facebook' },
              {
                // TikTok SVG
                icon: null,
                href: 'https://tiktok.com',
                label: 'TikTok',
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94A3B8',
                }}
                aria-label={label}
              >
                {Icon ? (
                  <Icon size={16} strokeWidth={1.8} />
                ) : (
                  /* TikTok icon */
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.87a8.18 8.18 0 004.78 1.54V6.94a4.85 4.85 0 01-1.01-.25z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <p
                className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-3"
                style={{ color: '#C89B6D' }}
              >
                {title}
              </p>
              <ul className="space-y-2.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs transition-colors duration-200 hover:text-slate-400"
                      style={{ color: '#64748B' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-[10px]" style={{ color: '#334155' }}>
            © 2026 BrotherFit. All rights reserved.
          </p>
          <p className="text-[10px]" style={{ color: '#334155' }}>
            🇧🇩 Proudly made in Bangladesh
          </p>
          <div className="flex items-center gap-3 mt-1">
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <Link
                key={item}
                href="/support"
                className="text-[10px] transition-colors duration-200"
                style={{ color: '#334155' }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
