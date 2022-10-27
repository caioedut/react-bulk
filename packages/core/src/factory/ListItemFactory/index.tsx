import React from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { FactoryProps, ListItemProps } from '../../types';
import BoxFactory from '../BoxFactory';
import CardFactory from '../CardFactory';
import GridFactory from '../GridFactory';
import TextFactory from '../TextFactory';

function ListItemFactory({ stylist, children, map, innerRef, ...props }: FactoryProps & ListItemProps) {
  const theme = useTheme();
  const options = theme.components.ListItem;

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
  } = factory2(props, options);

  chevron = chevron === true ? 'caret-right' : chevron;
  startIcon = startIcon ?? icon;
  startIconStyle = startIconStyle ?? iconStyle;

  return (
    <CardFactory map={map} innerRef={innerRef} p={gap} stylist={[variants?.root, stylist]} {...rest}>
      <GridFactory map={map} row noWrap flex alignItems="center" gap={gap}>
        {Boolean(startIcon) && (
          <BoxFactory map={map} style={startIconStyle}>
            {startIcon}
          </BoxFactory>
        )}

        <BoxFactory map={map} xs>
          <GridFactory map={map} row noWrap alignItems="center" gap={gap}>
            {children}
          </GridFactory>
        </BoxFactory>

        {Boolean(endIcon) && (
          <BoxFactory map={map} style={endIconStyle}>
            {endIcon}
          </BoxFactory>
        )}

        {Boolean(chevron) && (
          <BoxFactory map={map} style={chevronStyle}>
            <TextFactory map={map} color="primary" style={{ fontSize: theme.rem(2), marginTop: -theme.rem(0.5) }}>
              ›
            </TextFactory>
          </BoxFactory>
        )}
      </GridFactory>
    </CardFactory>
  );
}

export default React.memo(ListItemFactory);
