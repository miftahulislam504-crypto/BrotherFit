'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import ProductCard from '@/components/product/ProductCard';
import { Spinner } from '@/components/ui';
import SiteLayout from '@/components/layout/SiteLayout';
import type { Product } from '@/types';

// Simple prefix search on product name (Firestore workaround)
async function searchProducts(term: string): Promise<Product[]> {
  if (!term.trim()) return [];

  const end = term.slice(0, -1) + String.fromCharCode(term.charCodeAt(term.length - 1) + 1);

  const q = query(
    collection(db, 'products'),
    where('isActive', '==', true),
    where('name', '>=', term),
    where('name', '<', end),
    limit(20)
  );

  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

export default function SearchPage() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounced search
  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (input.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setSearched(true);
      try {
        const data = await searchProducts(input);
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [input]);

  return (
    <SiteLayout>
      {/* Search input */}
      <div className="flex items-center gap-3 mt-4 mb-6">
        <Link href="/" className="flex-shrink-0">
          <ArrowLeft size={20} className="text-text" />
        </Link>
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Search products, brands..."
            className="input-field pl-10 pr-10"
          />
          {input && (
            <button
              onClick={() => { setInput(''); setResults([]); setSearched(false); }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X size={16} className="text-muted" />
            </button>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <Spinner size="md" />
        </div>
      )}

      {/* Results */}
      {!loading && searched && (
        <>
          <p className="text-xs text-muted mb-4">
            {results.length} result{results.length !== 1 ? 's' : ''} for "{input}"
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {results.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted text-sm">No products found for "{input}"</p>
              <Link href="/products" className="btn-outline mt-4 inline-flex">
                Browse all products
              </Link>
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!loading && !searched && (
        <div className="text-center py-16">
          <p className="text-muted text-sm">Type to search products</p>
        </div>
      )}
    </SiteLayout>
  );
}
