import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { BackButton } from '@components/BackButton';
import { Photo } from '@components/Photo';
import { PriceInput } from '@components/PriceInput';

import * as ImagePicker from 'expo-image-picker';
import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
} from './styles';

export function Product() {
  const [image, setImage] = useState('');

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <BackButton />

        <Title>Cadastrar</Title>

        <TouchableOpacity>
          <DeleteLabel>Deletar</DeleteLabel>
        </TouchableOpacity>
      </Header>

      <Upload>
        <Photo uri={image} />

        <PickImageButton
          title='Carregar'
          type='secondary'
          onPress={handlePickImage}
        />
      </Upload>

      <PriceInput size='P' />
      <PriceInput size='M' />
      <PriceInput size='G' />
    </Container>
  );
}
