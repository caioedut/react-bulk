import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { TabsProps } from '../../types';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
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
    } = factory2(props, options);

    return (
      <ScrollableFactory ref={ref} stylist={[variants.root, stylist]} {...rest} direction="horizontal">
        <BoxFactory style={contentStyle} stylist={[variants.content]}>
          {tabs?.map((tab, index) => {
            const { value: tabValue = index, style: tabStyle, ...rest } = tab;

            const isActive = value === tabValue;

            const currentStyle = [buttonStyle, tabStyle, isActive && activeStyle];

            return (
              <ButtonFactory
                key={tabValue}
                variant={isActive ? 'solid' : variant === 'group' ? 'outline' : 'text'}
                color={color}
                size={size}
                labelStyle={{ px: 1.5 }}
                {...rest}
                style={currentStyle}
                stylist={[variants.button, isActive && variants.active]}
                onPress={(e) => onChange?.(e, tabValue)}
              />
            );
          })}
        </BoxFactory>
      </ScrollableFactory>
    );
  }),
);

TabsFactory.displayName = 'TabsFactory';

export default TabsFactory;
