import { Children, Fragment, ReactElement } from 'react';

export default function childrenize(children) {
  const items: ReactElement[] = [];

  Children.forEach(children, (child) => {
    if (child?.type === Fragment) {
      if (Array.isArray(child.props.children)) {
        items.push(...child.props.children);
      } else {
        items.push(child.props.children);
      }
    } else {
      items.push(child);
    }
  });

  return items;
}
