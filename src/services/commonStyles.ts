export const zIndex = {
  modal: 10,
};

// iphone5サイズは分岐ではなく下限値として使っているので注意
export const width = {
  ipad: 768,
};

export const color = {
  primary: '#fcc200',
  text: '#1a1a1a',
  white: '#ffff',
  gray: '#f5f7f8',
  translucentBlack: 'rgba(0, 0, 0, 0.4)',
};

export const opacity = {
  high: 0.8,
};

export const transition = {
  fast: '0.2s',
};

// メディアクエリ
export const mq = (breakPoint = width.ipad): string =>
  `@media (max-width: ${breakPoint}px)`;

// リキッドレイアウトのための値を算出する
export const liquid = (size: number, breakPoint = width.ipad): string =>
  `${(100 / breakPoint) * size}vw`;
