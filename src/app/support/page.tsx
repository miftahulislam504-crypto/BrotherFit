'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle, Mail, Phone } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import { cn } from '@/lib/utils';

const FAQS = [
  {
    q: 'How do I track my order?',
    a: 'Go to Account → Orders to see real-time status updates for all your orders. You can also contact us with your order ID for support.',
  },
  {
    q: 'What is the return policy?',
    a: 'We accept returns within 7 days of delivery for unused items in original condition with tags attached. Contact us to initiate a return.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Dhaka city: 2–3 business days. Outside Dhaka: 4–7 business days. Express delivery is available on request.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept Cash on Delivery (COD), bKash, and Nagad. All transactions are secure.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'Orders can be cancelled before they are confirmed. Once confirmed, changes may not be possible. Please contact us immediately if you need to modify an order.',
  },
  {
    q: 'How do I find my size?',
    a: 'Each product page has a Size Guide tab with exact measurements. When in doubt, size up — we want your purchase to be perfect.',
  },
  {
    q: 'Do you offer exchange?',
    a: 'Yes, we offer exchanges for the same item in a different size or color, subject to availability. Contact us within 7 days of delivery.',
  },
  {
    q: 'Is Cash on Delivery available everywhere?',
    a: 'COD is available across all 64 districts of Bangladesh. Delivery charges vary by location.',
  },
];

export default function SupportPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SiteLayout>
      <div className="mt-4 pb-10">

        {/* Header */}
        <div className="text-center py-6 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <MessageCircle size={24} className="text-primary" />
          </div>
          <h1 className="font-serif text-2xl text-primary">Support</h1>
          <p className="text-sm text-muted mt-1">How can we help you?</p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a
            href="tel:+8801XXXXXXXXX"
            className="card p-4 flex flex-col items-center gap-2 text-center hover:border-accent transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-text">Call Us</p>
              <p className="text-[11px] text-muted mt-0.5">Sat–Thu 10am–8pm</p>
            </div>
          </a>

          <a
            href="mailto:support@fashionos.com"
            className="card p-4 flex flex-col items-center gap-2 text-center hover:border-accent transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-text">Email Us</p>
              <p className="text-[11px] text-muted mt-0.5">Reply within 24h</p>
            </div>
          </a>
        </div>

        {/* FAQ */}
        <h2 className="font-serif text-lg text-primary mb-3">
          Frequently Asked Questions
        </h2>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-sm font-medium text-text pr-3 leading-snug">
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={cn(
                    'text-muted flex-shrink-0 transition-transform duration-200',
                    open === i && 'rotate-180'
                  )}
                />
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-200',
                  open === i ? 'max-h-48' : 'max-h-0'
                )}
              >
                <p className="text-sm text-muted leading-relaxed px-4 pb-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/8801XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 mt-6
                     bg-[#25D366] text-white rounded-2xl py-4 text-sm font-medium
                     hover:opacity-90 transition-opacity active:scale-95"
        >
          {/* WhatsApp icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Chat on WhatsApp
        </a>

      </div>
    </SiteLayout>
  );
}
