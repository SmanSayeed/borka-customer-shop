import { Toaster } from '@/components/ui/sonner';
import Providers from '@/providers/Providers';
import type { Metadata } from 'next';
import { DM_Sans, Marcellus } from 'next/font/google';
import './globals.css';

const marcellus = Marcellus({
  variable: '--font-marcellus',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Faith Journey',
  description: 'An Abaya E-commerce Online Shop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={` ${dmSans.variable} ${marcellus.variable} font-dmSans text-foreground antialiased bg-[#f7fbfe]`}
        suppressHydrationWarning
      >
        <Providers>
          <Toaster position='top-right' richColors />
          {children}
        </Providers>
      </body>
    </html>
  );
}
