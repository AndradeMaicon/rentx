import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { CarDTO } from '../../dtos/CarDTOS';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { api } from '../../services/api';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton
} from './styles';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  function handleCarDetail(car: CarDTO) {
    // navigation.navigate('CarDetails', {car})
    navigation.dispatch(
      CommonActions.navigate({
        name: 'CarDetails',
        params: {car}
      })
    )
  }

  function handleMyCars() {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'MyCars'
      })
    )
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const resp = await api.get('/cars')
        setCars(resp.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
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
          <TotalCars>
            Total de {cars.length} carros
          </TotalCars>
        </HeaderContent>
      </Header>

      { 
        loading ? <Load /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <Car data={item} onPress={() => handleCarDetail(item)}/>
          }
        />
      }

      <MyCarsButton onPress={handleMyCars}>
        <Ionicons
          name='car-sport-sharp'
          size={32}
          color={theme.colors.shape}
        />
      </MyCarsButton>
      
    </Container>
  );
}