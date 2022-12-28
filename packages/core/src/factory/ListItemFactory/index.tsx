import React from 'react';

import useTheme from '../../hooks/useTheme';
import ChevronRight from '../../icons/ChevronRight';
import factory2 from '../../props/factory2';
import get from '../../props/get';
import remove from '../../props/remove';
import { FactoryProps, ListItemProps } from '../../types';
import BoxFactory from '../BoxFactory';
import CardFactory from '../CardFactory';
import GridFactory from '../GridFactory';
import TextFactory from '../TextFactory';

function ListItemFactory({ stylist, children, map, innerRef, ...props }: FactoryProps & ListItemProps) {
  const theme = useTheme();
  const options = theme.components.ListItem;
  const { svg, View } = map;

  // Extends from default props
  let {
    chevron,
    endAddon,
    endIcon,
    gap,
    icon,
    startAddon,
    startIcon,
    // Styles
    variants,
    chevronStyle,
    ...rest
  } = factory2(props, options);

  startAddon = startAddon ?? startIcon;
  endAddon = endAddon ?? endIcon;

  const chevronSize = get('size', chevronStyle);
  const chevronColor = get('color', chevronStyle) ?? 'primary';
  remove(['size', 'color'], chevronStyle);

  chevron =
    chevron === true ? (
      <ChevronRight svg={svg} color={theme.color(chevronColor)} size={theme.rem(chevronSize || 1)} />
    ) : (
      <TextFactory map={map} color={chevronColor} size={chevronSize}>
        {chevron}
      </TextFactory>
    );

  return (
    <CardFactory map={map} innerRef={innerRef} p={gap} stylist={[variants?.root, stylist]} {...rest}>
      <GridFactory map={map} row noWrap alignItems="center" gap={gap}>
        {Boolean(startAddon) && <BoxFactory map={map}>{startAddon}</BoxFactory>}

        <View xs>
          <GridFactory map={map} row noWrap alignItems="center" gap={gap}>
            {children}
          </GridFactory>
        </View>

        {Boolean(endAddon) && <BoxFactory map={map}>{endAddon}</BoxFactory>}

        {Boolean(chevron) && (
          <BoxFactory map={map} style={chevronStyle}>
            {chevron}
          </BoxFactory>
        )}
      </GridFactory>
    </CardFactory>
  );
}

const Memoized = React.memo(ListItemFactory);
Memoized.displayName = 'ListItemFactory';

export default Memoized;
