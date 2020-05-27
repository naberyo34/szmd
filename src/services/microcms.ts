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

const endPoint = 'https://szmd.microcms.io/api/v1/';

// TODO: これでも動くけど取得失敗時にnullを返す仕様はあまりよくない気がする

/**
 * 記事の本文を除く一覧データをサーバーサイド非同期通信で取得
 * @returns /blog 画面で表示するための記事一覧データ
 */
export async function getArticleList(): Promise<[] | null> {
  const res = await fetch(`${endPoint}blog?fields=id,title,posted,category`, {
    headers: {
      'X-API-KEY': process.env.X_API_KEY || '',
    },
  });
  // 取得に失敗した場合はnullを返却してそのままレンダリングに進む(カードなしで表示)
  if (!res.ok) return null;
  const blog = await res.json();
  return blog;
}

/**
 * 記事のパス一覧をサーバーサイド非同期通信で取得
 * @returns getStaticPaths用のオブジェクト
 */
export async function getArticlePaths(): Promise<[] | null> {
  const res = await fetch(`${endPoint}blog?fields=id`, {
    headers: {
      'X-API-KEY': process.env.X_API_KEY || '',
    },
  });
  // 取得に失敗した場合はnullを返す
  if (!res.ok) return null;
  const rawData = await res.json();

  // getStaticPathsで使える形に整形してから返す
  const paths = rawData.contents.map((content: { id: string }) => {
    const obj = {
      params: {
        slug: content.id,
      },
    };
    return obj;
  });
  return paths;
}

/**
 * IDに対応する記事をサーバーサイド非同期通信で取得
 * @param slug 記事のID
 * @returns 当該記事のオブジェクト
 */
export async function getArticle(slug: string): Promise<Article | null> {
  const res = await fetch(`${endPoint}blog/${slug}`, {
    headers: {
      'X-API-KEY': process.env.X_API_KEY || '',
    },
  });
  // 取得に失敗した場合はnullを返す
  if (!res.ok) return null;
  const article: Article = await res.json();
  return article;
}

/**
 * IDに対応する記事の前後に記事がある場合は、そのリンクを取得
 * @param slug 記事のID
 * @returns 前後記事のタイトルとIDを格納したオブジェクト
 */
export async function getArticleLink(
  slug: string
): Promise<ArticleLink | null> {
  const res = await fetch(`${endPoint}blog?fields=id,title`, {
    headers: {
      'X-API-KEY': process.env.X_API_KEY || '',
    },
  });
  const rawData = await res.json();
  const blog = rawData.contents;
  // 対象記事のインデックスを取得
  const currentIndex = blog.findIndex(
    (article: Article) => article.id === slug
  );
  // 対象記事よりも古い記事がある場合はIDを取得
  const next = blog[currentIndex + 1]
    ? {
        id: blog[currentIndex + 1].id,
        title: blog[currentIndex + 1].title,
      }
    : undefined;
  // 対象記事よりも新しい記事がある場合はIDを取得
  const prev = blog[currentIndex - 1]
    ? {
        id: blog[currentIndex - 1].id,
        title: blog[currentIndex - 1].title,
      }
    : undefined;

  const articleLink: ArticleLink = {
    next,
    prev,
  };

  return articleLink;
}
