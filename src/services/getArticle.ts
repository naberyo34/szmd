import fetch from 'node-fetch';

export interface Article {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  posted: string;
  category: string;
  text: string;
}

export interface ArticleLink {
  next?: {
    id: string;
    title: string;
  };
  prev?: {
    id: string;
    title: string;
  };
}

/**
 * IDに対応する記事をサーバーサイド非同期通信で取得
 * @param slug 記事のID
 */
export default async function getArticle(
  slug: string
): Promise<Article | null> {
  const response = await fetch(`https://szmd.microcms.io/api/v1/blog/${slug}`, {
    headers: {
      'X-API-KEY': process.env.X_API_KEY,
    },
  });
  // 記事取得に失敗した場合はnullを返す('記事が見つかりません'を表示)
  if (!response.ok) return null;
  const article = await response.json();
  return article;
}

/**
 * IDに対応する記事の前後に新しい記事、古い記事がある場合はそのリンクを返す
 * @param slug 記事のID
 */
export async function getArticleLink(
  slug: string
): Promise<ArticleLink | null> {
  const response = await fetch(
    'https://szmd.microcms.io/api/v1/blog?fields=id,title',
    {
      headers: {
        'X-API-KEY': process.env.X_API_KEY,
      },
    }
  );
  const blog = await response.json();
  // 当該記事のインデックスを取得
  const currentIndex = blog.contents.findIndex(
    (content) => content.id === slug
  );
  // 当該記事よりも古い記事がある場合はIDを取得
  const next = blog.contents[currentIndex + 1]
    ? {
        id: blog.contents[currentIndex + 1].id,
        title: blog.contents[currentIndex + 1].title,
      }
    : null;
  // 当該記事よりも新しい記事がある場合はIDを取得
  const prev = blog.contents[currentIndex - 1]
    ? {
        id: blog.contents[currentIndex - 1].id,
        title: blog.contents[currentIndex - 1].title,
      }
    : null;

  const articleLink = {
    next,
    prev,
  };

  return articleLink;
}
