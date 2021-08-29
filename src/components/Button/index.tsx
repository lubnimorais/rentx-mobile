import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface IProps extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
  light?: boolean;
}

const Button: React.FC<IProps> = ({
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Container
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
      {...rest}
      color={color}
      enabled={enabled}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
};

export { Button };
