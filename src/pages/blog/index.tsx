import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlog } from '../../modules/actions';
import DynamicHead from '../../components/dynamicHead';
import ScrollFixed from '../../components/scrollFixed';
import Menu from '../../components/menu';
import Modal from '../../components/modal';
import Header from '../../components/header';
import Content from '../../components/content';
import Loading from '../../components/loading';
import CardWrapper from '../../components/cardWrapper';
import Card from '../../components/card';
import Footer from '../../components/footer';
import { State } from '../../modules/reducers';
import generateDisplayDate from '../../services/generateDisplayDate';

export interface Article {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  posted: string;
  category: string;
  text: string;
}

const Blog: React.FC = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state: State) => state.blog);

  useEffect(() => {
    // Storeにworksが格納されていない場合は, 非同期通信でworksを取得する
    if (!blog.length) dispatch(getBlog.start());
  }, []);

  return (
    <>
      <DynamicHead title="BLOG" />
      <ScrollFixed />
      <Menu />
      <Modal />
      <Header />
      <Content title="BLOG">
        <Loading />
        <CardWrapper>
          {blog.map((article: Article, index) => (
            <Card
              key={article.id}
              blogId={article.id}
              index={index}
              title={article.title}
              posted={generateDisplayDate(article.posted)}
              category={article.category}
            />
          ))}
        </CardWrapper>
      </Content>
      <Footer />
    </>
  );
};

export default Blog;
