import React, { useState } from 'react';
import { 
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import * as Yup from 'yup';
import { useNavigation, CommonActions } from '@react-navigation/native';

import { useTheme } from 'styled-components/native';
import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer
} from './styles';

export function SignIn() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigation();
  const theme = useTheme();
  const { signIn } = useAuth();

  function handleActionSignUp() {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'SignUpFirstStep'
      })
    )
  }

  async function HandleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digire um e-mail válido'),
        password: Yup.string()
          .required('A senha é obrigatória')
      });

      await schema.validate({ email, password });
      Alert.alert('Tudo certo!')

      await signIn({ email, password });
    } catch (error) {
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais',
        )
      }
    }
  }

  return (
    <KeyboardAvoidingView
      behavior='position'
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar 
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
          />

          <Header>
            <Title>
              Estamos {'\n'}
              quase lá.
            </Title>

            <SubTitle>
              Faça seu login para começar {'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input 
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput 
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
          </Form>
        
          <Footer>
            <Button
              title='Login'
              onPress={HandleSignIn}
              enabled={true}
              loading={false}
            />

            <Button
              title='Criar conta gratuita'
              color={theme.colors.backgorund_secondary}
              onPress={handleActionSignUp}
              enabled={true}
              loading={false}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}