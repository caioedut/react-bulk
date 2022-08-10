import React, { isValidElement } from 'react';

import { BoxFactory, FactoryProps, TableProps, TextFactory, clsx, useTheme } from '@react-bulk/core';

function TableFactory({ rows, columns, border, className, style, map, ...rest }: FactoryProps & TableProps, ref: any) {
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
  };

  const renderContent = (child: any, data: any = undefined, bold = false) => {
    if (child) {
      if (isValidElement(child)) {
        return child;
      }

      if (typeof child === 'function') {
        child = child(data);
      }

      if (['string', 'number'].includes(typeof child)) {
        child = <TextFactory map={map} bold={bold} children={child} />;
      }
    }

    return child ?? null;
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
    <BoxFactory ref={ref} map={map} {...rest} className={clsx(classes)} style={style}>
      <BoxFactory map={map} flexbox noWrap>
        {columns?.map((column, index) => (
          <BoxFactory key={index} map={map} style={buildStyle(column, false, index > 0)}>
            {renderContent(column.header, column, true)}
          </BoxFactory>
        ))}
      </BoxFactory>
      {rows?.map((row, rowIndex) => (
        <BoxFactory key={rowIndex} map={map} flexbox noWrap>
          {columns.map((column, index) => (
            <BoxFactory key={index} map={map} style={buildStyle(column, true, index > 0)}>
              {renderContent(column.content, row)}
            </BoxFactory>
          ))}
        </BoxFactory>
      ))}
    </BoxFactory>
  );
}

export default React.forwardRef(TableFactory);
