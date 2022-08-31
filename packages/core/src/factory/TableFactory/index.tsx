import React, { isValidElement } from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import { FactoryProps, TableProps } from '../../types';
import BoxFactory from '../BoxFactory';
import TextFactory from '../TextFactory';

function TableFactory({ className, map, ...props }: FactoryProps & TableProps, ref: any) {
  const theme = useTheme();

  // Extends from default props
  props = { ...theme.components.Table.defaultProps, ...props };

  let { border, columns, rows, ...rest } = props;

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

      {
        width,
        flexGrow: 0,
        flexShrink: 0,
      },
    ];
  };

  const styleRoot = createStyle({
    name: 'rbk-table',
    style: { borderRadius: theme.shape.borderRadius },
  });

  const styleState = createStyle({
    style: { border },
  });

  const styles = [styleRoot, styleState, className];

  return (
    <BoxFactory ref={ref} map={map} {...rest} className={styles}>
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
