import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/app/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ASCII/Braille Image Converter",
  description: "Convert images to ASCII or Braille art with customizable options",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <footer className="mt-10 p-4 md:p-8 text-xs text-slate-500 dark:text-zinc-500 text-center">
            Built with ❤️. Inspired by ascii-image-converter (Apache-2.0). This
            web app is MIT-licensed.
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
