import React, { useState, useCallback, useEffect } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { Container, Header, Title, Subtitle, Form, Footer } from './styles';

import { database } from '../../database';

const SignIn: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNewAccount = useCallback(() => {
    navigation.navigate('SignUpFirstStep');
  }, [navigation]);

  const handleSignIn = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite uma e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate({ email, password });

      await signIn({ email, password });

      Alert.alert('Tudo certo');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais',
        );
      }
    }
  }, [email, password, signIn]);

  useEffect(() => {
    async function loadData() {
      const userCollection = database.get('users');
      const user = await userCollection.query().fetch();
      console.log(user);
    }

    loadData();
  }, []);

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
            <Title>
              Estamos{'\n'}
              quase lá.
            </Title>

            <Subtitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível
            </Subtitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              autoCorrect={false}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              enabled
              loading={false}
              onPress={handleSignIn}
            />

            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_primary}
              light
              onPress={handleNewAccount}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export { SignIn };
