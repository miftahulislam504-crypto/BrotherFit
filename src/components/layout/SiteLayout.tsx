import { Suspense } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import Footer from './Footer';

interface SiteLayoutProps {
  children: React.ReactNode;
  headerTransparent?: boolean;
  showFooter?: boolean;
}

function HeaderFallback() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-bg/97 border-b border-border"
      style={{ height: 'var(--header-height)' }}
    />
  );
}

export default function SiteLayout({
  children,
  headerTransparent = false,
  showFooter = false,
}: SiteLayoutProps) {
  return (
    <div
      className="flex flex-col min-h-screen bg-bg"
      style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}
    >
      <Suspense fallback={<HeaderFallback />}>
        <Header transparent={headerTransparent} />
      </Suspense>

      <main
        className="flex-1"
        style={{
          paddingTop: headerTransparent ? '0' : 'var(--header-height)',
          paddingBottom: 'calc(var(--bottom-nav-height) + 16px)',
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        {children}
      </main>

      {showFooter && <Footer />}
      <BottomNav />
    </div>
  );
}
