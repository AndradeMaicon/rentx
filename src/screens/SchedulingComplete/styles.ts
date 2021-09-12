import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;

  background-color: ${({theme}) => theme.colors.header};

  padding-top: ${RFValue(50)}px;;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding-bottom: 80px;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.archivo_600};
  font-size: ${RFValue(30)}px;

  color: ${({theme}) => theme.colors.shape};

  margin-top: 40px;
`;

export const Message = styled.Text`
  font-family: ${({theme}) => theme.fonts.inter_400};
  font-size: ${RFValue(15)}px;

  text-align: center;
  line-height: ${RFValue(25)}px;

  color: ${({theme}) => theme.colors.text_detail};

  margin-top: 16px;
`;

export const Footer = styled.View`
  width: 100%;

  align-items: center;
  
  margin: 80px 0;
`;