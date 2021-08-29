import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface IContainerProps {
  color?: string;
}

interface ITitleProps {
  light?: boolean;
}

export const Container = styled(RectButton)<IContainerProps>`
  width: 100%;

  padding: 19px;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme, color }) => color || theme.colors.main};
`;

export const Title = styled.Text<ITitleProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
`;
