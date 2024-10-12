import type { Metadata } from 'next';
import '../theme/globals.css';
import montserrat from '@/theme/fonts/montserrat';

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
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
