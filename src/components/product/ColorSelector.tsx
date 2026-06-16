'use client';

import { cn } from '@/lib/utils';

export interface ColorOption {
  name: string;
  hex?: string;
}

interface ColorSelectorProps {
  colors: ColorOption[];
  availableColors: string[];
  selected: string | null;
  onSelect: (color: string) => void;
}

export default function ColorSelector({
  colors,
  availableColors,
  selected,
  onSelect,
}: ColorSelectorProps) {
  return (
    <div>
      <p className="text-sm font-medium text-text mb-3">
        Select Color{selected ? (
          <span className="font-normal text-muted"> : {selected}</span>
        ) : null}
      </p>

      <div className="flex flex-wrap gap-2.5">
        {colors.map(({ name, hex }) => {
          const available = availableColors.includes(name);
          const isSelected = selected === name;
          const bg = hex ?? '#cccccc';

          return (
            <button
              key={name}
              onClick={() => available && onSelect(name)}
              disabled={!available}
              title={name}
              className={cn(
                'relative w-8 h-8 rounded-full transition-all duration-200',
                'border-2',
                isSelected
                  ? 'border-primary scale-110 shadow-md'
                  : available
                  ? 'border-border/60 hover:border-primary/60 hover:scale-105'
                  : 'border-border/30 opacity-40 cursor-not-allowed'
              )}
              style={{ backgroundColor: bg }}
              aria-label={`${name}${!available ? ' (out of stock)' : ''}`}
            >
              {/* Selected tick */}
              {isSelected && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}

              {/* Strikethrough for out-of-stock */}
              {!available && (
                <span
                  className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                  aria-hidden
                >
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-full h-px bg-black/30 rotate-45 block" />
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
