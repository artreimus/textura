"use client";

import { useEffect, useRef, useState } from 'react';
import { Moon, Sun, Monitor, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/app/components/ui/button';

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, []);

  if (!mounted) return null;

  const current = theme ?? 'system';
  const icon = current === 'dark' ? (
    <Moon className="w-4 h-4" />
  ) : current === 'light' ? (
    <Sun className="w-4 h-4" />
  ) : (
    <Monitor className="w-4 h-4" />
  );
  const label = current === 'system' ? 'System' : current === 'light' ? 'Light' : 'Dark';

  return (
    <div ref={ref} className="relative">
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="gap-2"
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
        <ChevronDown className="w-4 h-4 opacity-60" />
      </Button>

      {open && (
        <div
          role="menu"
          aria-label="Select theme"
          className="absolute right-0 mt-2 w-36 rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-md p-1 z-50"
        >
          <button
            role="menuitemradio"
            aria-checked={current === 'light'}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200"
            onClick={() => {
              setTheme('light');
              setOpen(false);
            }}
          >
            <Sun className="w-4 h-4" />
            Light
          </button>
          <button
            role="menuitemradio"
            aria-checked={current === 'dark'}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200"
            onClick={() => {
              setTheme('dark');
              setOpen(false);
            }}
          >
            <Moon className="w-4 h-4" />
            Dark
          </button>
          <div className="px-2.5 pt-1.5 pb-1 text-[10px] uppercase tracking-wide text-slate-400 dark:text-zinc-500">
            Default: System ({resolvedTheme ?? 'auto'})
          </div>
        </div>
      )}
    </div>
  );
}
