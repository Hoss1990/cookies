import './globals.css';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { CartProvider, CartDrawer, WhatsAppFab } from '@/components/Cart';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PWA from '@/components/PWA';

const display = Playfair_Display({ subsets: ['latin'], variable: '--f-display', style: ['normal', 'italic'], display: 'swap' });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--f-sans', display: 'swap' });

export const metadata = {
  title: 'Cookies & Co | Biscuiterie Artisanale & Gourmande',
  description: 'Cookies artisanaux & chocolat intense, boîtes prêtes à cuire. Maison Kanoun & Fils — commande via WhatsApp.',
  applicationName: 'Cookies & Co',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
  appleWebApp: { capable: true, title: 'Cookies & Co', statusBarStyle: 'default' },
  formatDetection: { telephone: false },
};

export const viewport = { themeColor: '#23120f', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
      </head>
      <body>
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFab />
          <PWA />
        </CartProvider>
      </body>
    </html>
  );
}