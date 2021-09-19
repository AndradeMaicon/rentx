import React, { useEffect } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

import { Container } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'react-native';

export function Splash() {
  const splashAnimation = useSharedValue(0);

  const navigation = useNavigation();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value,
        [0, 25, 50, 75],
        [1, .3, 0, 0]
      )
    }
  })

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value,
        [0, 25, 50, 75],
        [0, 0, .3, 1]
      )
    }
  })

  function startApp() {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'SignIn'
      })
    )
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      75,
      { duration: 6000 },
      () => {
        'worklet'
        runOnJS(startApp)();
      }
    )
  }, [])

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Animated.View style={[{ position: 'absolute' }, brandStyle]}>
        <BrandSvg width={RFValue(78)} height={RFValue(48)} />
      </Animated.View>

      <Animated.View style={[{ position: 'absolute' },logoStyle]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>

    </Container>
  );
}