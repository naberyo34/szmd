import 'minireset.css'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

const color = {
  text: '#333',
  bg: '#f6d365',
}

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    font-family: 'Raleway', 'Noto Sans JP', sans-serif;
    font-style: italic;
    line-height: 1;
    color: ${color.text};
    background: ${color.bg};
  }

  p {
    font-style: normal;
    line-height: 1.5;
  }
`

export default ({ Component, pageProps }) => (
  <>
    <Head>
      <title>SZMD</title>
      <meta name="description" content="SZMD | tama portfolio page" />
      <meta property="og:url" content="https://szmd.jp" />
      <meta property="og:title" content="SZMD" />
      <meta
        property="og:description"
        content="tama / Ryo Watanabe のポートフォリオ"
      />
      <meta property="og:image" content="/og-image.png" />
      <meta name="twitter:site" content="@momochitama" />
      <meta name="twitter:card" content="summary_large_image" />
      <link
        href="https://fonts.googleapis.com/css?family=Noto+Sans+JP|Raleway:700i,900i&display=swap"
        rel="stylesheet"
      />
    </Head>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
)
