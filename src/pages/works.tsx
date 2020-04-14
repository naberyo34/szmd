import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openModal } from '../modules/actions';
import { postIsReady } from '../lib/blog-helpers';
import getNotionUsers from '../lib/notion/getNotionUsers';
import getWorksIndex from '../lib/notion/getWorksIndex';
import Base from '../components/base';
import { width, transition } from '../lib/style';

export async function getStaticProps() {
  const postsTable = await getWorksIndex();

  const authorsToGet: Set<string> = new Set();
  const posts: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug];
      // remove draft posts in production
      if (!postIsReady(post)) {
        return null;
      }
      post.Authors = post.Authors || [];
      for (const author of post.Authors) {
        authorsToGet.add(author);
      }

      return post;
    })
    .filter(Boolean);

  const { users } = await getNotionUsers([...authorsToGet]);

  posts.map(post => {
    post.Authors = post.Authors.map(id => users[id].full_name);
  });

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
  margin: 64px auto 0;
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
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow ${transition.fast};
  @media (max-width: ${width.ipad}) {
    width: 100%;
  }
  &:hover {
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.2);
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 0;
  transition: transform ${transition.fast};
  ${Card}:hover & {
    transform: scale(1.2, 1.2);
  }
`;

const Works = ({ posts = [] }) => {
  const dispatch = useDispatch();
  const handleOpenModal = payload => {
    dispatch(openModal(payload));
  };

  return (
    <Base heading="WORKS">
      {posts.length === 0 && <p>投稿がありません</p>}
      <CardWrapper>
        {posts.map(post => {
          return (
            // コンテンツの中身が空だとapiがnullになって画像が表示されないらしい
            <Card
              key={post.id}
              onClick={() =>
                handleOpenModal({
                  title: post.Page,
                  imageUrl: `/api/asset?assetUrl=${post.Thumbnail}&blockId=${post.id}`,
                })
              }
            >
              <ThumbnailImage
                src={`/api/asset?assetUrl=${post.Thumbnail}&blockId=${post.id}`}
                alt={post.Page}
              />
            </Card>
          );
        })}
      </CardWrapper>
    </Base>
  );
};

export default Works;
