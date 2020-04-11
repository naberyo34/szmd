import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { getBlogLink, getDateStr, postIsReady } from '../../lib/blog-helpers';
import getNotionUsers from '../../lib/notion/getNotionUsers';
import getBlogIndex from '../../lib/notion/getBlogIndex';

import Base from '../../components/base';
import { width, color } from '../../lib/style';

export async function getStaticProps() {
  const postsTable = await getBlogIndex();

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

const Card = styled.div`
  width: calc(50% - 16px);
  padding: 20px;
  margin-top: 32px;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.4s;
  @media (max-width: ${width.ipad}) {
    width: 100%;
  }
  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 120px;
  margin-top: 16px;
  overflow: hidden;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.4s;
  ${Card}:hover & {
    transform: scale(1.2, 1.2);
  }
`;

const Title = styled.h3`
  margin-top: 1em;
  overflow: hidden;
  font-size: 1.6rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Date = styled.span`
  font-family: 'Raleway', sans-serif;
  font-size: 1.2rem;
  font-style: italic;
  color: ${color.bg};
`;

const Index = ({ posts = [] }) => {
  return (
    <Base heading="BLOG">
      {posts.length === 0 && <p>oops! 投稿が見つかりません……</p>}
      <CardWrapper>
        {posts.map(post => {
          return (
            <Link
              href="/blog/[slug]"
              as={getBlogLink(post.Slug)}
              key={post.Slug}
            >
              <Card>
                {post.Date && <Date>{getDateStr(post.Date)}</Date>}
                <Title>{post.Page}</Title>
                <Thumbnail>
                  {post.Thumbnail ? (
                    <ThumbnailImage
                      key={post.id}
                      src={`/api/asset?assetUrl=${post.Thumbnail}&blockId=${post.id}`}
                      alt={post.Page}
                    />
                  ) : (
                    <ThumbnailImage
                      key={post.id}
                      src="/noimage.png"
                      alt={post.Page}
                    />
                  )}
                </Thumbnail>
              </Card>
            </Link>
          );
        })}
      </CardWrapper>
    </Base>
  );
};

export default Index;
