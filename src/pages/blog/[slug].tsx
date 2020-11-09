import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ReactHtmlParser from 'html-react-parser';
import SyntaxHighlighter from 'react-syntax-highlighter';
import zenburn from 'react-syntax-highlighter/dist/cjs/styles/hljs/zenburn';

import DynamicHead from '../../components/dynamicHead';
import ScrollFixed from '../../components/scrollFixed';
import SmoothScroll from '../../components/smoothScroll';
import Menu from '../../components/menu';
import Header from '../../components/header';
import Content from '../../components/content';
import Footer from '../../components/footer';
import { color, transition } from '../../services/style';
import {
  getArticlePaths,
  getArticle,
  getArticleLink,
  Article,
  ArticleLink,
} from '../../services/microcms';
import generateDisplayDate from '../../services/generateDisplayDate';

const wrapperVariants = {
  initial: { opacity: 0 },
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

const Wrapper = styled(motion.article)`
  max-width: 800px;
  margin: 0 auto;
`;

const Error = styled.p`
  font-size: 1.6rem;
`;

const Title = styled.h1`
  padding-left: 8px;
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 1.5;
  border-bottom: 2px solid ${color.primary};
  border-left: 8px solid ${color.primary};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &:not(:first-of-type) {
    margin-top: 1em;
  }
`;

const Twitter = styled.a`
  transition: opacity ${transition.fast};

  &:hover {
    opacity: 0.8;
  }
`;

const Posted = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Category = styled.p`
  position: relative;
  display: inline-block;
  padding: 2px 4px;
  margin-left: 1em;
  font-size: 1.2rem;
  background: ${color.primary};
`;

const ArticleWrapper = styled.div`
  h2,
  h3 {
    font-weight: bold;
    line-height: 1.5;
  }
  h2,
  h3,
  p {
    margin-top: 2em;
  }
  h2 {
    padding-left: 8px;
    font-size: 2.4rem;
    border-left: 8px solid ${color.primary};
  }
  h3 {
    font-size: 2rem;
  }
  p {
    font-size: 1.6rem;
  }
  ul {
    padding: 2em 2em 2em 3em;
    margin-top: 2em;
    overflow-x: auto;
    font-size: 1.6rem;
    line-height: 1.8;
    list-style: square;
    background: ${color.gray};
  }
  li:not(:first-child) {
    margin-top: 0.5em;
  }
  img {
    max-width: 100%;
    margin: 2em 0;
  }

  a {
    color: ${color.secondary};
  }

  code {
    padding: 0.2em;
    margin: 0 0.2em;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier,
      monospace;
    font-size: 1.4rem;

    /* zenburn styleに統一 */
    color: #dcdcdc;
    background: #3f3f3f;
  }

  pre {
    padding: 2em !important;
    margin-top: 32px;
    font-size: 1.6rem;
    line-height: 1.8;

    code {
      padding: 0;
      margin: 0;
      font-size: inherit;
      color: inherit;
      background: inherit;
    }
  }
`;

const LinkWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-top: 128px;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${color.secondary};
`;

const LinkInner = styled.div`
  max-width: calc(50% - 8px);
`;

const LinkText = styled.a`
  line-height: 1.8;
  color: inherit;
`;

// 記事のSlug一覧を取得してgetStaticPropsに渡す
export async function getStaticPaths(): Promise<{} | null> {
  const url = await getArticlePaths();
  // fallback: trueの場合、存在しないSlugが来た場合は'記事が見つかりません'のレンダリングを行う
  return { paths: url, fallback: true };
}

// paramsからサーバーサイドでpropsを取得する
export async function getStaticProps({ params }): Promise<{} | null> {
  // 記事本体の取得
  const article = await getArticle(params.slug);
  // 記事の前後リンクの取得
  const articleLink = await getArticleLink(params.slug);

  return { props: { article, articleLink } };
}

interface Props {
  article?: Article;
  articleLink?: ArticleLink;
}

/**
 * 本文のコード部分をハイライトしてJSXとして返す
 * @param raw APIから受け取った生データ
 */
const highlightArticle = (raw: string): JSX.Element[] => {
  // 生データをJSXにパースする
  const rawJSX = ReactHtmlParser(raw) as JSX.Element[];
  const resultJSX: JSX.Element[] = [];

  // preタグがある箇所だけSyntaxHighlighterのJSXに置換する
  rawJSX.forEach((element, index) => {
    if (element.type !== 'pre') resultJSX.push(element);
    else {
      // 整形
      const code = ReactDOMServer.renderToStaticMarkup(element)
        // 不要なpre / codeタグの削除
        .replace(/<\/?(pre|code)>/g, '')
        // エスケープ文字をもとに戻す (追加必要な可能性あり)
        .replace(/&#x27;/g, `'`)
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
      const highlightElement = (
        <SyntaxHighlighter
          language="javascript"
          style={zenburn}
          // eslint-disable-next-line
          key={index}
        >
          {code}
        </SyntaxHighlighter>
      );

      resultJSX.push(highlightElement);
    }
  });

  return resultJSX;
};

const Slug: React.FC<Props> = ({ article, articleLink }: Props) => {
  const router = useRouter();

  return (
    <>
      <DynamicHead title={article ? article.title : '記事が見つかりません'} />
      <ScrollFixed />
      <SmoothScroll />
      <Menu />
      <Header />
      <Content>
        <Wrapper
          variants={wrapperVariants}
          initial="initial"
          animate="fadeIn"
          exit="fadeOut"
          transition={{ type: 'tween', duration: 0.2, delay: 0.1 }}
        >
          {!article && (
            <Error>
              記事が見つかりません……
              <br />
              URLが間違っているか、記事が削除された可能性があります。
            </Error>
          )}
          {article && (
            <>
              <Title>{article.title}</Title>
              <Info>
                <Posted>{generateDisplayDate(article.posted, true)}</Posted>
                <Category>{article.category}</Category>
              </Info>
              <Info>
                <Twitter
                  href={`https://twitter.com/intent/tweet?text=${article.title}%20%7C%20SZMD&url=https://szmd.jp${router.asPath}`}
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    src="/twitter.png"
                    alt="Twitter"
                    width="32"
                    height="32"
                  />
                </Twitter>
              </Info>
              <ArticleWrapper>{highlightArticle(article.text)}</ArticleWrapper>
            </>
          )}
          {articleLink && (
            <LinkWrapper>
              <LinkInner>
                {articleLink.prev && (
                  <Link href="[slug]" as={articleLink.prev.id}>
                    <LinkText href={articleLink.prev.id}>
                      {articleLink.prev.title}
                    </LinkText>
                  </Link>
                )}
              </LinkInner>
              <LinkInner>
                {articleLink.next && (
                  <Link href="[slug]" as={articleLink.next.id}>
                    <LinkText href={articleLink.next.id}>
                      {articleLink.next.title}
                    </LinkText>
                  </Link>
                )}
              </LinkInner>
            </LinkWrapper>
          )}
        </Wrapper>
      </Content>
      <Footer />
    </>
  );
};

export default Slug;
