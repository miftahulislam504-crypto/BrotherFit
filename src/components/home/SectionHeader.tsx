import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
}

export default function SectionHeader({
  title,
  href,
  linkLabel = 'See All',
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h2 className="font-serif text-xl text-primary">{title}</h2>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-xs text-muted
                     hover:text-primary transition-colors duration-200"
        >
          {linkLabel}
          <ArrowRight size={13} />
        </Link>
      )}
    </div>
  );
}
