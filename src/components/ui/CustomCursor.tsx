'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const pos    = useRef({ x: 0, y: 0 });
  const ring   = useRef({ x: 0, y: 0 });
  const rafId  = useRef<number>(0);
  const [label, setLabel]     = useState('');
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  // Touch device হলে null return করব — না হলে fixed top-0 left-0 এ cursor elements আটকে থাকে
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const touch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(touch);
    if (touch) return;

    document.body.style.cursor = 'none';

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${pos.current.x + 16}px, ${pos.current.y - 8}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, select, textarea, [data-cursor]'
      ) as HTMLElement | null;

      if (interactive) {
        setHovered(true);
        const cursorLabel = interactive.dataset.cursor ?? '';
        setLabel(cursorLabel);
      } else {
        setHovered(false);
        setLabel('');
      }
    };
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    return () => {
      document.body.style.cursor = '';
      cancelAnimationFrame(rafId.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  // মোবাইল/touch device → কিছুই render করব না
  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          width:  clicking ? 6 : 8,
          height: clicking ? 6 : 8,
          background: hovered ? '#C89B6D' : '#2C1810',
          transition: 'width 0.15s, height 0.15s, background 0.2s',
          willChange: 'transform',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border"
        style={{
          width:  hovered ? 44 : 30,
          height: hovered ? 44 : 30,
          borderColor: hovered ? '#C89B6D' : 'rgba(44,24,16,0.25)',
          borderWidth:  hovered ? 1.5 : 1,
          background:  hovered ? 'rgba(200,155,109,0.06)' : 'transparent',
          backdropFilter: hovered ? 'blur(2px)' : 'none',
          transition: 'width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s, background 0.2s',
          willChange: 'transform',
        }}
      />

      {/* Label */}
      {label && (
        <div
          ref={labelRef}
          className="pointer-events-none fixed top-0 left-0 z-[9997]
                     text-[10px] font-semibold tracking-wider uppercase
                     text-white bg-primary px-2 py-0.5 rounded-full"
          style={{ willChange: 'transform' }}
        >
          {label}
        </div>
      )}
    </>
  );
}
