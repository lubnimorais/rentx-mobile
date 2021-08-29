import React, { useCallback } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';

const SignUpFirstStep: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <KeyboardAvoidingView behavior="position">
      <Container>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />

        <Header>
          <BackButton onPress={handleGoBack} />

          <Steps>
            <Bullet active />
            <Bullet />
          </Steps>
        </Header>

        <Title>Crie sua{'\n'}conta</Title>
        <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>

        <Form>
          <FormTitle>1. Dados</FormTitle>

          <Input iconName="user" />

          <Button title="Próximo" />
        </Form>
      </Container>
    </KeyboardAvoidingView>
  );
};

export { SignUpFirstStep };
