import React from 'react';

import { TableProps, useTheme } from '@react-bulk/core';

import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';
import ScrollableFactory from '../ScrollableFactory';
import TextFactory from '../TextFactory';

function TableFactory({ rows, columns, border, className, style, map, ...rest }: TableProps | any, ref: any) {
  const theme = useTheme();
  const classes: any[] = ['rbk-table', className];

  const width = `${100 / columns?.length}%`;

  style = [
    {
      border,
      borderRadius: theme.shape.borderRadius,
    },
    style,
  ];

  const columnStyle = {
    width,
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'stretch',
  };

  const renderContent = (mixed: any, data: any = undefined) => {
    return typeof mixed === 'function' ? (
      mixed(data)
    ) : (
      <TextFactory map={map} bold>
        {mixed ?? ''}
      </TextFactory>
    );
  };

  const buildStyle = (column, borderTop = false, borderLeft = false) => {
    return [
      {
        border,
        p: 1,
        borderBottomWidth: 0,
        borderRightWidth: 0,
      },

      !borderTop && { borderTopWidth: 0 },
      !borderLeft && { borderLeftWidth: 0 },

      column.style,
      columnStyle,
    ];
  };

  return (
    <ScrollableFactory ref={ref} map={map} {...rest} horizontal className={clsx(classes)} style={style}>
      <BoxFactory map={map} flexbox noWrap>
        {columns?.map((column, index) => (
          <BoxFactory key={index} map={map} style={buildStyle(column, false, index > 0)}>
            {renderContent(column.header, column)}
          </BoxFactory>
        ))}
      </BoxFactory>
      {rows?.map((row, rowIndex) => (
        <BoxFactory key={rowIndex} map={map} flexbox noWrap>
          {columns.map(({ render, ...column }, index) => (
            <BoxFactory key={index} map={map} style={buildStyle(column, true, index > 0)}>
              {renderContent(render, row)}
            </BoxFactory>
          ))}
        </BoxFactory>
      ))}
    </ScrollableFactory>
  );
}

export default React.forwardRef(TableFactory);
