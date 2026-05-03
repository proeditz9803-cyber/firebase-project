"use client";

import { usePathname } from 'next/navigation';
import { SwipeNavigator } from '@/components/SwipeNavigator';
import { Navigation } from '@/components/navigation';
import KebabMenu from '@/components/KebabMenu';
import TimerPage from '@/app/page';
import LogPage from '@/app/log/page';
import GuidePage from '@/app/guide/page';

/**
 * @fileOverview A client-side wrapper that handles conditional rendering of the SwipeNavigator.
 * For main routes, Next.js children are intentionally not rendered here because SwipeNavigator
 * pre-renders all three pages simultaneously to enable the swipe card animation system.
 * The page components are passed as React nodes so SwipeNavigator remains decoupled from
 * specific page implementations.
 */

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const mainRoutes = ['/', '/log', '/guide'];
  const isMainPage = mainRoutes.includes(pathname);

  return (
    <>
      <KebabMenu />
      <Navigation />
      <main className="flex-1 flex flex-col">
        {isMainPage ? (
          <SwipeNavigator pageNodes={[
            <TimerPage key="timer" />,
            <LogPage key="log" />,
            <GuidePage key="guide" />,
          ]} />
        ) : (
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        )}
      </main>
    </>
  );
}