import React, { useState } from 'react';

import { CollapseProps } from '../../types';
import BoxFactory from '../BoxFactory';
import CardFactory from '../CardFactory';
import ModalFactory from '../ModalFactory';
import TextFactory from '../TextFactory';

function SelectFactory({ options, placeholder, label, map, ...rest }: CollapseProps | any, ref: any) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <BoxFactory ref={ref} {...rest} map={map} onPress={() => setVisible(true)}>
        <TextFactory map={map}>{placeholder}</TextFactory>
      </BoxFactory>
      <ModalFactory visible={visible} map={map}>
        <CardFactory map={map}>
          {options?.map((option) => (
            <BoxFactory map={map}>
              <TextFactory map={map}>{option.label}</TextFactory>
            </BoxFactory>
          ))}
        </CardFactory>
      </ModalFactory>
    </>
  );
}

export default React.forwardRef(SelectFactory);
