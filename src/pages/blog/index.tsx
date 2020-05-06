import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetch from 'node-fetch';
import { sortBlogCategory } from '../../modules/actions';
import DynamicHead from '../../components/dynamicHead';
import ScrollFixed from '../../components/scrollFixed';
import Menu from '../../components/menu';
import Modal from '../../components/modal';
import Header from '../../components/header';
import Content from '../../components/content';
import CardWrapper from '../../components/cardWrapper';
import Card from '../../components/card';
import Footer from '../../components/footer';
import generateDisplayDate from '../../services/generateDisplayDate';
import { State } from '../../modules/reducers';

// paramsからサーバーサイドでpropsを取得する
export async function getServerSideProps(): Promise<{} | null> {
  // データサイズが大きいので一旦記事本文は取得しない
  const response = await fetch(
    'https://szmd.microcms.io/api/v1/blog?fields=id,title,posted,category',
    {
      headers: {
        'X-API-KEY': process.env.X_API_KEY,
      },
    }
  );
  // 取得に失敗した場合はnullを返却してそのままレンダリングに進む(カードなしで表示)
  if (!response.ok) return { props: { blog: null } };
  const blog = await response.json();
  return { props: { blog } };
}

interface Props {
  blog?: {
    contents: [];
    totalCount: number;
    offset: number;
    limit: number;
  };
}

export interface Article {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  posted: string;
  category: string;
  text: string;
}

const Blog: React.FC<Props> = ({ blog }: Props) => {
  const dispatch = useDispatch();
  const category = useSelector((state: State) => state.blog.category);
  const handleSortCategory = (target?: string): void => {
    dispatch(sortBlogCategory(target));
  };

  return (
    <>
      <DynamicHead title="BLOG" />
      <ScrollFixed />
      <Menu />
      <Modal />
      <Header />
      <Content title="BLOG">
        <button type="button" onClick={(): void => handleSortCategory()}>
          ソートを解除
        </button>
        <button type="button" onClick={(): void => handleSortCategory('日記')}>
          日記
        </button>
        <button
          type="button"
          onClick={(): void => handleSortCategory('技術記事')}
        >
          技術記事
        </button>
        <CardWrapper>
          {blog.contents
            .filter((article: Article) =>
              // categoryが存在する場合はフィルタリングを行い、しない場合は全出力する
              category ? article.category === category : true
            )
            .map((article: Article, index) => (
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
