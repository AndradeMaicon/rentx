import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  padding: 0 24px;

  background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + RFValue(70)}px;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.archivo_600};
  font-size: ${RFValue(40)}px;

  color: ${({theme}) => theme.colors.title};
`;

export const SubTitle =  styled.Text`
  font-family: ${({theme}) => theme.fonts.inter_400};
  font-size: ${RFValue(15)}px;

  line-height: ${RFValue(25)}px;

  color: ${({theme}) => theme.colors.text};

  margin-top: 16px;
`;

export const Form = styled.View`
  width: 100%;

  margin: ${RFValue(64)}px 0;
`;

export const Footer = styled.View`
`;
