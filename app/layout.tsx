/* eslint-disable react/react-in-jsx-scope */
import Script from 'next/script';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verity OS',
  description: 'Verity OS: The omni-chain crypto operating system revolutionizing blockchain interactions with unparalleled user experience.',
  openGraph: {
    title: 'Verity OS',
    description: 'Verity OS: The omni-chain crypto operating system revolutionizing blockchain interactions with unparalleled user experience.',
    url: 'https://verity.framer.website',
    siteName: 'Verity OS',
    images: [
      {
        url: 'https://cloud.artopia.dev/storage/ogos.png',
        width: 1200,
        height: 630,
        alt: 'Verity OS',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verity OS',
    description: 'Verity OS: The omni-chain crypto operating system revolutionizing blockchain interactions with unparalleled user experience.',
    site: '@VerityOS',
    creator: '@VerityOS',
    images: ['https://cloud.artopia.dev/storage/ogos.png'],
  },
  icons: {
    icon: 'https://cloud.artopia.dev/storage/verityicon.png',
    apple: 'https://cloud.artopia.dev/storage/verityicon.png',
  },
  other: {
    'github:card': 'summary_large_image',
    'github:site': 'https://github.com/VerityOS',
    'github:title': 'Verity OS',
    'github:description': 'Verity OS: The omni-chain crypto operating system revolutionizing blockchain interactions with unparalleled user experience.',
    'github:image': 'https://cloud.artopia.dev/storage/ogos.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cloud.artopia.dev/telemetry/pixel/ktTCoUNLitDHCEk2"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
