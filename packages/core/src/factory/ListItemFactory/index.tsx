import React from 'react';

import { useTheme } from '../../ReactBulk';
import extract from '../../props/extract';
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

  const startIconProps = extract(['color', 'size', 'weight'], startIconStyle);
  const endIconProps = extract(['color', 'size', 'weight'], endIconStyle);

  return (
    <CardFactory map={map} ref={ref} stylist={[variants?.root, stylist]} {...rest}>
      <GridFactory map={map} row noWrap alignItems="center" gap={gap}>
        {Boolean(startIcon) && (
          <View style={startIconStyle}>
            {typeof startIcon === 'string' ? <IconFactory map={map} name={startIcon} {...startIconProps} /> : startIcon}
          </View>
        )}

        <View style={{ flex: 1 }}>
          <GridFactory map={map} row noWrap alignItems="center" gap={gap}>
            {children}
          </GridFactory>
        </View>

        {Boolean(endIcon) && (
          <View style={endIconStyle}>
            {typeof endIcon === 'string' ? <IconFactory map={map} name={endIcon} {...endIconProps} /> : endIcon}
          </View>
        )}

        {Boolean(chevron) && (
          <View style={chevronStyle}>
            <IconFactory map={map} name={chevron} />
          </View>
        )}
      </GridFactory>
    </CardFactory>
  );
}

export default React.forwardRef(ListItemFactory);
