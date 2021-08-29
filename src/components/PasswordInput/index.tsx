import React, { useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons';

import { Container, IconContainer, InputText } from './styles';

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

const PasswordInput: React.FC<IInputProps> = ({ iconName, value, ...rest }) => {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleIsFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleIsFilled = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!value);
  }, [value]);

  const handlePasswordVisibilityChange = useCallback(() => {
    setIsPasswordVisible(oldState => !oldState);
  }, []);

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>

      <InputText
        secureTextEntry={isPasswordVisible}
        isFocused={isFocused}
        onFocus={handleIsFocused}
        onBlur={handleIsFilled}
        {...rest}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
};

export { PasswordInput };
