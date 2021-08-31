import React, { useCallback } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

import { Container, Content, Title, Message, Footer } from './styles';

interface IRouteParams {
  title: string;
  message: string;
  nextScreenRoute: string;
}

const Confirmation: React.FC = () => {
  const { width } = useWindowDimensions();

  const route = useRoute();
  const { title, message, nextScreenRoute } = route.params as IRouteParams;

  const navigation = useNavigation();

  const handleNavigationHome = useCallback(() => {
    navigation.navigate(nextScreenRoute);
  }, [navigation, nextScreenRoute]);

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
        <Title>{title}</Title>

        <Message>{message}</Message>

        <Footer>
          <ConfirmButton title="OK" onPress={handleNavigationHome} />
        </Footer>
      </Content>
    </Container>
  );
};

export { Confirmation };
