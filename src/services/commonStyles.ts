export const zIndex = {
  modal: 10,
};

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
  fast: 0.2,
  medium: 0.4,
};

// メディアクエリ
export const mq = (breakPoint = width.ipad): string =>
  `@media (max-width: ${breakPoint}px)`;

// リキッドレイアウトのための値を算出する
export const liquid = (size: number, breakPoint = width.ipad): string =>
  `${(100 / breakPoint) * size}vw`;

// Framer Motion用のvariant
export const emergeVariant = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
