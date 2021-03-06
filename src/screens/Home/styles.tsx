import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car as ModelCar } from '../../database/model/Car';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: flex-end;

  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;

  justify-content: space-between;
`;

export const TotalCars = styled.Text`
  font-family: ${({theme}) => theme.fonts.inter_400};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList as new () => FlatList<ModelCar>).attrs({
  contentContainerStyle: {
    padding: 24
  },
  showsVerticalScrollIndicator: false
})``;