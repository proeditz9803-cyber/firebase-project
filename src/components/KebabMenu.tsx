"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MoreVertical } from 'lucide-react';

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
    <div className="fixed top-2 right-2 z-[100]" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="p-1.5 text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors rounded-none focus:outline-none"
        aria-label="Menu"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-44 bg-white border border-gray-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] rounded-none overflow-hidden">
          <Link
            href="/about"
            onClick={closeMenu}
            className="block px-5 py-3 text-black font-bold text-xs hover:bg-gray-100 transition-colors uppercase tracking-wider"
          >
            About Us
          </Link>
          <Link
            href="/privacy-policy"
            onClick={closeMenu}
            className="block px-5 py-3 text-black font-bold text-xs border-t border-gray-100 hover:bg-gray-100 transition-colors uppercase tracking-wider"
          >
            Privacy Policy
          </Link>
        </div>
      )}
    </div>
  );
}
