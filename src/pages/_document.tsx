import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// TODO: 仕方なかった
type Props = {
  styleElement: any;
};

export default class MyDocument extends Document<Props> {
  /* TODO: 正直あまりわかってない styled-componentsをSSRで使うための処理
    https://styled-components.com/docs/advanced#server-side-rendering
  */
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    // ページコンポーネントからスタイルを取得
    const page = renderPage((App) => (props) =>
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      sheet.collectStyles(<App {...props} />)
    );
    // スタイルタグを返す
    const styleElement = sheet.getStyleElement();

    return { ...page, styleElement };
  }

  // getInitialPropsで生成したスタイルタグをheadに埋め込む
  render() {
    return (
      <Html lang="ja">
        <Head>{this.props.styleElement}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
