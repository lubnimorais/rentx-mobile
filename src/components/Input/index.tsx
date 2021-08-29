import React, { useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';

import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons';

import { Container, IconContainer, InputText } from './styles';

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

const Input: React.FC<IInputProps> = ({ iconName, value, ...rest }) => {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleIsFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleIsFilled = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!value);
  }, [value]);

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
        onFocus={handleIsFocused}
        onBlur={handleIsFilled}
        isFocused={isFocused}
        {...rest}
      />
    </Container>
  );
};

export { Input };
