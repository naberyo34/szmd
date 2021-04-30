import React from 'react';
import fetch from 'node-fetch';
import DynamicHead from '../components/dynamicHead';
import Header from '../components/header';
import Content from '../components/content';
import CardWrapper from '../components/cardWrapper';
import Card from '../components/card';
import Footer from '../components/footer';

// paramsからサーバーサイドでpropsを取得する
export async function getStaticProps(): Promise<{} | null> {
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
  category: string;
  image: {
    url: string;
  };
  description: string;
}

const Works: React.FC<Props> = ({ works }: Props) => (
  <>
    <DynamicHead title="WORKS" />
    {/* <Menu /> */}
    {/* <Modal /> */}
    <Header />
    <Content title="WORKS">
      {/* <div>
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
        </div> */}
      <CardWrapper>
        {works &&
          works.contents.map((work: Work, index) => (
            <Card
              key={work.id}
              index={index}
              title={work.title}
              image={work.image.url}
            />
          ))}
      </CardWrapper>
    </Content>
    <Footer />
  </>
);

export default Works;
