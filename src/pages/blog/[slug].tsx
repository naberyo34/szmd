import React from 'react';
import Head from 'next/head';
import ReactJSXParser from '@zeit/react-jsx-parser';
import styled from 'styled-components';
import Heading from '../../components/heading';
import components from '../../components/dynamic';
import { textBlock } from '../../lib/notion/renderers';
import getPageData from '../../lib/notion/getPageData';
import getBlogIndex from '../../lib/notion/getBlogIndex';
import getNotionUsers from '../../lib/notion/getNotionUsers';
import { getBlogLink, getDateStr } from '../../lib/blog-helpers';

import Base from '../../components/base';

// Get the data for each blog post
// getStaticProps, getStaticPathsはNextの機能
export async function getStaticProps({ params: { slug }, preview }) {
  // load the postsTable so that we can get the page's ID
  const postsTable = await getBlogIndex();
  const post = postsTable[slug];

  // if we can't find the post or if it is unpublished and
  // viewed without preview mode then we just redirect to /blog
  if (!post || (post.Published !== 'Yes' && !preview)) {
    console.log(`Failed to find post for slug: ${slug}`);

    return {
      props: {
        redirect: '/blog',
        preview: false,
      },
      revalidate: 5,
    };
  }
  const postData = await getPageData(post.id);
  post.content = postData.blocks;

  for (let i = 0; i < postData.blocks.length; i += 1) {
    const { value } = postData.blocks[i];
    const { type, properties } = value;
    if (type === 'tweet') {
      const src = properties.source[0][0];
      // parse id from https://twitter.com/_ijjk/status/TWEET_ID format
      const tweetId = src.split('/')[5].split('?')[0];
      if (!tweetId) continue;

      try {
        const res = await fetch(
          `https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`
        );
        const json = await res.json();
        properties.html = json.html.split('<script')[0];
        post.hasTweet = true;
      } catch (_) {
        console.log(`Failed to get tweet embed for ${src}`);
      }
    }
  }

  const { users } = await getNotionUsers(post.Authors || []);
  post.Authors = Object.keys(users).map(id => users[id].full_name);

  return {
    props: {
      post,
      preview: preview || false,
    },
    revalidate: 10,
  };
}

// Return our list of blog posts to prerender
export async function getStaticPaths() {
  const postsTable = await getBlogIndex();
  // we fallback for any unpublished posts to save build time
  // for actually published ones

  return {
    paths: Object.keys(postsTable)
      .filter(post => postsTable[post].Published === 'Yes')
      .map(slug => getBlogLink(slug)),
    fallback: true,
  };
}

const listTypes = new Set(['bulleted_list', 'numbered_list']);

const color = {
  text: '#333',
  bg: '#f6d365',
};

const Date = styled.span`
  font-family: 'Raleway', sans-serif;
  font-size: 1.6rem;
  font-style: italic;
  color: ${color.bg};
`;

const Article = styled.article`
  padding-top: 1.6rem;

  h1,
  h2,
  h3 {
    margin-top: 1em;
    font-weight: bold;
  }

  h1 {
    font-size: 3.6rem;
  }

  h2 {
    font-size: 3.2rem;
  }

  h3 {
    font-size: 2.8rem;
  }

  p {
    margin-top: 1em;
    font-size: 1.6rem;
  }

  ul {
    margin-top: 1em;
    font-size: 1.6rem;
    line-height: 1.5;
    list-style: square inside;
  }
`;

const RenderPost = ({ post }) => {
  let listTagName: string | null = null;
  let listLastId: string | null = null;
  let listMap: {
    [id: string]: {
      key: string;
      isNested?: boolean;
      nested: string[];
      children: React.ReactFragment;
    };
  } = {};

  return (
    <Base>
      <Article>
        {post.Date && <Date>{getDateStr(post.Date)}</Date>}
        <h1>{post.Page || ''}</h1>
        {(!post.content || post.content.length === 0) && (
          <p>コンテンツがありません</p>
        )}

        {(post.content || []).map((block, blockIdx) => {
          const { value } = block;
          const { type, properties, id, parent_id } = value;
          const isLast = blockIdx === post.content.length - 1;
          const isList = listTypes.has(type);
          const toRender = [];

          if (isList) {
            listTagName = components[type === 'bulleted_list' ? 'ul' : 'ol'];
            listLastId = `list${id}`;

            listMap[id] = {
              key: id,
              nested: [],
              children: textBlock(properties.title, true, id),
            };

            if (listMap[parent_id]) {
              listMap[id].isNested = true;
              listMap[parent_id].nested.push(id);
            }
          }

          if (listTagName && (isLast || !isList)) {
            toRender.push(
              React.createElement(
                listTagName,
                { key: listLastId },
                Object.keys(listMap).map(itemId => {
                  if (listMap[itemId].isNested) return null;

                  const createEl = item =>
                    React.createElement(
                      components.li || 'ul',
                      { key: item.key },
                      item.children,
                      item.nested.length > 0
                        ? React.createElement(
                            components.ul || 'ul',
                            { key: `${item}sub-list` },
                            item.nested.map(nestedId =>
                              createEl(listMap[nestedId])
                            )
                          )
                        : null
                    );

                  return createEl(listMap[itemId]);
                })
              )
            );
            listMap = {};
            listLastId = null;
            listTagName = null;
          }

          const renderHeading = (Type: string | React.ComponentType) => {
            toRender.push(
              <Heading key={id}>
                <Type key={id}>{textBlock(properties.title, true, id)}</Type>
              </Heading>
            );
          };

          switch (type) {
            case 'page':
            case 'divider':
              break;
            case 'text':
              if (properties) {
                toRender.push(textBlock(properties.title, false, id));
              }
              break;
            case 'image':
            case 'video': {
              const { format = {} } = value;
              const { block_width } = format;
              const baseBlockWidth = 768;
              const roundFactor = Math.pow(10, 2);
              // calculate percentages
              const width = block_width
                ? `${Math.round(
                    (block_width / baseBlockWidth) * 100 * roundFactor
                  ) / roundFactor}%`
                : '100%';

              const isImage = type === 'image';
              const Comp = isImage ? 'img' : 'video';

              toRender.push(
                <Comp
                  key={id}
                  src={`/api/asset?assetUrl=${encodeURIComponent(
                    format.display_source
                  )}&blockId=${id}`}
                  controls={!isImage}
                  alt={isImage ? 'An image from Notion' : undefined}
                  loop={!isImage}
                  muted={!isImage}
                  autoPlay={!isImage}
                  style={{ width }}
                />
              );
              break;
            }
            case 'header':
              renderHeading('h1');
              break;
            case 'sub_header':
              renderHeading('h2');
              break;
            case 'sub_sub_header':
              renderHeading('h3');
              break;
            case 'code': {
              if (properties.title) {
                const content = properties.title[0][0];
                const language = properties.language[0][0];

                if (language === 'LiveScript') {
                  // this requires the DOM for now
                  toRender.push(
                    <ReactJSXParser
                      key={id}
                      jsx={content}
                      components={components}
                      componentsOnly={false}
                      renderInpost={false}
                      allowUnknownElements
                      blacklistedTags={['script', 'style']}
                    />
                  );
                } else {
                  toRender.push(
                    <components.Code key={id}>{content}</components.Code>
                  );
                }
              }
              break;
            }
            case 'quote':
              if (properties.title) {
                toRender.push(
                  React.createElement(
                    components.blockquote,
                    { key: id },
                    properties.title
                  )
                );
              }
              break;
            default:
              if (
                process.env.NODE_ENV !== 'production' &&
                !listTypes.has(type)
              ) {
                console.log('unknown type', type);
              }
              break;
          }

          return toRender;
        })}
      </Article>
    </Base>
  );
};

export default RenderPost;
