import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getBlog } from '../../modules/actions';
import DynamicHead from '../../components/dynamicHead';
import ScrollFixed from '../../components/scrollFixed';
import Menu from '../../components/menu';
import Header from '../../components/header';
import Content from '../../components/content';
import Footer from '../../components/footer';
import { State } from '../../modules/reducers';
import { Article } from './index';
import generateDisplayDate from '../../services/generateDisplayDate';

const wrapperVariants = {
  initial: { opacity: 0 },
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

const Wrapper = styled(motion.div)``;

const Slug: React.FC = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state: State) => state.blog);

  const router = useRouter();
  const { slug } = router.query;
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
              <p>{articleData.title}</p>
              <p>{generateDisplayDate(articleData.posted)}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: articleData.article,
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
