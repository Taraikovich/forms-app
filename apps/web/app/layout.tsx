import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AppBar from '@/components/app-bar';
import { Stack } from 'react-bootstrap';
import getTheme from '@/lib/getTheme';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Forms',
  description: 'App for create forms',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();

  return (
    <html lang="en" data-bs-theme={theme}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppBar />
        <Stack gap={3} className="mx-auto mt-2" style={{ maxWidth: '95%' }}>
          {children}
        </Stack>
      </body>
    </html>
  );
}
