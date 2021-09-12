import React from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from 'styled-components';

import { BackButtom } from '../../components/BackButtom';
import { Button } from '../../components/Button';

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

      <Content></Content>

      <Footer>
        <Button title='Confirmar'/>
      </Footer>
    </Container>
  );
}