'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import RevealSection from '@/components/ui/RevealSection';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    // TODO: connect to Firebase subscribers collection
    // await addDoc(collection(db, 'subscribers'), { email, createdAt: new Date() });
    await new Promise(r => setTimeout(r, 800));
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="mt-8 mb-6 container-app">
      <RevealSection direction="up">
        <div
          className="rounded-3xl p-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #2C1810 0%, #4A2C20 100%)',
          }}
        >
          {/* Decorative background circle */}
          <div
            className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(200,155,109,0.2) 0%, transparent 70%)',
            }}
          />

          {/* Eyebrow */}
          <p
            className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: '#C89B6D' }}
          >
            Stay in the loop
          </p>

          {/* Heading */}
          <h3 className="font-serif text-white text-2xl leading-tight mb-2">
            Get Exclusive Drops
          </h3>
          <p className="text-xs mb-5" style={{ color: '#9A8C82' }}>
            Be the first to know about new collections, flash sales, and member-only offers.
          </p>

          {/* Input + Button */}
          {status === 'success' ? (
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} style={{ color: '#C89B6D' }} />
              <span className="text-sm font-medium text-white">
                You&apos;re on the list! 🎉
              </span>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="your@email.com"
                className="flex-1 rounded-full px-4 py-3 text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #C89B6D, #E8C9A0)',
                }}
                aria-label="Subscribe"
              >
                {status === 'loading' ? (
                  <div
                    className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: '#0A0F1F', borderTopColor: 'transparent' }}
                  />
                ) : (
                  <ArrowRight size={16} color="#0A0F1F" strokeWidth={2.5} />
                )}
              </button>
            </div>
          )}

          <p className="text-[10px] mt-3" style={{ color: '#64748B' }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </RevealSection>
    </section>
  );
}
