'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Already installed → hide
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    // Already dismissed this session
    if (sessionStorage.getItem('pwa-banner-dismissed')) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('pwa-banner-dismissed', '1');
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-[calc(var(--bottom-nav-height)+env(safe-area-inset-bottom,0px)+8px)] left-0 right-0 z-40 px-3"
      style={{ animation: 'slide-up 0.3s ease-out' }}
    >
      <div className="container-app">
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-card"
          style={{ background: '#2C1810' }}
        >
          {/* Logo mark */}
          <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 100 100" fill="none">
              <path d="M50 8 C50 8 58 8 58 16 C58 22 52 24 50 24"
                stroke="#C89B6D" strokeWidth="7" strokeLinecap="round" fill="none"/>
              <path d="M50 24 L14 68 C10 72 10 78 14 82 L86 82 C90 78 90 72 86 68 L50 24Z"
                stroke="#C89B6D" strokeWidth="7" strokeLinejoin="round" fill="none"/>
              <line x1="22" y1="82" x2="78" y2="82"
                stroke="#C89B6D" strokeWidth="7" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold leading-tight">BrotherFit</p>
            <p className="text-white/60 text-[10px] leading-tight truncate">Add to Home Screen</p>
          </div>

          {/* Install button */}
          <button
            onClick={handleInstall}
            className="flex-shrink-0 flex items-center gap-1.5 bg-accent text-primary
                       text-xs font-semibold px-3 py-1.5 rounded-xl
                       active:scale-95 transition-transform"
          >
            <Download size={12} />
            Install
          </button>

          {/* Close */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center
                       text-white/50 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
