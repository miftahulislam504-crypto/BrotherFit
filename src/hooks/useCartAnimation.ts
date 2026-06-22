'use client';

import { useRef, useCallback } from 'react';

interface FlyToCartState {
  flying: boolean;
  startX: number;
  startY: number;
}

export function useCartAnimation() {
  const cartIconRef = useRef<HTMLElement | null>(null);
  const stateRef = useRef<FlyToCartState>({ flying: false, startX: 0, startY: 0 });

  // Cart icon bounce করাও
  const bounceCartIcon = useCallback(() => {
    const cartEl = document.querySelector('[data-cart-icon]') as HTMLElement;
    if (!cartEl) return;
    cartEl.classList.remove('animate-cart-bounce');
    void cartEl.offsetWidth; // reflow trigger
    cartEl.classList.add('animate-cart-bounce');
    cartEl.addEventListener(
      'animationend',
      () => cartEl.classList.remove('animate-cart-bounce'),
      { once: true }
    );
  }, []);

  // Fly to cart effect
  const flyToCart = useCallback((
    sourceEl: HTMLElement | null,
    imageUrl?: string,
    onComplete?: () => void
  ) => {
    if (!sourceEl || stateRef.current.flying) return;

    const cartEl = document.querySelector('[data-cart-icon]') as HTMLElement;
    if (!cartEl) {
      onComplete?.();
      bounceCartIcon();
      return;
    }

    const sourceRect = sourceEl.getBoundingClientRect();
    const cartRect = cartEl.getBoundingClientRect();

    const flyEl = document.createElement('div');
    flyEl.style.cssText = `
      position: fixed;
      z-index: 9999;
      width: 56px;
      height: 70px;
      border-radius: 12px;
      overflow: hidden;
      left: ${sourceRect.left + sourceRect.width / 2 - 28}px;
      top: ${sourceRect.top + sourceRect.height / 2 - 35}px;
      pointer-events: none;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      transition: none;
    `;

    if (imageUrl) {
      flyEl.style.backgroundImage = `url(${imageUrl})`;
      flyEl.style.backgroundSize = 'cover';
      flyEl.style.backgroundPosition = 'center';
    } else {
      flyEl.style.background = '#2C1810';
    }

    document.body.appendChild(flyEl);
    stateRef.current.flying = true;

    const destX = cartRect.left + cartRect.width / 2 - sourceRect.left - sourceRect.width / 2;
    const destY = cartRect.top + cartRect.height / 2 - sourceRect.top - sourceRect.height / 2;

    requestAnimationFrame(() => {
      flyEl.style.transition = `
        transform 0.65s cubic-bezier(0.34, 1.1, 0.64, 1),
        opacity 0.65s ease-in,
        border-radius 0.65s ease
      `;
      flyEl.style.transform = `translate(${destX}px, ${destY}px) scale(0.18)`;
      flyEl.style.opacity = '0';
      flyEl.style.borderRadius = '50%';
    });

    setTimeout(() => {
      flyEl.remove();
      stateRef.current.flying = false;
      bounceCartIcon();
      onComplete?.();
    }, 680);
  }, [bounceCartIcon]);

  return { flyToCart, bounceCartIcon, cartIconRef };
}
