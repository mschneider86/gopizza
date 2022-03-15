import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import happyEmoji from '@assets/happy.png';
import { useTheme } from 'styled-components/native';

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
} from './styles';

export function Home() {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons name='logout' size={24} color={COLORS.TITLE} />
        </TouchableOpacity>
      </Header>
    </Container>
  );
}
