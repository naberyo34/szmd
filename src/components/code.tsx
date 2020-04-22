import React from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';

// シンタックスハイライトを使うためのコードらしい
const Code = ({ children }) => {
  return (
    <pre>
      <code
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(children, Prism.languages.js, 'js'),
        }}
      />
    </pre>
  );
};

export default Code;
