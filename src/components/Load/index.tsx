import React from 'react';
import { ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';

const Load: React.FC = () => {
  const theme = useTheme();

  return (
    <ActivityIndicator
      style={{ flex: 1 }}
      color={theme.colors.main}
      size="large"
    />
  );
};

export { Load };
