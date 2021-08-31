import React, { useCallback, useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';

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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSecondStep = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH obrigatória'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        name: Yup.string().required('Nome obrigatório'),
      });

      const data = { name, email, driverLicense };

      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      }
    }
  }, [navigation, name, email, driverLicense]);

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
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>01. Dados</FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />

            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              value={email}
              autoCapitalize="none"
              onChangeText={setEmail}
            />

            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={driverLicense}
              onChangeText={setDriverLicense}
            />
          </Form>

          <Button title="Próximo" onPress={handleSecondStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export { SignUpFirstStep };
