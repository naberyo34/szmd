import Link from 'next/link'

import { getBlogLink, getDateStr, postIsReady } from '../../lib/blog-helpers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'

import styled, { css } from 'styled-components'
import Base from '../../components/base'

export async function unstable_getStaticProps() {
  const postsTable = await getBlogIndex()

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

  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}

export default ({ posts = [] }) => {
  return (
    <Base heading="BLOG">
      {posts.length === 0 && <p>There are no posts yet</p>}
      {posts.map(post => {
        return (
          <div key={post.Slug}>
            <h3>
              <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                <a>{post.Page}</a>
              </Link>
            </h3>
            {post.Date && (
              <div className="posted">Posted: {getDateStr(post.Date)}</div>
            )}
          </div>
        )
      })}
    </Base>
  )
}
