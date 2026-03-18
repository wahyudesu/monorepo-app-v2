import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import localFont from 'next/font/local';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { AppLayoutWrapper } from '@/components/layout/AppLayoutWrapper';
import { PageSkeleton } from '@/components/ui';
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const openRunde = localFont({
  src: [
    {
      path: '../../public/fonts/web/OpenRunde-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/web/OpenRunde-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/web/OpenRunde-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-open-runde',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Dashboard App',
    template: '%s | Dashboard App',
  },
  description: 'Built with Next.js + shadcn/ui',
  applicationName: 'Dashboard App',
  authors: [{ name: 'Your Name' }],
  keywords: ['dashboard', 'analytics', 'social media', 'next.js', 'shadcn/ui'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    siteName: 'Dashboard App',
    title: 'Dashboard App',
    description: 'Built with Next.js + shadcn/ui',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Dashboard App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard App',
    description: 'Built with Next.js + shadcn/ui',
    images: ['/og.png'],
    creator: '@yourhandle',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'oklch(1 0 0)' },
    { media: '(prefers-color-scheme: dark)', color: 'oklch(0.145 0 0)' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", figtree.variable)}>
      <body className={openRunde.className}>
        <TooltipProvider>
          <Suspense fallback={<PageSkeleton />}>
            <AppLayoutWrapper>{children}</AppLayoutWrapper>
          </Suspense>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
