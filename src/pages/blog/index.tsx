import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetch from 'node-fetch';
import { sortCategory } from '../../modules/actions';
import DynamicHead from '../../components/dynamicHead';
import ScrollFixed from '../../components/scrollFixed';
import Menu from '../../components/menu';
import Modal from '../../components/modal';
import Header from '../../components/header';
import Content from '../../components/content';
import SortButton from '../../components/sortButton';
import CardWrapper from '../../components/cardWrapper';
import Card from '../../components/card';
import Footer from '../../components/footer';
import generateDisplayDate from '../../services/generateDisplayDate';
import { State } from '../../modules/reducers';

// paramsからサーバーサイドでpropsを取得する
export async function getStaticProps(): Promise<{} | null> {
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
  const currentCategory = useSelector((state: State) => state.category);
  const categories = ['全て', '技術記事', '日記'];
  const handleSortCategory = (target?: string): void => {
    dispatch(sortCategory(target));
  };

  return (
    <>
      <DynamicHead title="BLOG" />
      <ScrollFixed />
      <Menu />
      <Modal />
      <Header />
      <Content title="BLOG">
        <div>
          {categories.map((category, index) => (
            <SortButton
              key={category}
              index={index}
              onClick={(): void => handleSortCategory(category)}
              label={category}
              active={currentCategory === category}
            >
              {category}
            </SortButton>
          ))}
        </div>
        <CardWrapper>
          {blog &&
            blog.contents
              .filter(
                (article: Article) =>
                  // currentCategoryが'全て'のときは全てを返し、選択されているときは合致するものを返す
                  currentCategory === '全て' ||
                  currentCategory === article.category
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
