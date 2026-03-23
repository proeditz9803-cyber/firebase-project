"use client";

import { usePathname } from 'next/navigation';
import { SwipeNavigator } from '@/components/SwipeNavigator';
import { Navigation } from '@/components/navigation';
import KebabMenu from '@/components/KebabMenu';

/**
 * @fileOverview A client-side wrapper that handles conditional rendering of the SwipeNavigator.
 */

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Define the main routes that should use the SwipeNavigator system
  const mainRoutes = ['/', '/log', '/guide'];
  const isMainPage = mainRoutes.includes(pathname);

  return (
    <>
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
    </>
  );
}
