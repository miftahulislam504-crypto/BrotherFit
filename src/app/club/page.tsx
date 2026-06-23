'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Plus, X, Star, Send, Camera, Users,
  Trophy, Heart, MessageCircle, Image as ImageIcon,
  ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';
import {
  collection, query, where, orderBy, limit,
  getDocs, addDoc, serverTimestamp, Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ClubPost {
  id: string;
  userName: string;
  userPhoto?: string | null;
  rating: number;
  comment: string;
  imageBase64?: string | null;
  createdAt: Timestamp | null;
  likeCount?: number;
}

// ─── Star display ─────────────────────────────────────────────────────────────
function StarRow({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          size={size}
          strokeWidth={1.5}
          fill={rating >= s ? '#C89B6D' : 'none'}
          style={{ color: rating >= s ? '#C89B6D' : '#D1CBC5' }}
        />
      ))}
    </div>
  );
}

// ─── Single post card ─────────────────────────────────────────────────────────
function PostCard({ post }: { post: ClubPost }) {
  const [liked, setLiked] = useState(false);
  const initials = post.userName.slice(0, 2).toUpperCase();
  const timeAgo = post.createdAt
    ? (() => {
        const diff = Date.now() - post.createdAt.toDate().getTime();
        const h = Math.floor(diff / 3600000);
        const d = Math.floor(diff / 86400000);
        if (d > 0) return `${d}d ago`;
        if (h > 0) return `${h}h ago`;
        return 'Just now';
      })()
    : '';

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: '#FFFFFF',
        border: '1px solid #EDE8E1',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* Photo */}
      {post.imageBase64 && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.imageBase64}
          alt="Review photo"
          className="w-full object-cover"
          style={{ maxHeight: '240px' }}
        />
      )}

      <div className="p-4">
        {/* User row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            {/* Avatar */}
            {post.userPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.userPhoto}
                alt={post.userName}
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2C1810, #C89B6D)' }}
              >
                {initials}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-text leading-tight">{post.userName}</p>
              <p className="text-[10px] text-muted">{timeAgo}</p>
            </div>
          </div>
          <StarRow rating={post.rating} />
        </div>

        {/* Comment */}
        <p className="text-sm text-text leading-relaxed">{post.comment}</p>

        {/* Like row */}
        <div className="flex items-center gap-1.5 mt-3 pt-3" style={{ borderTop: '1px solid #F0ECE7' }}>
          <button
            onClick={() => setLiked(p => !p)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg transition-all active:scale-90"
            style={{
              background: liked ? 'rgba(200,155,109,0.1)' : 'transparent',
            }}
          >
            <Heart
              size={14}
              strokeWidth={1.8}
              fill={liked ? '#C89B6D' : 'none'}
              style={{ color: liked ? '#C89B6D' : '#9A8C82' }}
            />
            <span
              className="text-[11px] font-medium"
              style={{ color: liked ? '#C89B6D' : '#9A8C82' }}
            >
              {(post.likeCount ?? 0) + (liked ? 1 : 0)}
            </span>
          </button>
          <div
            className="flex items-center gap-1 px-2 py-1"
          >
            <MessageCircle size={13} style={{ color: '#9A8C82' }} strokeWidth={1.8} />
            <span className="text-[11px] text-muted">Club Member</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Review submit sheet ───────────────────────────────────────────────────────
function ReviewSheet({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { user } = useAuth();
  const [rating, setRating]           = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment]         = useState('');
  const [name, setName]               = useState(user?.displayName ?? '');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // lock scroll behind sheet
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5MB'); return; }
    if (!file.type.startsWith('image/')) { setError('Only images allowed'); return; }
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result as string;
      setImageBase64(b64);
      setImagePreview(b64);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!name.trim())    { setError('Please enter your name'); return; }
    if (rating === 0)    { setError('Please select a rating'); return; }
    if (!comment.trim()) { setError('Please write a review'); return; }

    setSubmitting(true);
    setError('');
    try {
      await addDoc(collection(db, 'club_posts'), {
        userId:      user?.uid ?? 'guest',
        userName:    name.trim(),
        userPhoto:   user?.photoURL ?? null,
        rating,
        comment:     comment.trim(),
        imageBase64: imageBase64 ?? null,
        isApproved:  false,
        likeCount:   0,
        createdAt:   serverTimestamp(),
      });
      onSuccess();
    } catch {
      setError('Submit failed. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-[3px]"
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[90] rounded-t-3xl overflow-hidden"
        style={{
          background: '#FFFFFF',
          maxHeight: '92dvh',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
          animation: 'slideUp 0.3s cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: '#D1CBC5' }} />
        </div>

        {/* Sheet header */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: '1px solid #EDE8E1' }}
        >
          <div className="flex items-center gap-2">
            <Camera size={16} style={{ color: '#C89B6D' }} />
            <span className="font-semibold text-text text-sm">Write a Review</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full"
            style={{ background: '#F0ECE7' }}
          >
            <X size={14} className="text-text" />
          </button>
        </div>

        {/* Scrollable form body */}
        <div className="overflow-y-auto p-5 space-y-4" style={{ maxHeight: 'calc(92dvh - 100px)' }}>

          {/* Name */}
          <div>
            <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              className="input-field"
            />
          </div>

          {/* Stars */}
          <div>
            <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-2">
              Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(s => (
                <button
                  key={s}
                  onClick={() => setRating(s)}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{ transition: 'transform 0.12s ease' }}
                  className="active:scale-90"
                >
                  <Star
                    size={30}
                    strokeWidth={1.5}
                    fill={(hoverRating || rating) >= s ? '#C89B6D' : 'none'}
                    style={{
                      color: (hoverRating || rating) >= s ? '#C89B6D' : '#D1CBC5',
                      transition: 'color 0.12s, fill 0.12s',
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
            <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1.5">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value.slice(0, 500))}
              placeholder="Share your experience with the BrotherFit community..."
              rows={4}
              className="w-full rounded-xl px-4 py-3 text-sm resize-none"
              style={{
                background: '#FAFAF9',
                border: '1.5px solid #EDE8E1',
                color: '#1A1A1A',
                outline: 'none',
                fontFamily: 'inherit',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#C89B6D')}
              onBlur={e => (e.currentTarget.style.borderColor = '#EDE8E1')}
            />
            <p className="text-[10px] text-muted text-right mt-0.5">{comment.length}/500</p>
          </div>

          {/* Photo */}
          <div>
            <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1.5">
              Add Photo <span className="normal-case font-normal">(optional)</span>
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
                  onClick={() => { setImageBase64(null); setImagePreview(null); if (fileRef.current) fileRef.current.value = ''; }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: '#2C1810', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                >
                  <X size={12} color="white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-3 px-4 py-3 rounded-xl w-full"
                style={{ background: '#FAFAF9', border: '1.5px dashed #D1CBC5' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#C89B6D'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#D1CBC5'; }}
              >
                <ImageIcon size={18} style={{ color: '#C89B6D' }} />
                <div className="text-left">
                  <p className="text-sm font-medium text-text">Upload from Gallery</p>
                  <p className="text-[10px] text-muted">JPG, PNG · Max 5MB</p>
                </div>
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
          </div>

          {/* Error */}
          {error && (
            <div
              className="flex items-center gap-2 p-3 rounded-xl text-sm"
              style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}
            >
              <X size={14} /> {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-semibold text-sm"
            style={{
              background: submitting ? '#D1CBC5' : 'linear-gradient(135deg, #2C1810 0%, #4A2C20 100%)',
              color: '#FFFFFF',
              boxShadow: submitting ? 'none' : '0 4px 20px rgba(44,24,16,0.28)',
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Submitting...
              </>
            ) : (
              <><Send size={15} /> Post to Club</>
            )}
          </button>

          <p className="text-[10px] text-muted text-center pb-2">
            Reviews are reviewed before publishing
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

// ─── Main Club Page ────────────────────────────────────────────────────────────
export default function ClubPage() {
  const [posts, setPosts]           = useState<ClubPost[]>([]);
  const [loading, setLoading]       = useState(true);
  const [showSheet, setShowSheet]   = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'club_posts'),
        where('isApproved', '==', true),
        orderBy('createdAt', 'desc'),
        limit(30)
      );
      const snap = await getDocs(q);
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() } as ClubPost)));
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const handleSuccess = () => {
    setShowSheet(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3500);
  };

  return (
    <div
      className="min-h-dvh pb-28"
      style={{ background: '#F8F6F2' }}
    >
      {/* ── Top header ── */}
      <div
        className="sticky top-0 z-40 px-4 pt-safe"
        style={{
          background: 'rgba(248,246,242,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid #EDE8E1',
        }}
      >
        <div className="flex items-center justify-between py-3 max-w-md mx-auto">
          <Link href="/" className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-border/60 transition-colors">
            <ChevronLeft size={20} className="text-text" />
          </Link>
          <div className="flex items-center gap-2">
            <Trophy size={16} style={{ color: '#C89B6D' }} />
            <span className="font-serif text-lg text-primary">BrotherFit Club</span>
          </div>
          <div className="w-8" />
        </div>
      </div>

      {/* ── Hero banner ── */}
      <div className="px-4 pt-4 max-w-md mx-auto">
        <div
          className="rounded-2xl p-4 mb-5"
          style={{
            background: 'linear-gradient(135deg, #2C1810 0%, #4A2C20 60%, #3D2214 100%)',
            boxShadow: '0 8px 32px rgba(44,24,16,0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            className="absolute -top-6 -right-6 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(200,155,109,0.2) 0%, transparent 70%)',
              filter: 'blur(16px)',
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: '#C89B6D' }}>
                BrotherFit
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wide"
                style={{ background: 'rgba(200,155,109,0.2)', color: '#E8C9A0' }}
              >
                Club
              </span>
            </div>
            <h1 className="font-serif text-xl text-white mb-1">Community Reviews</h1>
            <p className="text-xs" style={{ color: '#94A3B8' }}>
              Real customers, real experiences
            </p>
            <div
              className="flex items-center gap-4 mt-3 pt-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              {[
                { icon: <Users size={11} />, text: '2.1k+ Members' },
                { icon: <Star size={11} />, text: '4.9 avg' },
                { icon: <Camera size={11} />, text: 'Real photos' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1">
                  <span style={{ color: '#C89B6D' }}>{icon}</span>
                  <span className="text-[10px]" style={{ color: '#94A3B8' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Posts feed ── */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: '#FFF', border: '1px solid #EDE8E1' }}>
                <div className="skeleton w-full" style={{ height: '180px' }} />
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full skeleton" />
                    <div className="flex-1 space-y-1">
                      <div className="h-3 rounded skeleton w-1/3" />
                      <div className="h-2.5 rounded skeleton w-1/4" />
                    </div>
                  </div>
                  <div className="h-3 rounded skeleton w-full" />
                  <div className="h-3 rounded skeleton w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">🏆</div>
            <p className="font-serif text-lg text-primary mb-1">Be the first!</p>
            <p className="text-sm text-muted mb-5">No reviews yet. Share your experience.</p>
            <button
              onClick={() => setShowSheet(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white"
              style={{ background: 'linear-gradient(135deg, #2C1810, #4A2C20)' }}
            >
              <Camera size={15} /> Write First Review
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map(post => <PostCard key={post.id} post={post} />)}
          </div>
        )}
      </div>

      {/* ── Floating + button ── */}
      <button
        onClick={() => setShowSheet(true)}
        className="fixed z-50 flex items-center gap-2 rounded-full font-semibold text-sm text-white shadow-lg"
        style={{
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 88px)',
          right: '20px',
          background: 'linear-gradient(135deg, #C89B6D 0%, #E8C9A0 50%, #C89B6D 100%)',
          backgroundSize: '200% 100%',
          color: '#2C1810',
          padding: '12px 18px',
          boxShadow: '0 6px 24px rgba(200,155,109,0.5)',
          animation: 'fabPulse 3s ease-in-out infinite',
        }}
      >
        <Plus size={18} strokeWidth={2.5} />
        Review
      </button>

      {/* ── Success toast ── */}
      {showSuccess && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-white"
          style={{
            background: '#16A34A',
            boxShadow: '0 4px 20px rgba(22,163,74,0.4)',
            animation: 'fadeDown 0.3s ease',
          }}
        >
          ✓ Review submitted! Pending approval.
        </div>
      )}

      {/* ── Sheet ── */}
      {showSheet && (
        <ReviewSheet
          onClose={() => setShowSheet(false)}
          onSuccess={handleSuccess}
        />
      )}

      <style>{`
        @keyframes fabPulse {
          0%, 100% { box-shadow: 0 6px 24px rgba(200,155,109,0.5); }
          50%       { box-shadow: 0 6px 32px rgba(200,155,109,0.75); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
