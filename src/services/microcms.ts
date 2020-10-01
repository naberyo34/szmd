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
  const url = `${endPoint}blog?fields=id,slug,title,posted,category`;
  const res = await fetch(url, {
    headers: {
      'X-API-KEY': process.env.X_API_KEY,
    },
  });
  // 取得に失敗した場合はnullを返してそのままレンダリングに進む(カードなしで表示)
  if (!res.ok) return null;

  // JSONに整形して返す
  const blog = await res.json();
  return blog;
}

/**
 * 記事のパス一覧をサーバーサイド非同期通信で取得
 * @returns getStaticPaths用のオブジェクト
 */
export async function getArticlePaths(): Promise<[] | null> {
  const url = `${endPoint}blog?fields=slug`;
  const res = await fetch(url, {
    headers: {
      'X-API-KEY': process.env.X_API_KEY,
    },
  });
  // 取得に失敗した場合はnullを返す
  if (!res.ok) return null;

  // getStaticPathsで使える形に整形してから返す
  const rawData = await res.json();
  const paths = rawData.contents.map((content) => {
    const obj = {
      params: {
        slug: content.slug,
      },
    };
    return obj;
  });

  return paths;
}

/**
 * slugに対応する記事をサーバーサイド非同期通信で取得
 * @param targetSlug 記事のID
 * @returns 当該記事のオブジェクト
 */
export async function getArticle(targetSlug: string): Promise<Article | null> {
  const url = `${endPoint}blog?filter=slug[equal]${targetSlug}`;

  const res = await fetch(url, {
    headers: {
      'X-API-KEY': process.env.X_API_KEY,
    },
  });

  // 取得に失敗した場合はnullを返す
  if (!res.ok) return null;

  // 整形して返す
  const rawData = await res.json();

  console.log(rawData);

  const article: Article = rawData.contents;

  return article;
}

/**
 * slugに対応する記事の前後に記事がある場合は、そのリンクを取得
 * @param targetSlug 対象記事のID
 * @returns 前後記事のタイトルとIDを格納したオブジェクト
 */
export async function getArticleLink(
  targetSlug: string
): Promise<ArticleLink | null> {
  const res = await fetch(`${endPoint}blog?fields=slug,title`, {
    headers: {
      'X-API-KEY': process.env.X_API_KEY,
    },
  });
  const rawData = await res.json();
  const list = rawData.contents;

  // 対象記事のインデックスを取得
  const currentIndex = list.findIndex((article) => article.slug === targetSlug);
  // 対象記事よりも古い記事がある場合はIDを取得
  const next = list[currentIndex + 1]
    ? {
        id: list[currentIndex + 1].slug,
        title: list[currentIndex + 1].title,
      }
    : null;
  // 対象記事よりも新しい記事がある場合はIDを取得
  const prev = list[currentIndex - 1]
    ? {
        id: list[currentIndex - 1].slug,
        title: list[currentIndex - 1].title,
      }
    : null;

  const articleLink: ArticleLink = {
    next,
    prev,
  };

  return articleLink;
}
