import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { BackButtom } from '../../components/BackButtom';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTOS';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer
} from './styles';

interface Params {
  car: CarDTO
}


export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;


  function handleScheduling() {
    // navigation.navigate('Scheduling')
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Scheduling',
        params: { car }
      })
    )
  }

  function handeBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar 
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <BackButtom onPress={handeBack}/>
      </Header>

      <CarImages>
        <ImageSlider 
          imagensUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$ ${car.rent.price}`}</Price>
          </Rent>
        </Details>
        
        <Accessories>
          { 
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.type} 
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>

        <About>
          {car.about}
        </About>
      </Content>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleScheduling}/>
      </Footer>
    </Container>
  );
}