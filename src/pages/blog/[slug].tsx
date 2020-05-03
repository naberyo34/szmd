import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
// import Highlight from 'react-highlight.js';
import { getBlog } from '../../modules/actions';
import DynamicHead from '../../components/dynamicHead';
import ScrollFixed from '../../components/scrollFixed';
import Menu from '../../components/menu';
import Header from '../../components/header';
import Content from '../../components/content';
import Footer from '../../components/footer';
import { State } from '../../modules/reducers';
import { Article } from './index';
import { color } from '../../services/style';
import generateDisplayDate from '../../services/generateDisplayDate';

const wrapperVariants = {
  initial: { opacity: 0 },
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

const Wrapper = styled(motion.article)``;

const Title = styled.h1`
  padding-left: 8px;
  font-size: 3.6rem;
  font-weight: bold;
  line-height: 1.5;
  border-bottom: 2px solid ${color.primary};
  border-left: 8px solid ${color.primary};
`;

const Date = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  text-align: right;
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

const Slug: React.FC = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state: State) => state.blog);

  const router = useRouter();
  const { slug } = router.query;
  // routerから受け取ったslugと一致する記事を検索して返す
  // TODO: 非効率なのでslugに合わせてリクエストを飛ばすような形にしたい
  const articleData: Article = blog.find(
    (article: Article) => article.id === slug
  );

  useEffect(() => {
    // Storeにworksが格納されていない場合は, 非同期通信でworksを取得する
    if (!blog.length) dispatch(getBlog.start());
  }, []);

  return (
    <>
      <DynamicHead
        title={articleData ? articleData.title : '記事が見つかりません'}
      />
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
          {!articleData && <p>記事が見つかりません</p>}
          {articleData && (
            <>
              <Title>{articleData.title}</Title>
              <Date>{generateDisplayDate(articleData.posted)}</Date>
              <ArticleWrapper
                dangerouslySetInnerHTML={{
                  __html: articleData.text,
                }}
              />
            </>
          )}
        </Wrapper>
      </Content>
      <Footer />
    </>
  );
};

export default Slug;
