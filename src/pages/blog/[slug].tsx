import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
// import Highlight from 'react-highlight.js';
import fetch from 'node-fetch';
import DynamicHead from '../../components/dynamicHead';
import ScrollFixed from '../../components/scrollFixed';
import Menu from '../../components/menu';
import Header from '../../components/header';
import Content from '../../components/content';
import Footer from '../../components/footer';
import { color } from '../../services/style';
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
  font-size: 3.6rem;
  font-weight: bold;
  line-height: 1.5;
  border-bottom: 2px solid ${color.primary};
  border-left: 8px solid ${color.primary};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
    font-size: 3.2rem;
    border-left: 8px solid ${color.primary};
  }
  h3 {
    font-size: 2rem;
  }
  p {
    font-size: 1.6rem;
  }
  ul {
    padding-left: 16px;
    margin-top: 2em;
    overflow-x: auto;
    font-size: 1.6rem;
    line-height: 1.5;
    list-style: square;
  }
  li:not(:first-child) {
    margin-top: 2em;
  }

  /* TODO: シンタックスハイライトの付け方で迷っているため急造 */
  pre {
    padding: 1em;
    margin-top: 1em;
    overflow-x: auto;
    font-size: 16px; /* preはremが効かないためpx指定 */
    line-height: 1.5;
    color: #dcdcdc;
    background: #3f3f3f;
  }
`;

// paramsからサーバーサイドでpropsを取得する
export async function getServerSideProps({ params }): Promise<{} | null> {
  const response = await fetch(
    `https://szmd.microcms.io/api/v1/blog/${params.slug}`,
    {
      headers: {
        'X-API-KEY': process.env.X_API_KEY,
      },
    }
  );
  // 取得に失敗した場合はnullを返却してそのままレンダリングに進む('記事が見つかりません'を表示)
  if (!response.ok) return { props: { article: null } };
  const article = await response.json();
  return { props: { article } };
}

interface Props {
  article?: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    posted: string;
    category: string;
    text: string;
  };
}

const Slug: React.FC<Props> = ({ article }: Props) => (
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
            <ArticleWrapper
              dangerouslySetInnerHTML={{
                __html: article.text,
              }}
            />
          </>
        )}
      </Wrapper>
    </Content>
    <Footer />
  </>
);

export default Slug;
