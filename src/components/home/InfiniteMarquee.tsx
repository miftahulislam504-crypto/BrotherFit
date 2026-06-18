import { cn } from '@/lib/utils';

const ITEMS = [
  'BROTHERFIT',
  '✦',
  'PREMIUM',
  '✦',
  'STREETWEAR',
  '✦',
  'FITNESS',
  '✦',
  'ESSENTIALS',
  '✦',
  'BANGLADESH',
  '✦',
  'NEW COLLECTION',
  '✦',
  'BROTHERFIT',
  '✦',
  'PREMIUM',
  '✦',
  'STREETWEAR',
  '✦',
  'FITNESS',
  '✦',
  'ESSENTIALS',
  '✦',
  'BANGLADESH',
  '✦',
  'NEW COLLECTION',
  '✦',
];

interface InfiniteMarqueeProps {
  dark?: boolean;
  className?: string;
}

export default function InfiniteMarquee({ dark = false, className }: InfiniteMarqueeProps) {
  return (
    <div
      className={cn('overflow-hidden py-4', className)}
      style={{
        background: dark ? '#0A0F1F' : '#2C1810',
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marquee 30s linear infinite',
        }}
      >
        {ITEMS.map((item, i) => (
          <span
            key={i}
            className={cn(
              'text-xs font-semibold tracking-[0.25em] uppercase px-4 whitespace-nowrap',
              item === '✦'
                ? 'text-accent opacity-70'
                : dark
                ? 'text-white/80'
                : 'text-white/90'
            )}
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
