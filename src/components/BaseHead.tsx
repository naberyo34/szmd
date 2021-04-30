import React from 'react';
import Head from 'next/head';

const BaseHead: React.FC = () => (
  <Head>
    <meta property="og:site_name" content="SZMD" />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:image" content="https://szmd.jp/og.jpg" />
    <meta name="twitter:site" content="@momochitama" />
    <meta name="twitter:card" content="summary_large_image" />
    <link
      href="https://fonts.googleapis.com/css?family=Raleway:700i,900i&display=swap"
      rel="stylesheet"
    />
  </Head>
);

export default BaseHead;
