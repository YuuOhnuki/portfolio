import Head from 'next/head';
import React from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const Seo: React.FC<SeoProps> = ({
  title = '[YOUR NAME].dev | デジタルの未来を、今、形にする。',
  description = '若者の「今」をコード化し、未来を駆動するフルスタックデベロッパー。Next.js, Python, AI連携など最新技術で、あなたのアイデアを形にします。',
  url = 'https://your-portfolio-url.com',
  image = '/og-image.png',
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default Seo;
