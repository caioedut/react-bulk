import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory2 from '../../props/factory2';
import { FactoryProps, ListItemProps } from '../../types';
import CardFactory from '../CardFactory';
import GridFactory from '../GridFactory';
import TextFactory from '../TextFactory';

function ListItemFactory({ stylist, children, map, ...props }: FactoryProps & ListItemProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.ListItem;
  const { View } = map;

  // Extends from default props
  let {
    chevron,
    endIcon,
    gap,
    icon,
    startIcon,
    // Styles
    variants,
    chevronStyle,
    iconStyle,
    startIconStyle,
    endIconStyle,
    ...rest
  } = factory2(props, options, theme);

  chevron = chevron === true ? 'caret-right' : chevron;
  startIcon = startIcon ?? icon;
  startIconStyle = startIconStyle ?? iconStyle;

  return (
    <CardFactory map={map} ref={ref} p={gap} stylist={[variants?.root, stylist]} {...rest}>
      <GridFactory map={map} row noWrap alignItems="center" gap={gap}>
        {Boolean(startIcon) && <View style={startIconStyle}>{startIcon}</View>}

        <View style={{ flex: 1 }}>
          <GridFactory map={map} row noWrap alignItems="center" gap={gap}>
            {children}
          </GridFactory>
        </View>

        {Boolean(endIcon) && <View style={endIconStyle}>{endIcon}</View>}

        {Boolean(chevron) && (
          <View style={chevronStyle}>
            <TextFactory map={map} color="primary" style={{ fontSize: theme.rem(2), marginTop: -theme.rem(0.5) }}>
              ›
            </TextFactory>
          </View>
        )}
      </GridFactory>
    </CardFactory>
  );
}

export default React.forwardRef(ListItemFactory);
