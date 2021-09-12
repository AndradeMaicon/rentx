import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';

import EnergySvg from '../../assets/energy.svg'
import { CarDTO } from '../../dtos/CarDTOS';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

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

interface Props extends RectButtonProps {
  data: CarDTO;
}

export function Car({data, ...rest}: Props) {
  const theme = useTheme();
  const MotorIcon = getAccessoryIcon(data.fuel_type);

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
            <MotorIcon />
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