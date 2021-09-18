import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${getStatusBarHeight() + RFValue(3)}px;
`;

export const Steps = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.archivo_600};
  font-size:  ${RFValue(40)}px;

  color: ${({ theme }) => theme.colors.title};

  margin-top: ${RFPercentage(3)}%;
  margin-bottom: ${RFValue(16)}px;
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.inter_400};
  font-size: ${RFValue(15)}px;

  line-height: ${RFValue(25)}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const Form = styled.View`
  width: 100%;

  margin-top: ${RFValue(60)}px;
  margin-bottom: 16px;
`;

export const FormTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.archivo_600};
  font-size:  ${RFValue(20)}px;

  color: ${({ theme }) => theme.colors.title};

  margin-bottom: ${RFValue(24)}px;
`;