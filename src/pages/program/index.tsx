import Link from 'next/link'
import Header from '../../components/header'

import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'

import { getBlogLink, getDateStr, postIsReady } from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getProgramIndex from '../../lib/notion/getProgramIndex'

export async function unstable_getStaticProps() {
  const postsTable = await getProgramIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!postIsReady(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  posts.map(post => {
    post.Authors = post.Authors.map(id => users[id].full_name)
  })

  posts.reverse() // 新しい記事を上に表示するため、postsを逆順にする

  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}

export default ({ posts = [] }) => {
  return (
    <>
      <Header titlePre="Program" />
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        <h1>Program</h1>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}

        {posts.map(post => {
          return (
            // コンテンツの中身が空だとapiがnullになって画像が表示されないらしい
            <div className="illustList" key={post.id}>
              <div className="description">
                <h2>{post.Page}</h2>
                <p>{post.Description}</p>
              </div>
              <img
                className="programThumb"
                src={`/api/asset?assetUrl=${post.Image}&blockId=${post.id}`}
                alt="An image from Notion"
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
