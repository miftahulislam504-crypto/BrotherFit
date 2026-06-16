import { cn } from '@/lib/utils';
import type { SizeOption } from '@/types';

interface SizeSelectorProps {
  sizes: SizeOption[];
  availableSizes: SizeOption[];
  selected: SizeOption | null;
  onSelect: (size: SizeOption) => void;
}

export default function SizeSelector({
  sizes,
  availableSizes,
  selected,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div>
      <p className="text-sm font-medium text-text mb-3">Select Size</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map(size => {
          const available = availableSizes.includes(size);
          const isSelected = selected === size;

          return (
            <button
              key={size}
              onClick={() => available && onSelect(size)}
              disabled={!available}
              className={cn(
                'min-w-[44px] h-10 px-3 rounded-xl border text-sm font-medium transition-all duration-200',
                isSelected
                  ? 'bg-primary text-white border-primary'
                  : available
                  ? 'bg-surface border-border text-text hover:border-primary'
                  : 'bg-surface border-border/50 text-muted/50 cursor-not-allowed relative overflow-hidden'
              )}
            >
              {size}
              {/* Strikethrough line for out of stock */}
              {!available && (
                <span
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  aria-hidden
                >
                  <span className="absolute w-full h-px bg-muted/30 rotate-45" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
