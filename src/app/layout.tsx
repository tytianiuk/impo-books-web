import type { Metadata } from 'next';

import '../theme/globals.css';
import Header from '@/components/header/header';
import inter from '@/theme/fonts/inter';

export const metadata: Metadata = {
  title: 'ImpoBooks',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
