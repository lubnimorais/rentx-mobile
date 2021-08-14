import React from 'react';
import { SvgProps } from 'react-native-svg';

import { Container, Name } from './styles';

interface IProps {
  name: string;
  icon: React.FC<SvgProps>;
}

const Accessory: React.FC<IProps> = ({ name, icon: Icon }) => {
  return (
    <Container>
      <Icon width={32} height={32} />
      <Name>{name}</Name>
    </Container>
  );
};

export { Accessory };
