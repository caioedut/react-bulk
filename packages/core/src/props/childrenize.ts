import { Children, Fragment, ReactElement } from 'react';

export default function childrenize(children) {
  const items: ReactElement[] = [];

  Children.forEach(children, (child) => {
    if (child?.type === Fragment) {
      items.push(...childrenize(child.props.children));
    } else {
      items.push(child);
    }
  });

  return items;
}
