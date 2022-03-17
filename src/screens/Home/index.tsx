import React, { useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert, TouchableOpacity } from 'react-native';
import happyEmoji from '@assets/happy.png';
import { useTheme } from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';

import { Search } from '@components/Search';
import { ProductCard, ProductProps } from '@components/ProductCard';

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItemsNumber,
  Title,
} from './styles';

export function Home() {
  const { COLORS } = useTheme();

  function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection('pizzas')
      .orderBy('name_insensitive')
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];
      })
      .catch(() =>
        Alert.alert('Consulta', 'Não foi possível realizar a consulta')
      );
  }

  useEffect(() => {
    fetchPizzas('');
  }, []);

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

      <Search onSearch={() => {}} onClear={() => {}} />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>

      <ProductCard
        data={{
          id: '1',
          name: 'Pizza teste',
          description: 'Ingredientes da pizza teste',
          photo_url: 'https://github.com/mschneider86.png',
        }}
      />
    </Container>
  );
}
