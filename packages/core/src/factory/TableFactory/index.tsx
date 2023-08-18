import React, { forwardRef, isValidElement } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { TableProps } from '../../types';
import BoxFactory from '../BoxFactory';
import TextFactory from '../TextFactory';

const TableFactory = React.memo<TableProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Table;

    // Extends from default props
    let {
      border,
      columns,
      rows,
      // Styles,
      variants,
      style,
      ...rest
    } = factory2<TableProps>(props, options);

    const width = `${100 / columns?.length}%`;

    const renderContent = (child: any, data: any = undefined, bold = false) => {
      if (child) {
        if (isValidElement(child)) {
          return child;
        }

        if (typeof child === 'function') {
          child = child(data);
        }

        if (['string', 'number'].includes(typeof child)) {
          child = <TextFactory bold={bold} children={child} />;
        }
      }

      return child ?? null;
    };

    const buildStyle = (column, borderTop = false, borderLeft = false) => {
      return [
        {
          border,
          p: theme.shape.gap / 2,
          borderBottomWidth: 0,
          borderRightWidth: 0,
          width,
          flexGrow: 0,
          flexShrink: 0,
        },

        !borderTop && { borderTopWidth: 0 },
        !borderLeft && { borderLeftWidth: 0 },

        column.style,
      ];
    };

    style = [{ border }, style];

    return (
      <BoxFactory ref={ref} style={style} stylist={[variants.root, stylist]} {...rest}>
        <BoxFactory row noWrap>
          {columns?.map((column, index) => (
            <BoxFactory key={index} style={buildStyle(column, false, index > 0)}>
              {renderContent(column.header, column, true)}
            </BoxFactory>
          ))}
        </BoxFactory>

        {rows?.map((row, rowIndex) => (
          <BoxFactory key={rowIndex} row noWrap>
            {columns.map((column, index) => (
              <BoxFactory key={index} style={buildStyle(column, true, index > 0)}>
                {renderContent(column.content, row)}
              </BoxFactory>
            ))}
          </BoxFactory>
        ))}
      </BoxFactory>
    );
  }),
);

TableFactory.displayName = 'TableFactory';

export default TableFactory;
