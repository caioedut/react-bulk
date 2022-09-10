import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, ModalProps } from '../../types';
import useStylist from '../../useStylist';
import pick from '../../utils/pick';
import BackdropFactory from '../BackdropFactory';

function ModalFactory({ stylist, map, ...props }: FactoryProps & ModalProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Modal;

  // Extends from default props
  let { halign, valign, onBackdropPress, ...rest } = factory(props, options.defaultProps);

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styleHAlign = useStylist({
    style: {
      alignItems: pick(halign as string, 'center', {
        center: 'center',
        left: 'flex-start',
        right: 'flex-end',
      }),
    },
  });

  const styleVAlign = useStylist({
    style: {
      justifyContent: pick(valign as string, 'center', {
        center: 'center',
        top: 'flex-start',
        bottom: 'flex-end',
      }),
    },
  });

  return (
    <BackdropFactory map={map} ref={ref} stylist={[styleRoot, styleHAlign, styleVAlign, stylist]} {...rest} onPress={onBackdropPress} />
  );
}

export default React.forwardRef(ModalFactory);
