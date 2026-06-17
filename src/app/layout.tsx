import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import PWARegister from '@/components/pwa/PWARegister';
import InstallBanner from '@/components/pwa/InstallBanner';
import { APP_URL } from '@/lib/constants';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#2C1810',
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'BrotherFit — Premium Fashion Brand in Bangladesh',
    template: '%s | BrotherFit',
  },
  description:
    'BrotherFit is Bangladesh\'s premium fashion brand. Shop men\'s clothing — t-shirts, shirts, pants and more. Fast delivery. Cash on delivery available.',
  keywords: [
    'BrotherFit', 'fashion Bangladesh', 'men clothing Bangladesh',
    'online fashion shop', 'premium clothing', 't-shirt Bangladesh',
    'পোশাক', 'ফ্যাশন বাংলাদেশ',
  ],
  authors: [{ name: 'BrotherFit' }],
  creator: 'BrotherFit',
  publisher: 'BrotherFit',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png',  sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BrotherFit',
  },
  openGraph: {
    type: 'website',
    url: APP_URL,
    siteName: 'BrotherFit',
    title: 'BrotherFit — Premium Fashion Brand in Bangladesh',
    description:
      'Shop premium men\'s fashion at BrotherFit. Fast delivery across Bangladesh. Cash on delivery available.',
    images: [
      {
        url: `${APP_URL}/logo.png`,
        width: 874,
        height: 874,
        alt: 'BrotherFit — Premium Fashion Brand',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrotherFit — Premium Fashion Brand in Bangladesh',
    description: 'Shop premium men\'s fashion at BrotherFit. Fast delivery across Bangladesh.',
    images: [`${APP_URL}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE', // ← পরে add করবে
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
      style={{ overflowX: 'hidden' }}
    >
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      </head>
      <body
        className="bg-bg text-text font-sans antialiased"
        style={{ overflowX: 'hidden', width: '100%' }}
      >
        <PWARegister />
        {children}
        <InstallBanner />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#2C1810',
              color: '#FFFFFF',
              borderRadius: '12px',
              fontSize: '13px',
              padding: '12px 16px',
            },
            success: { iconTheme: { primary: '#C89B6D', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#DC2626', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  );
}
