import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg flex flex-col">

      {/* Top brand bar */}
      <div className="flex items-center justify-center h-14 border-b border-border bg-surface gap-2">
        {/* Hanger SVG */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 8 C50 8 58 8 58 16 C58 22 52 24 50 24"
            stroke="#1A1A1A"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M50 24 L14 68 C10 72 10 78 14 82 L86 82 C90 78 90 72 86 68 L50 24Z"
            stroke="#1A1A1A"
            strokeWidth="7"
            strokeLinejoin="round"
            fill="none"
          />
          <line x1="22" y1="82" x2="78" y2="82" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" />
        </svg>
        <Link href="/" className="flex items-baseline gap-0">
          <span
            className="text-base font-extrabold tracking-tight"
            style={{ color: '#C89B6D', fontFamily: 'var(--font-dm-sans)' }}
          >
            BROTHER
          </span>
          <span
            className="text-base font-extrabold tracking-tight"
            style={{ color: '#1A1A1A', fontFamily: 'var(--font-dm-sans)' }}
          >
            FIT
          </span>
        </Link>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-start justify-center px-4 pt-8 pb-12">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>

    </div>
  );
}
