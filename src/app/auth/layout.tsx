import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg flex flex-col">

      {/* Top brand bar */}
      <div className="flex items-center justify-center h-14 border-b border-border bg-surface">
        <Link href="/" className="font-serif text-xl text-primary tracking-wide">
          FashionOS
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
