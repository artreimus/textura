import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/app/components/ui/sonner';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { ThemeProvider } from '@/app/components/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Asciify',
  description:
    'Convert images to ASCII or Braille art with customizable options',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="asciify-theme"
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            {/* Top bar */}
            <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/60 backdrop-blur">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-800 dark:text-zinc-200 tracking-tight">
                    Asciify
                  </span>
                </div>
                <ThemeToggle />
              </div>
            </header>

            <main className="flex-1">{children}</main>
            <footer className="mt-10 p-4 md:p-8 text-xs text-slate-500 dark:text-zinc-500 text-center">
              Built with ❤️. Inspired by ascii-image-converter (Apache-2.0).
              This web app is MIT-licensed.
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
