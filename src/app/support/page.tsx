'use client';

import { useState, useRef } from 'react';
import {
  ChevronDown, MessageCircle, Mail, Phone,
  Camera, Star, Send, Image as ImageIcon, X,
  Users, Trophy, Heart
} from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

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

// ── Club Section Component ──────────────────────────────────────────────────
function ClubSection() {
  const { user } = useAuth();

  const [rating, setRating]         = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment]       = useState('');
  const [name, setName]             = useState(user?.displayName ?? '');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImageBase64(base64);
      setImagePreview(base64);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageBase64(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!name.trim())    { setError('Please enter your name'); return; }
    if (rating === 0)    { setError('Please select a rating'); return; }
    if (!comment.trim()) { setError('Please write a review'); return; }

    setSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'club_posts'), {
        userId:     user?.uid ?? 'guest',
        userName:   name.trim(),
        userPhoto:  user?.photoURL ?? null,
        rating,
        comment:    comment.trim(),
        imageBase64: imageBase64 ?? null,
        isApproved: false,
        createdAt:  serverTimestamp(),
        type:       'community_review',
      });
      setSubmitted(true);
    } catch {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      {/* Club header */}
      <div
        className="relative rounded-3xl p-5 mb-4 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #2C1810 0%, #4A2C20 60%, #3D2214 100%)',
          boxShadow: '0 8px 32px rgba(44,24,16,0.35)',
        }}
      >
        {/* bg glow */}
        <div
          className="absolute -top-6 -right-6 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(200,155,109,0.18) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
        <div className="relative z-10 flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(200,155,109,0.15)', border: '1px solid rgba(200,155,109,0.3)' }}
          >
            <Trophy size={22} style={{ color: '#C89B6D' }} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{ color: '#C89B6D' }}
              >
                BrotherFit
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase"
                style={{ background: 'rgba(200,155,109,0.2)', color: '#E8C9A0' }}
              >
                Club
              </span>
            </div>
            <h2
              className="font-serif text-xl text-white leading-tight"
            >
              Community Reviews
            </h2>
            <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
              Share your experience & inspire the brotherhood
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="flex items-center gap-4 mt-4 pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          {[
            { icon: <Users size={13} />, text: '2.1k+ Members' },
            { icon: <Star size={13} />, text: '4.9 avg rating' },
            { icon: <Heart size={13} />, text: 'Real reviews' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <span style={{ color: '#C89B6D' }}>{icon}</span>
              <span className="text-[11px]" style={{ color: '#94A3B8' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submission form */}
      {submitted ? (
        <div
          className="rounded-2xl p-6 text-center"
          style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
          }}
        >
          <div className="text-3xl mb-2">🎉</div>
          <p className="font-serif text-lg text-success font-medium">Thank you!</p>
          <p className="text-sm text-muted mt-1">
            Your review has been submitted and will appear after approval.
          </p>
        </div>
      ) : (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: '#FFFFFF',
            border: '1px solid #EDE8E1',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          {/* Form header */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: '1px solid #EDE8E1', background: '#FDFCFB' }}
          >
            <Camera size={16} className="text-muted" />
            <span className="text-sm font-semibold text-text">Write a Review</span>
          </div>

          <div className="p-4 space-y-4">
            {/* Name field */}
            <div>
              <label className="block text-xs font-semibold text-muted mb-1.5 uppercase tracking-wide">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                className="input-field"
                style={{ fontSize: '14px' }}
              />
            </div>

            {/* Star rating */}
            <div>
              <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wide">
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform active:scale-90"
                    style={{
                      transform: (hoverRating || rating) >= star ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    <Star
                      size={28}
                      strokeWidth={1.5}
                      fill={(hoverRating || rating) >= star ? '#C89B6D' : 'none'}
                      style={{
                        color: (hoverRating || rating) >= star ? '#C89B6D' : '#D1CBC5',
                        transition: 'color 0.15s ease, fill 0.15s ease',
                      }}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="text-xs font-medium ml-1" style={{ color: '#C89B6D' }}>
                    {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]}
                  </span>
                )}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-semibold text-muted mb-1.5 uppercase tracking-wide">
                Your Review
              </label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Share your experience with the BrotherFit community..."
                rows={4}
                className="w-full rounded-xl px-4 py-3 text-sm resize-none"
                style={{
                  background: '#FAFAF9',
                  border: '1.5px solid #EDE8E1',
                  color: '#1A1A1A',
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#C89B6D')}
                onBlur={e => (e.currentTarget.style.borderColor = '#EDE8E1')}
              />
              <p className="text-[10px] text-muted mt-1 text-right">{comment.length}/500</p>
            </div>

            {/* Photo upload */}
            <div>
              <label className="block text-xs font-semibold text-muted mb-1.5 uppercase tracking-wide">
                Add Photo <span className="text-[10px] normal-case font-normal">(optional)</span>
              </label>

              {imagePreview ? (
                <div className="relative inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-xl"
                    style={{ border: '2px solid #EDE8E1' }}
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: '#2C1810',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    }}
                  >
                    <X size={12} color="white" />
                  </button>
                  <p className="text-[10px] text-muted mt-1">Photo added ✓</p>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl w-full"
                  style={{
                    background: '#FAFAF9',
                    border: '1.5px dashed #D1CBC5',
                    color: '#9A8C82',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#C89B6D';
                    (e.currentTarget as HTMLButtonElement).style.background = '#FDF9F6';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#D1CBC5';
                    (e.currentTarget as HTMLButtonElement).style.background = '#FAFAF9';
                  }}
                >
                  <ImageIcon size={18} style={{ color: '#C89B6D' }} />
                  <div className="text-left">
                    <p className="text-sm font-medium" style={{ color: '#2C1810' }}>Upload from Gallery</p>
                    <p className="text-[10px]">JPG, PNG · Max 5MB</p>
                  </div>
                </button>
              )}

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImagePick}
              />
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 p-3 rounded-xl text-sm"
                style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}
              >
                <X size={14} />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-semibold text-sm"
              style={{
                background: submitting
                  ? '#D1CBC5'
                  : 'linear-gradient(135deg, #2C1810 0%, #4A2C20 100%)',
                color: '#FFFFFF',
                boxShadow: submitting ? 'none' : '0 4px 20px rgba(44,24,16,0.3)',
                transition: 'all 0.2s',
                cursor: submitting ? 'not-allowed' : 'pointer',
              }}
            >
              {submitting ? (
                <>
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                    style={{ animation: 'spin 0.8s linear infinite' }}
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={15} />
                  Post to Club
                </>
              )}
            </button>

            <p className="text-[10px] text-muted text-center">
              Reviews are reviewed before publishing · Your photo stays private until approved
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ── Main Support Page ────────────────────────────────────────────────────────
export default function SupportPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'support' | 'club'>('support');

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

        {/* ── Tab switcher ── */}
        <div
          className="flex rounded-2xl p-1 mb-5"
          style={{ background: '#EDE8E1' }}
        >
          {(['support', 'club'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: activeTab === tab ? '#FFFFFF' : 'transparent',
                color: activeTab === tab ? '#2C1810' : '#9A8C82',
                boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {tab === 'support' ? (
                <><MessageCircle size={14} /> Help & FAQ</>
              ) : (
                <><Trophy size={14} /> Community Club</>
              )}
            </button>
          ))}
        </div>

        {/* ── Support tab ── */}
        {activeTab === 'support' && (
          <>
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
                href="mailto:support@brotherfit.com"
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </>
        )}

        {/* ── Club tab ── */}
        {activeTab === 'club' && <ClubSection />}

      </div>
    </SiteLayout>
  );
}
