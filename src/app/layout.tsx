import Header from '@/ui/organisms/header/Header';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  title: 'Barbadens | Camisas a la medida',
  description:
    'Crea tu camisa a medida con el mejor algodón pima peruano. Descubre la mejor moda masculina.',
  keywords: [
    'camisas Perú',
    'camisas a medida',
    'moda masculina',
    'consejos de estilo',
    'Barbadens',
  ],
  generator: 'Next.js',
  applicationName: 'Barbadens App',
  referrer: 'origin-when-cross-origin',
  creator: 'Francisco Vento',
  openGraph: {
    title: 'Barbadens | Camisas a la medida',
    description:
      'Crea tu camisa a medida con el mejor algodón pima peruano. Descubre la mejor moda masculina.',
    url: BASE_URL,
    siteName: 'Barbadens',
    images: [
      {
        url: `${BASE_URL}/images/og-icon.jpg`, // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: `${BASE_URL}/images/og-logotipo-1200x630.jpg`, // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: 'Barbadens camisas',
      },
      {
        url: `${BASE_URL}/images/og-logotipo-1200x630.jpg`, // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'Barbadens camisas',
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
