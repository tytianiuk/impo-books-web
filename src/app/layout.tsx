import type { Metadata } from 'next';

import '../theme/globals.css';
import Header from '@/components/header/header';
import Providers from '@/lib/providers';
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
      <body className={`${inter.className} h-screen antialiased`}>
        <Providers>
          <Header />
          <main className="max-w-screen-2xl h-full flex-1 mx-auto mt-4 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
