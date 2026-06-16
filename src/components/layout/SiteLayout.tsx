import Header from './Header';
import BottomNav from './BottomNav';

interface SiteLayoutProps {
  children: React.ReactNode;
  headerTransparent?: boolean;
}

export default function SiteLayout({
  children,
  headerTransparent = false,
}: SiteLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <Header transparent={headerTransparent} />

      {/* Page content — padded for fixed header + bottom nav */}
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
