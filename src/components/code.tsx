import React from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';

// シンタックスハイライトを使うためのコードらしい
const Code = ({ children }) => {
  return (
    <>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(children, Prism.languages.js, 'js'),
          }}
        />
      </pre>
      <style jsx>{`
        pre {
          tab-size: 2;
        }

        code {
          display: block;
          margin-top: 1em;
          padding: 1em;
          font-size: 1.6rem;
          line-height: 1.5;
          background: #f5f5f5;
          overflow-x: scroll;
        }
      `}</style>
    </>
  );
};

export default Code;
