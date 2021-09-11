import React from 'react';
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

interface Props {
  data: CarData;
}

export function Car({data}: Props) {
  const theme = useTheme();

  return (
    <Container>
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