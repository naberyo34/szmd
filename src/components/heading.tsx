// 記事中のh1タグなどはここで整形される

const collectText = (el, acc = []) => {
  if (el) {
    if (typeof el === 'string') acc.push(el);
    if (Array.isArray(el)) el.map(item => collectText(item, acc));
    if (typeof el === 'object') collectText(el.props && el.props.children, acc);
  }

  return acc.join('').trim();
};

export default ({ children: component, id }: { children: any; id?: any }) => {
  const children = component.props.children || '';
  const text = children;

  if (id == null) {
    id = collectText(text)
      .toLowerCase()
      .replace(/\s/g, '-')
      .replace(/[?!:]/g, '');
  }

  return <>{component}</>;
};
