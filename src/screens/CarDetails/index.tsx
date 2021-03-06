import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNetInfo } from '@react-native-community/netinfo';

import { useTheme } from 'styled-components';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import { Accessory } from '../../components/Accessory';
import { BackButtom } from '../../components/BackButtom';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as ModelCar } from '../../database/model/Car';
import { CarDTO } from '../../dtos/CarDTOS';
import { api } from '../../services/api';


import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  OfflineInfo
} from './styles';

interface Params {
  car: ModelCar
}


export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)

  const netInfo = useNetInfo();
  const theme = useTheme()
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;


  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(
    event => {
      scrollY.value= event.contentOffset.y;
    }
  )

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0]
      )
    }
  })

  function handleScheduling() {
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

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if(netInfo.isConnected === true){
      fetchCarUpdated()
    }
  }, [netInfo.isConnected])

  return (
    <Container>
      <StatusBar 
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.backgorund_secondary }
        ]}
      >
        <Header>
          <BackButtom onPress={handeBack} />
        </Header>

        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImages>
            <ImageSlider 
              imagensUrl={
                !!carUpdated.photos ?
                carUpdated.photos: [{ id: car.thumbnail, photo: car.thumbnail}]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
          contentContainerStyle = {{
            paddingHorizontal: RFValue(15),
            paddingTop: getStatusBarHeight() + 160,
          }}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>
              {`R$ ${ netInfo.isConnected === true ? car.price: '...'}`}
            </Price>
          </Rent>
        </Details>

        {
          carUpdated.accessories &&
          <Accessories>
            { 
              carUpdated.accessories.map(accessory => (
                <Accessory
                  key={accessory.type} 
                  name={accessory.name}
                  icon={getAccessoryIcon(accessory.type)}
                />
              ))
            }
          </Accessories>
        }

        <About>
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button 
          title='Escolher per??odo do aluguel'
          onPress={handleScheduling}
          enabled={netInfo.isConnected === true}
        />
        {
          netInfo.isConnected === false &&
          <OfflineInfo>
            Fun????o n??o dispon??vel offline
          </OfflineInfo>
        }

      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
})