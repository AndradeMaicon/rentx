import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';

import EnergySvg from '../../assets/energy.svg'

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  },
  thumbnail: string
}

interface Props extends RectButtonProps {
  data: CarData;
}

export function Car({data, ...rest}: Props) {
  const theme = useTheme();

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <EnergySvg fill={theme.colors.text_detail}/>
          </Type>
        </About>
      </Details>

      <CarImage 
        source={{ uri: data.thumbnail }}
        resizeMode='contain'
      />
    </Container>
  );
}