import React from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';

import { Container, Header, Title, Subtitle, Footer } from './styles';

const SignIn: React.FC = () => {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Header>
        <Title>
          Estamos{'\n'}
          quase lá.
        </Title>

        <Subtitle>
          Faça seu login para começar{'\n'}
          uma experiência incrível
        </Subtitle>
      </Header>

      <Footer>
        <Button title="Login" enabled={false} loading={false} />

        <Button
          title="Criar conta gratuita"
          color={theme.colors.background_primary}
          light
        />
      </Footer>
    </Container>
  );
};

export { SignIn };
