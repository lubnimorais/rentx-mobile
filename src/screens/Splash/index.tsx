import React, { useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container } from './styles';

const Splash: React.FC = () => {
  const navigation = useNavigation();

  const splashAnimation = useSharedValue(0);

  // const brandStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: interpolate(
  //       splashAnimation.value,
  //       [0, 25, 50], // coloca as etapas da animação. Tipo de 0 até 25 e de 25 até 50
  //       [1, 0.3, 0], // qual valor vai ser retornado quando estiver nessa step de animação
  //       Extrapolate.CLAMP, // para nunca passar do limite
  //     ),
  //   };
  // });

  // const logoStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: interpolate(
  //       splashAnimation.value,
  //       [0, 25, 50], // coloca as etapas da animação. Tipo de 0 até 25 e de 25 até 50
  //       [0, 0.3, 1], // qual valor vai ser retornado quando estiver nessa step de animação
  //       Extrapolate.CLAMP, // para nunca passar do limite
  //     ),
  //   };
  // });

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 50], // coloca as etapas da animação. Tipo de 0 até 25 e de 25 até 50
        [1, 0], // qual valor vai ser retornado quando estiver nessa step de animação
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 25, 50], // coloca as etapas da animação. Tipo de 0 até 25 e de 25 até 50
        [0, 0.3, 1], // qual valor vai ser retornado quando estiver nessa step de animação
        Extrapolate.CLAMP, // para nunca passar do limite
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const startApp = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      {
        duration: 2000,
      },
      () => {
        'worklet';

        runOnJS(startApp)();
      },
    );
  }, [splashAnimation, startApp]);

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={80} height={45} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
};

export { Splash };
