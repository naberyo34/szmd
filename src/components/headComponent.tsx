import React from 'react';
import Head from 'next/head';

interface Props {
  title?: string;
}

const HeadComponent: React.FC<Props> = (props) => {
  const { title } = props;

  return (
    <Head>
      <title>{title ? `${title} | SZMD` : 'SZMD | tama portfolio page'}</title>
      <meta name="description" content="tama / Ryo Watanabe のポートフォリオ" />
      <meta property="og:url" content="https://szmd.jp" />
      <meta
        property="og:title"
        content={title ? `${title} | SZMD` : 'SZMD | tama portfolio page'}
      />
      <meta property="og:site_name" content="SZMD" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="tama / Ryo Watanabe のポートフォリオ"
      />
      <meta property="og:image" content="https://szmd.jp/og.jpg" />
      <meta name="twitter:site" content="@momochitama" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href="https://szmd.jp/" />
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:700i,900i&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export default HeadComponent;
