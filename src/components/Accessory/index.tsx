import React from 'react';
import { SvgProps } from 'react-native-svg';

import { useTheme } from 'styled-components';

import { Container, Name } from './styles';

interface IProps {
  name: string;
  icon: React.FC<SvgProps>;
}

const Accessory: React.FC<IProps> = ({ name, icon: Icon }) => {
  const theme = useTheme();

  return (
    <Container>
      <Icon width={32} height={32} fill={theme.colors.header} />
      <Name>{name}</Name>
    </Container>
  );
};

export { Accessory };
