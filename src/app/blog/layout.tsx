import BlogHeader from '@/ui/organisms/header/BlogHeader';
import { Metadata } from 'next';
import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  title:
    'Blog de Barbadens - Consejos y Guías sobre Camisas de Algodón Pima Peruano',
  description:
    'Descubre consejos y guías sobre cómo elegir la talla perfecta de camisa, cómo cuidar tu ropa de algodón pima peruano y más en el blog de Barbadens.',
  keywords: [
    'camisas de algodón pima peruano',
    'camisas a medida',
    'moda masculina',
    'consejos de estilo',
    'Barbadens',
  ],
  applicationName: 'Barbadens Blog',
  openGraph: {
    title: 'Barbadens | Blog',
    description:
      'Descubre consejos y guías sobre cómo elegir la talla perfecta de camisa y más en el blog de Barbadens.',
    url: `${BASE_URL}/blog`,
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

const layout: FC<Props> = ({ children }) => {
  return (
    <>
      <BlogHeader />
      {children}
    </>
  );
};
export default layout;
