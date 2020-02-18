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
    font-family: 'Raleway', sans-serif;
    line-height: 1;
    color: ${color.text};
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
      <meta name="twitter:site" content="@momochitama" />
      <meta name="twitter:card" content="summary_large_image" />
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:700i,900i&amp;display=swap"
        rel="stylesheet"
      />
    </Head>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
)
