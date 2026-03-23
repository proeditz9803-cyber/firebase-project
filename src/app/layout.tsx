"use client";

import type { Metadata } from 'next';
import { DM_Sans, Outfit } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/navigation';
import KebabMenu from '@/components/KebabMenu';
import { SwipeNavigator } from '@/components/SwipeNavigator';
import { usePathname } from 'next/navigation';
import { LanguageProvider } from '@/context/LanguageContext';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isMainPage = ['/', '/log', '/guide'].includes(pathname);

  return (
    <html lang="en" className={`dark ${dmSans.variable} ${outfit.variable}`}>
      <head>
        <title>FasTrack | Intermittent Fasting Timer</title>
        <meta name="description" content="A free, simple, no-account intermittent fasting timer and tracker." />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col overflow-x-hidden">
        <LanguageProvider>
          <KebabMenu />
          <Navigation />
          <main className="flex-1 flex flex-col">
            {isMainPage ? (
              <SwipeNavigator />
            ) : (
              <div className="container mx-auto px-4 py-8">
                {children}
              </div>
            )}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
