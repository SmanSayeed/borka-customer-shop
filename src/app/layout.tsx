import type { Metadata } from 'next';
import { Marcellus, DM_Sans, Marck_Script } from 'next/font/google';
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

const marckScript = Marck_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-marck-script',
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
        className={` ${dmSans.variable} ${marcellus.variable} ${marckScript.variable} font-dmSans bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
