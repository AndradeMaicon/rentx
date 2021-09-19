import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { CarDTO } from '../../dtos/CarDTOS';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { api } from '../../services/api';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  function handleCarDetail(car: CarDTO) {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'CarDetails',
        params: {car}
      })
    )
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const resp = await api.get('/cars')
        if(isMounted) {
          setCars(resp.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        if(isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    }
  }, [])

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          {
            !loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>

      { 
        loading ? <LoadAnimation /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <Car data={item} onPress={() => handleCarDetail(item)}/>
          }
        />
      }
      
    </Container>
  );
}
