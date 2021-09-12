import React from 'react';
import { StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButtom } from '../../components/BackButtom';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleSchedulingDetails() {
    navigation.navigate('SchedulingDetails')
  }

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <BackButtom onPress={() => {}} color={theme.colors.shape}/>
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel 
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={false}>
              12/09/2021
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={false}>
              12/09/2021
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title='Confirmar' onPress={handleSchedulingDetails}/>
      </Footer>
    </Container>
  );
}