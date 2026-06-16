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
  return (
    <div className="flex items-center gap-0">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        className={cn(
          'w-9 h-9 flex items-center justify-center rounded-l-xl border border-border',
          'transition-colors duration-200',
          'hover:bg-border/60 disabled:opacity-40 disabled:pointer-events-none'
        )}
      >
        <Minus size={14} className="text-text" />
      </button>

      <div
        className="w-12 h-9 flex items-center justify-center
                   border-t border-b border-border text-sm font-medium text-text"
      >
        {value}
      </div>

      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        className={cn(
          'w-9 h-9 flex items-center justify-center rounded-r-xl border border-border',
          'transition-colors duration-200',
          'hover:bg-border/60 disabled:opacity-40 disabled:pointer-events-none'
        )}
      >
        <Plus size={14} className="text-text" />
      </button>
    </div>
  );
}
