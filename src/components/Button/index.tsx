import React from 'react';

import { Container, Title } from './styles';

interface IProps {
  title: string;
  color?: string;
}

const Button: React.FC<IProps> = ({ title, color, ...rest }) => {
  return (
    <Container {...rest} color={color}>
      <Title>{title}</Title>
    </Container>
  );
};

export { Button };
