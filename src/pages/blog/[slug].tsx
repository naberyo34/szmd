import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DynamicHead from '../../components/dynamicHead';
import ScrollFixed from '../../components/scrollFixed';
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

const Wrapper = styled(motion.article)``;

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
    padding: 16px;
    margin-top: 2em;
    overflow-x: auto;
    font-size: 1.6rem;
    line-height: 1.5;
    list-style: inside square;
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

  /* TODO: シンタックスハイライトの付け方で迷っているため急造 */
  code {
    padding: 0.1em 0.5em;
    margin: 0 0.5em;
    font-size: 1.6rem;
    color: #efefef;
    background: #3f3f3f;
  }

  pre {
    padding: 1.6rem;
    margin-top: 3.2rem;
    overflow-x: auto;
    line-height: 1.5;
    background: #3f3f3f;

    code {
      padding: 0;
      margin: 0;
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
  line-height: 1.5;
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

const Slug: React.FC<Props> = ({ article, articleLink }: Props) => {
  const router = useRouter();

  return (
    <>
      <DynamicHead title={article ? article.title : '記事が見つかりません'} />
      <ScrollFixed />
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
              <ArticleWrapper
                dangerouslySetInnerHTML={{
                  __html: article.text,
                }}
              />
            </>
          )}
          {articleLink && (
            <LinkWrapper>
              <LinkInner>
                {articleLink.prev && (
                  <Link href="[slug]" as={articleLink.prev.id}>
                    <LinkText href={articleLink.prev.id}>
                      « {articleLink.prev.title}
                    </LinkText>
                  </Link>
                )}
              </LinkInner>
              <LinkInner>
                {articleLink.next && (
                  <Link href="[slug]" as={articleLink.next.id}>
                    <LinkText href={articleLink.next.id}>
                      {articleLink.next.title} »
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
