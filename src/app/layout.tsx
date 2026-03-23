import type { Metadata } from 'next';
import { DM_Sans, Outfit } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/ConditionalLayout';
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

export const metadata: Metadata = {
  title: 'FasTrack | Intermittent Fasting Timer',
  description: 'A free, simple, no-account intermittent fasting timer and tracker.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${dmSans.variable} ${outfit.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col overflow-x-hidden">
        <LanguageProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
