import type { Metadata } from 'next';
import { DM_Sans, Outfit } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/ConditionalLayout';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-clash-display',
});

export const metadata: Metadata = {
  title: 'FasTrack | Intermittent Fasting Timer',
  description: 'A free, simple, intermittent fasting timer and tracker.',
  icons: {
    icon: [
      { url: '/favicon-32×32.png', sizes: '32×32', type: 'image/x-icon' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${dmSans.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" type="image/x-icon" />
        <link rel="icon" href="/android-chrome-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/android-chrome-512x512.png" sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6752713314867783"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col overflow-x-hidden">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}