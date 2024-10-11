import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import './global.css';
import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import dynamic from 'next/dynamic';

const OnchainProviders = dynamic(
  () => import('src/components/OnchainProviders'),
  {
    ssr: false,
  },
);

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'Moo Deng Helps Chiang Mai',
  description: 'Donate USDC to help flood-affected schools in Chiang Mai, Thailand',
  openGraph: {
    title: 'Moo Deng Helps Chiang Mai',
    description: 'Donate USDC to help flood-affected schools in Chiang Mai, Thailand',
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center">
        <OnchainProviders>
          <div className="w-full">
          {children}
          </div>
        </OnchainProviders>
      </body>
    </html>
  );
}
