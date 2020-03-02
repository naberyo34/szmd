export const getBlogLink = (slug: string) => {
  return `/blog/${slug}`
}

// 日付の整形 ja-JPで日本式の日付表記が取れる
export const getDateStr = date => {
  return new Date(date).toLocaleDateString('ja-JP')
}

export const postIsReady = (post: any) => {
  return process.env.NODE_ENV !== 'production' || post.Published === 'Yes'
}

export const normalizeSlug = slug => {
  if (typeof slug !== 'string') return slug

  let startingSlash = slug.startsWith('/')
  let endingSlash = slug.endsWith('/')

  if (startingSlash) {
    slug = slug.substr(1)
  }
  if (endingSlash) {
    slug = slug.substr(0, slug.length - 1)
  }
  return startingSlash || endingSlash ? normalizeSlug(slug) : slug
}
