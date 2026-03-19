"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Timer, ClipboardList, BookOpen } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Timer', icon: Timer },
    { href: '/log', label: 'Log', icon: ClipboardList },
    { href: '/guide', label: 'Guide', icon: BookOpen },
  ];

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-bold text-primary tracking-tight pl-10">
            FasTrack
          </Link>
        </div>
        <nav className="flex items-center gap-4 sm:gap-8 md:pr-32 lg:pr-48">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
