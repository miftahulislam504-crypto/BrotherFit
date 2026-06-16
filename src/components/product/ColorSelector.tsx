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

// Fallback color map for common color names
const COLOR_MAP: Record<string, string> = {
  black:  '#1A1A1A',
  white:  '#F5F5F5',
  brown:  '#8B5E3C',
  beige:  '#D4C5B0',
  navy:   '#1B2A4A',
  red:    '#DC2626',
  green:  '#16A34A',
  blue:   '#2563EB',
  gray:   '#9CA3AF',
  grey:   '#9CA3AF',
  pink:   '#EC4899',
  camel:  '#C89B6D',
  cream:  '#F5F0E8',
  khaki:  '#BDB76B',
};

function resolveColor(color: ColorOption): string {
  if (color.hex) return color.hex;
  return COLOR_MAP[color.name.toLowerCase()] ?? '#9A8C82';
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
        Select Color
        {selected && (
          <span className="text-muted font-normal ml-2">: {selected}</span>
        )}
      </p>
      <div className="flex flex-wrap gap-3">
        {colors.map(color => {
          const available = availableColors.includes(color.name);
          const isSelected = selected === color.name;
          const hex = resolveColor(color);

          return (
            <button
              key={color.name}
              onClick={() => available && onSelect(color.name)}
              disabled={!available}
              title={color.name}
              className={cn(
                'relative w-9 h-9 rounded-full transition-all duration-200',
                isSelected
                  ? 'ring-2 ring-offset-2 ring-primary'
                  : available
                  ? 'hover:ring-2 hover:ring-offset-2 hover:ring-border'
                  : 'opacity-30 cursor-not-allowed'
              )}
              style={{ backgroundColor: hex }}
            >
              {/* White swatch needs border */}
              {(color.name.toLowerCase() === 'white' ||
                color.name.toLowerCase() === 'cream') && (
                <span className="absolute inset-0 rounded-full border border-border" />
              )}
              {/* Out of stock diagonal */}
              {!available && (
                <span className="absolute inset-0 rounded-full overflow-hidden">
                  <span className="absolute w-full h-px bg-white/60 rotate-45 top-1/2" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
