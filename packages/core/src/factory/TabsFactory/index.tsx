import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { TabsProps } from '../../types';
import deepmerge from '../../utils/deepmerge';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import ButtonGroupFactory from '../ButtonGroupFactory';
import ScrollableFactory from '../ScrollableFactory';

const TabsFactory = React.memo<TabsProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Tabs;

    // Extends from default props
    let {
      color,
      size,
      tabs,
      value = 0,
      variant = 'group',
      // Events
      onChange,
      // Styles
      variants,
      contentStyle,
      buttonStyle,
      activeStyle,
      ...rest
    } = factory2<TabsProps>(props, options);

    const Tabs = tabs?.map((tab, index) => {
      const { value: tabValue = index, style: tabStyle, ...rest } = tab;

      const isActive = value === tabValue;
      rest.accessibility = deepmerge({ role: 'tab', state: { selected: isActive } }, rest.accessibility);

      return (
        <ButtonFactory
          key={tabValue}
          variant={isActive ? 'solid' : variant === 'card' ? 'text' : 'outline'}
          color={color}
          size={size}
          labelStyle={{ px: 1.5 }}
          {...rest}
          style={[buttonStyle, tabStyle, isActive && activeStyle]}
          stylist={[variants.button, isActive && variants.active]}
          onPress={(e) => onChange?.(e, tabValue)}
        />
      );
    });

    if (variant === 'nav') {
      return (
        <BoxFactory component={ButtonGroupFactory} style={contentStyle} stylist={[variants.root, stylist]}>
          {Tabs}
        </BoxFactory>
      );
    }

    return (
      <ScrollableFactory ref={ref} {...rest} direction="horizontal" stylist={[variants.root, stylist]}>
        <BoxFactory style={contentStyle} stylist={[variants.content]}>
          {Tabs}
        </BoxFactory>
      </ScrollableFactory>
    );
  }),
);

TabsFactory.displayName = 'TabsFactory';

export default TabsFactory;
