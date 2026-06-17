import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg flex flex-col">

      {/* Top brand bar */}
      <div className="flex items-center justify-center h-14 border-b border-border bg-surface gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="BrotherFit"
            width={28}
            height={28}
            className="object-contain"
          />
          <div className="flex items-baseline gap-0">
            <span
              className="text-base font-extrabold tracking-tight"
              style={{ color: '#C89B6D', fontFamily: 'var(--font-dm-sans)' }}
            >
              BROTHER
            </span>
            <span
              className="text-base font-extrabold tracking-tight"
              style={{ color: '#2C1810', fontFamily: 'var(--font-dm-sans)' }}
            >
              FIT
            </span>
          </div>
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
