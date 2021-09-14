import React from 'react';
import LottieView from 'lottie-react-native';

import loading from '../../assets/load_animated.json';

import { Container } from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={loading}
        style={{
          height: 200
        }}
        resizeMode='contain'
        autoPlay
        loop
      />
    </Container>
  );
}