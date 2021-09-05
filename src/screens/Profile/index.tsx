import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';

import PeopleSvg from '../../assets/people.svg';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
} from './styles';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  const navigation = useNavigation();
  const theme = useTheme();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSignOut = useCallback(() => {}, []);

  const handleOptionChange = useCallback(
    (optionSelected: 'dataEdit' | 'passwordEdit') => {
      setOption(optionSelected);
    },
    [],
  );

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleBack} />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut}>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          {user.avatar !== '' ? (
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/66881343?v=4',
              }}
            />
          ) : (
            <PeopleSvg
              width={160}
              height={160}
              fill={theme.colors.text}
              style={{ borderRadius: 90 }}
            />
          )}

          <PhotoButton>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>

      <Content>
        <Options>
          <Option
            active={option === 'dataEdit'}
            onPress={() => handleOptionChange('dataEdit')}
          >
            <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
          </Option>

          <Option
            active={option === 'passwordEdit'}
            onPress={() => handleOptionChange('passwordEdit')}
          >
            <OptionTitle active={option === 'passwordEdit'}>
              Trocar senha
            </OptionTitle>
          </Option>
        </Options>
      </Content>
    </Container>
  );
};

export { Profile };
