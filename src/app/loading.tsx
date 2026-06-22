import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-bg animate-fade-in">
      <div className="relative w-16 h-16 animate-pulse">
        <Image
          src="/logo.png"
          alt="BrotherFit"
          fill
          priority
          unoptimized
          className="object-contain"
        />
      </div>

      <div className="flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
          style={{ animationDelay: '-0.3s' }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
          style={{ animationDelay: '-0.15s' }}
        />
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
      </div>
    </div>
  );
}
