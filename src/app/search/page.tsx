'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import ProductCard from '@/components/product/ProductCard';
import { Spinner } from '@/components/ui';
import type { Product } from '@/types';

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
  const router = useRouter();
  const [input, setInput] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
    <div className="flex flex-col min-h-dvh bg-bg">

      {/* Top bar — fixed */}
      <div
        className="fixed top-0 left-0 right-0 z-50 bg-bg border-b border-border"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="container-app flex items-center gap-3 py-3">
          <button
            onClick={() => router.back()}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl hover:bg-border/60 transition-colors"
          >
            <ArrowLeft size={20} className="text-text" />
          </button>

          <div className="flex-1 relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Search products, brands..."
              className="input-field pl-10 pr-10"
              autoFocus
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
      </div>

      {/* Scrollable content */}
      <main
        className="flex-1 container-app"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top) + 64px)',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)',
        }}
      >

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <Spinner size="md" />
          </div>
        )}

        {/* Results */}
        {!loading && searched && (
          <>
            <p className="text-xs text-muted mb-4 pt-4">
              {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{input}&quot;
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {results.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted text-sm">No products found for &quot;{input}&quot;</p>
                <Link href="/products" className="btn-outline mt-4 inline-flex">
                  Browse all products
                </Link>
              </div>
            )}
          </>
        )}

        {/* Empty state */}
        {!loading && !searched && (
          <div className="text-center py-20">
            <Search size={32} className="text-border mx-auto mb-3" />
            <p className="text-muted text-sm">Type to search products</p>
          </div>
        )}

      </main>
    </div>
  );
}
