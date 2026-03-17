"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function KebabMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="fixed top-3.5 left-4 z-[100]" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={cn(
          "p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all rounded-md border border-transparent focus:outline-none",
          isOpen && "bg-primary/10 text-primary border-primary/20 shadow-sm"
        )}
        aria-label="Menu"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      <div
        className={cn(
          "absolute top-full left-0 mt-2 w-48 bg-popover border border-border shadow-2xl rounded-md overflow-hidden transition-all duration-300 ease-out origin-top-left",
          isOpen 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        )}
      >
        <Link
          href="/about"
          onClick={closeMenu}
          className="block px-4 py-3 text-sm font-bold text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          About Us
        </Link>
        <Link
          href="/privacy-policy"
          onClick={closeMenu}
          className="block px-4 py-3 text-sm font-bold text-popover-foreground border-t border-border hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
