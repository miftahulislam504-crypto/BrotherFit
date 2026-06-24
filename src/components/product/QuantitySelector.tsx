import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export default function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
  disabled = false,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (disabled || value <= min) return;
    onChange(Math.max(min, value - 1));
  };

  const handleIncrement = () => {
    if (disabled || value >= max) return;
    onChange(Math.min(max, value + 1));
  };

  return (
    <div className="flex items-center gap-0">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        className={cn(
          'w-9 h-9 flex items-center justify-center rounded-l-xl border border-border',
          'transition-colors duration-200 select-none',
          'active:bg-border',
          disabled || value <= min
            ? 'opacity-40 pointer-events-none'
            : 'hover:bg-border/60 cursor-pointer'
        )}
      >
        <Minus size={14} className="text-text" />
      </button>

      <div
        className="w-12 h-9 flex items-center justify-center
                   border-t border-b border-border text-sm font-medium text-text
                   select-none"
      >
        {value}
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
        className={cn(
          'w-9 h-9 flex items-center justify-center rounded-r-xl border border-border',
          'transition-colors duration-200 select-none',
          'active:bg-border',
          disabled || value >= max
            ? 'opacity-40 pointer-events-none'
            : 'hover:bg-border/60 cursor-pointer'
        )}
      >
        <Plus size={14} className="text-text" />
      </button>
    </div>
  );
}
