'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'popular';

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest',     label: 'Newest' },
  { value: 'popular',    label: 'Popular' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

export default function SortSelect({ value, onChange, className }: SortSelectProps) {
  const current = OPTIONS.find(o => o.value === value)?.label ?? 'Sort';

  return (
    <div className={cn('relative', className)}>
      <select
        value={value}
        onChange={e => onChange(e.target.value as SortOption)}
        className="appearance-none bg-surface border border-border rounded-xl
                   pl-3 pr-8 py-2 text-xs font-medium text-text
                   focus:outline-none focus:border-accent
                   transition-colors duration-200 cursor-pointer"
      >
        {OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
      />
    </div>
  );
}
