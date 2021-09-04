import React, { useCallback, useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import { api } from '../../../services/api';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';

interface IUser {
  name: string;
  email: string;
  driverLicense: string;
}

interface IRouteProps {
  user: IUser;
}

const SignUpSecondStep: React.FC = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { user } = route.params as IRouteProps;

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const theme = useTheme();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleRegister = useCallback(async () => {
    if (!password || !passwordConfirmation) {
      return Alert.alert('Informe a senha e a confirmação');
    }

    if (password !== passwordConfirmation) {
      return Alert.alert('As senhas não são iguais');
    }

    api
      .post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          title: 'Conta criada',
          message: `Agora é só fazer login${'\n'} e aproveitar`,
          nextScreenRoute: 'SignIn',
        });
      })
      .catch(() => {
        Alert.alert('Opa', 'Não foi possível cadastrar');
      });

    return null;
  }, [
    password,
    passwordConfirmation,
    navigation,
    user.driverLicense,
    user.email,
    user.name,
  ]);

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />

          <Header>
            <BackButton onPress={handleGoBack} />

            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>02. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
            />
          </Form>

          <Button
            color={theme.colors.success}
            title="Cadastrar"
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export { SignUpSecondStep };
