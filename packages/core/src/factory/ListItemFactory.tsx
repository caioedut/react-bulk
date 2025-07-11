import React, { forwardRef } from 'react';

import useTheme from '../hooks/useTheme';
import ChevronRight from '../icons/ChevronRight';
import factory2 from '../props/factory2';
import get from '../props/get';
import remove from '../props/remove';
import { ListItemProps } from '../types';
import global from '../utils/global';
import BoxFactory from './BoxFactory';
import CardFactory from './CardFactory';
import GridFactory from './GridFactory';
import TextFactory from './TextFactory';

const ListItemFactory = React.memo<ListItemProps>(
  forwardRef(({ ref, children, ...props }, legacyRef) => {
    ref = ref || legacyRef;

    const theme = useTheme();
    const options = theme.components.ListItem;
    const { svg, View } = global.mapping;

    // Extends from default props
    let {
      chevron,
      endAddon,
      gap,
      icon,
      startAddon,
      // Styles
      variants,
      chevronStyle,
      ...rest
    } = factory2<ListItemProps>(props, options);

    gap = gap === true ? 1 : (gap ?? 0);

    const chevronSize = get('size', chevronStyle);
    const chevronColor = get('color', chevronStyle) ?? 'primary';
    remove(['size', 'color'], chevronStyle);

    chevron =
      chevron === true ? (
        <ChevronRight svg={svg} color={theme.color(chevronColor)} size={theme.rem(chevronSize || 1)} />
      ) : chevron ? (
        <TextFactory color={chevronColor} size={chevronSize}>
          {chevron}
        </TextFactory>
      ) : null;

    return (
      <CardFactory ref={ref} p={theme.spacing(gap)} variants={{ root: variants.root }} {...rest}>
        <GridFactory row noWrap alignItems="center" gap={gap}>
          {Boolean(startAddon) && <BoxFactory>{startAddon}</BoxFactory>}

          <View xs>
            <GridFactory row noWrap alignItems="center" gap={gap}>
              {children}
            </GridFactory>
          </View>

          {Boolean(endAddon) && <BoxFactory>{endAddon}</BoxFactory>}

          {Boolean(chevron) && <BoxFactory style={chevronStyle}>{chevron}</BoxFactory>}
        </GridFactory>
      </CardFactory>
    );
  }),
);

ListItemFactory.displayName = 'ListItemFactory';

export default ListItemFactory;
