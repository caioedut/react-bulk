import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory2 from '../../props/factory2';
import { FactoryProps, ListItemProps } from '../../types';
import CardFactory from '../CardFactory';
import GridFactory from '../GridFactory';
import IconFactory from '../IconFactory';

function ListItemFactory({ stylist, children, map, ...props }: FactoryProps & ListItemProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.ListItem;
  const { View } = map;

  // Extends from default props
  let {
    chevron,
    gap,
    // Styles
    variants,
    ...rest
  } = factory2(props, options, theme);

  chevron = chevron === true ? 'caret-right' : chevron;

  return (
    <CardFactory map={map} ref={ref} stylist={[variants?.root, stylist]} {...rest}>
      <GridFactory map={map} row noWrap alignItems="center" gap={gap}>
        <View style={{ flex: 1 }}>
          <GridFactory map={map} row noWrap alignItems="center" gap={gap}>
            {children}
          </GridFactory>
        </View>
        {Boolean(chevron) && (
          <View pl={3}>
            <IconFactory map={map} name={chevron} />
          </View>
        )}
      </GridFactory>
    </CardFactory>
  );
}

export default React.forwardRef(ListItemFactory);
