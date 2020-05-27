import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetch from 'node-fetch';
import {
  toggleModal,
  sortCategory,
  ToggleModalPayload,
} from '../modules/actions';
import DynamicHead from '../components/dynamicHead';
import ScrollFixed from '../components/scrollFixed';
import Menu from '../components/menu';
import Modal from '../components/modal';
import Header from '../components/header';
import Content from '../components/content';
import SortButton from '../components/sortButton';
import CardWrapper from '../components/cardWrapper';
import Card from '../components/card';
import Footer from '../components/footer';
import { State } from '../modules/reducers';

// paramsからサーバーサイドでpropsを取得する
export async function getStaticProps(): Promise<{} | null> {
  const response = await fetch(`https://szmd.microcms.io/api/v1/works`, {
    headers: {
      'X-API-KEY': process.env.X_API_KEY || '',
    },
  });
  // 取得に失敗した場合はnullを返却してそのままレンダリングに進む(カードなしで表示)
  if (!response.ok) return { props: { works: null } };
  const works = await response.json();
  return { props: { works } };
}

interface Props {
  works?: {
    contents: [];
    totalCount: number;
    offset: number;
    limit: number;
  };
}

interface Work {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  category: string;
  image: {
    url: string;
  };
  description: string;
}

const Works: React.FC<Props> = ({ works }: Props) => {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state: State) => state.category);
  const categories = ['全て', 'イラスト', 'プログラミング', '音楽'];
  const handleSortCategory = (target?: string): void => {
    dispatch(sortCategory(target));
  };
  const handleToggleModal = (payload: ToggleModalPayload): void => {
    dispatch(toggleModal(payload));
  };

  return (
    <>
      <DynamicHead title="WORKS" />
      <ScrollFixed />
      <Menu />
      <Modal />
      <Header />
      <Content title="WORKS">
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
          {works &&
            works.contents
              .filter(
                (work: Work) =>
                  // currentCategoryが'全て'のときは全てを返し、選択されているときは合致するものを返す
                  currentCategory === '全て' ||
                  currentCategory === work.category
              )
              .map((work: Work, index) => (
                <Card
                  key={work.id}
                  index={index}
                  onClick={(): void => {
                    handleToggleModal({
                      title: work.title,
                      image: work.image.url,
                      description: work.description,
                    });
                  }}
                  title={work.title}
                  image={work.image.url}
                />
              ))}
        </CardWrapper>
      </Content>
      <Footer />
    </>
  );
};

export default Works;
