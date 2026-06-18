'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade';

interface RevealSectionProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const directionStyles: Record<Direction, { hidden: string; visible: string }> = {
  up:    { hidden: 'translate-y-8 opacity-0', visible: 'translate-y-0 opacity-100' },
  down:  { hidden: '-translate-y-8 opacity-0', visible: 'translate-y-0 opacity-100' },
  left:  { hidden: 'translate-x-8 opacity-0', visible: 'translate-x-0 opacity-100' },
  right: { hidden: '-translate-x-8 opacity-0', visible: 'translate-x-0 opacity-100' },
  fade:  { hidden: 'opacity-0', visible: 'opacity-100' },
};

export default function RevealSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 600,
  className,
  once = true,
}: RevealSectionProps) {
  const { ref, isVisible } = useScrollReveal({ once });
  const styles = directionStyles[direction];

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        isVisible ? styles.visible : styles.hidden,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
