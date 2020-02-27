import { postIsReady } from '../lib/blog-helpers'
import getNotionUsers from '../lib/notion/getNotionUsers'
import getWorksIndex from '../lib/notion/getWorksIndex'

import styled, { css } from 'styled-components'
import Base from '../components/base'

export async function unstable_getStaticProps() {
  const postsTable = await getWorksIndex()

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
    <Base heading="WORKS">
      {posts.length === 0 && <p>There are no posts yet</p>}
      {posts.map(post => {
        return (
          // コンテンツの中身が空だとapiがnullになって画像が表示されないらしい
          <img
            key={post.id}
            src={`/api/asset?assetUrl=${post.Thumbnail}&blockId=${post.id}`}
            alt={post.Page}
            width="100"
          />
        )
      })}
    </Base>
  )
}
