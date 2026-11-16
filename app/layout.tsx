import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

export const metadata: Metadata = {
  title: 'TRIPLE MOTIVE // Brand Strategy & Relational Architecture',
  description:
    'Triple Motive is an editorial brand strategy and marketing agency. We engineer emotional brand stories that elicit visceral trust, empathy, and generational loyalty.',
  keywords: [
    'Brand Strategy',
    'Relational Branding',
    'Brand Identity',
    'Triple Motive',
    'Emotional Storytelling',
    'Digital Experience',
  ],
  authors: [{ name: 'Triple Motive Atelier' }],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F2EFE9',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;500;700&family=Oswald:wght@500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-canvas text-ink antialiased selection:bg-cobalt selection:text-canvas">
        {/* Physical Paper Grain Texture Overlay */}
        <div className="editorial-grain" aria-hidden="true" />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
