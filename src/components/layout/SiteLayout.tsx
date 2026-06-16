import { Suspense } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

interface SiteLayoutProps {
  children: React.ReactNode;
  headerTransparent?: boolean;
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
}: SiteLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <Suspense fallback={<HeaderFallback />}>
        <Header transparent={headerTransparent} />
      </Suspense>

      <main
        className="flex-1 container-app"
        style={{
          paddingTop: 'var(--header-height)',
          paddingBottom: 'var(--bottom-nav-height)',
        }}
      >
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
