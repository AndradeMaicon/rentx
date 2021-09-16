import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;

  margin-right: 2px;

  background-color: ${({theme}) => theme.colors.backgorund_secondary};
`;

export const InputText = styled(TextInput)`
  flex: 1;

  font-family: ${({theme}) => theme.fonts.inter_400};
  font-size: ${RFValue(15)}px;

  color: ${({theme}) => theme.colors.backgorund_secondary};

  background-color: ${({theme}) => theme.colors.backgorund_secondary};
  
  padding: 0 23px;
`;