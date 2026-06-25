import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Mail } from 'lucide-react';

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

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <Instagram size={16} strokeWidth={1.8} />
    ),
  },
  {
    label: 'Facebook Page',
    href: 'https://www.facebook.com/share/18vchTD5Mm/',
    icon: (
      <Facebook size={16} strokeWidth={1.8} />
    ),
  },
  {
    label: 'Facebook Group',
    href: 'https://www.facebook.com/share/g/14gEC8vW15E/',
    icon: (
      /* Group icon — two people */
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/8801341246069',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.87a8.18 8.18 0 004.78 1.54V6.94a4.85 4.85 0 01-1.01-.25z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:brotherfit06@gmail.com',
    icon: (
      <Mail size={16} strokeWidth={1.8} />
    ),
  },
];

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
            {/* Logo — white bg rounded container তে রাখা হয়েছে যাতে dark footer-এ দেখা যায় */}
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
              <Image
                src="/logo.png"
                alt="BrotherFit"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
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
          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            {SOCIAL.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94A3B8',
                }}
                aria-label={label}
                title={label}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Contact info */}
          <div className="mt-4 space-y-1.5">
            <a
              href="mailto:brotherfit06@gmail.com"
              className="flex items-center gap-2 text-xs transition-colors duration-200 hover:text-amber-400"
              style={{ color: '#64748B' }}
            >
              <Mail size={12} />
              brotherfit06@gmail.com
            </a>
            <a
              href="https://wa.me/8801341246069"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs transition-colors duration-200 hover:text-green-400"
              style={{ color: '#64748B' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              01341-246069
            </a>
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
            Proudly made in Bangladesh
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
