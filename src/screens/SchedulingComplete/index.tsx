import React, { useCallback } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

import { Container, Content, Title, Message, Footer } from './styles';

const SchedulingComplete: React.FC = () => {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  const handleNavigationHome = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel
        </Message>

        <Footer>
          <ConfirmButton title="OK" onPress={handleNavigationHome} />
        </Footer>
      </Content>
    </Container>
  );
};

export { SchedulingComplete };
