import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openModal } from '../modules/actions';
import { postIsReady } from '../lib/blog-helpers';
import getWorksIndex from '../lib/notion/getWorksIndex';
// コンポーネント
import HeadComponent from '../components/head';
import BaseComponent from '../components/base';
import { width, transition } from '../lib/style';

export async function getStaticProps() {
  const postsTable = await getWorksIndex();
  const posts: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug];
      // remove draft posts in production
      if (!postIsReady(post)) {
        return null;
      }

      return post;
    })
    .filter(Boolean);

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: ${width.ipad}) {
    flex-direction: column;
  }
`;

// おいおいカードは1コンポーネントとして切り出したいところ……
const Card = styled.div`
  width: calc(50% - 16px);
  height: 200px;
  margin-top: 32px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  transition: box-shadow ${transition.fast};
  @media (max-width: ${width.ipad}) {
    width: 100%;
  }
  @media (min-width: ${width.pc}) {
    &:hover {
      box-shadow: 0 0 24px rgba(0, 0, 0, 0.2);
    }
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 0;
  transition: transform ${transition.fast};
  @media (min-width: ${width.pc}) {
    ${Card}:hover & {
      transform: scale(1.2, 1.2);
    }
  }
`;

const Works = ({ posts = [] }) => {
  const dispatch = useDispatch();
  const handleOpenModal = payload => {
    dispatch(openModal(payload));
  };

  return (
    <>
      <HeadComponent title="WORKS" />
      <BaseComponent heading="WORKS">
        {posts.length === 0 && <p>投稿がありません</p>}
        <CardWrapper>
          {posts.map(post => {
            return (
              // コンテンツの中身が空だとapiがnullになって画像が表示されないらしい
              <Card
                key={post.id}
                onClick={() =>
                  handleOpenModal({
                    title: post.Title,
                    description: post.Description,
                    imageUrl: `/api/asset?assetUrl=${post.Image}&blockId=${post.id}`,
                  })
                }
              >
                <ThumbnailImage
                  src={`/api/asset?assetUrl=${post.Image}&blockId=${post.id}`}
                  alt={post.Page}
                />
              </Card>
            );
          })}
        </CardWrapper>
      </BaseComponent>
    </>
  );
};

export default Works;
