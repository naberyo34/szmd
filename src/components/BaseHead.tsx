import React from 'react';
import Head from 'next/head';

const BaseHead: React.FC = () => (
  <Head>
    <meta property="og:site_name" content="SZMD" />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:image" content="https://szmd.jp/og.jpg" />
    <meta name="twitter:site" content="@momochitama" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,200;1,700;1,900&display=swap"
      rel="stylesheet"
    />
  </Head>
);

export default BaseHead;
