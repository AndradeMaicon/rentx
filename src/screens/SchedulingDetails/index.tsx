import React, {useState, useEffect} from 'react';
import { Alert, StatusBar } from 'react-native';
import { Accessory } from '../../components/Accessory';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';

import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButtom } from '../../components/BackButtom';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTOS';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';


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
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer
} from './styles';

interface Params {
  car: CarDTO
  dates: string[]
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const theme = useTheme()
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const total = Number(dates.length * car.rent.price)

  async function handleSchedulingComplete() {
    // navigation.navigate('SchedulingComplete')

    const scheduleByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...scheduleByCar.data.unavailable_dates,
      ...dates
    ]

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    }).then(() => 
      navigation.dispatch(
        CommonActions.navigate({
          name: 'SchedulingComplete'
        })
      )  
    ).catch(() => Alert.alert('Não foi possivel confirmar o agendamento'))
  }

  function handeBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy'),
    })

  }, [])

  return (
    <Container>
      <StatusBar 
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <BackButtom onPress={() => handeBack()}/>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diátias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {total}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title='Alugar agora'
          onPress={handleSchedulingComplete}
          color={theme.colors.success}
        />
      </Footer>
    </Container>
  );
}