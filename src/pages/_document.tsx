import React from 'react';
import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// see: https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
type InitialProps = {
  styles: JSX.Element;
  html: string;
  head?: (JSX.Element | null)[] | undefined;
};

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<InitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />), // eslint-disable-line react/jsx-props-no-spreading
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
