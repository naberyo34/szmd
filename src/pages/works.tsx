import React from 'react';
import { useDispatch } from 'react-redux';
import fetch from 'node-fetch';
import { toggleModal } from '../modules/actions';
import DynamicHead from '../components/dynamicHead';
import ScrollFixed from '../components/scrollFixed';
import Menu from '../components/menu';
import Modal from '../components/modal';
import Header from '../components/header';
import Content from '../components/content';
import CardWrapper from '../components/cardWrapper';
import Card from '../components/card';
import Footer from '../components/footer';

// paramsからサーバーサイドでpropsを取得する
export async function getServerSideProps(): Promise<{} | null> {
  const response = await fetch(`https://szmd.microcms.io/api/v1/works`, {
    headers: {
      'X-API-KEY': process.env.X_API_KEY,
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
  image: {
    url: string;
  };
  description: string;
}

const Works: React.FC<Props> = ({ works }: Props) => {
  const dispatch = useDispatch();
  const handleToggleModal = (payload): void => {
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
        <CardWrapper>
          {works.contents.map((work: Work, index) => (
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
