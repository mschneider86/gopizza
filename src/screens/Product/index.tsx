import React, { useState } from 'react';
import { Platform, TouchableOpacity, ScrollView } from 'react-native';
import { BackButton } from '@components/BackButton';
import { Photo } from '@components/Photo';
import { PriceInput } from '@components/PriceInput';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import * as ImagePicker from 'expo-image-picker';
import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters,
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
      <ScrollView showsVerticalScrollIndicator={false}>
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

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>

            <Input multiline maxLength={60} style={{ height: 80 }} />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <PriceInput size='P' />
            <PriceInput size='M' />
            <PriceInput size='G' />
          </InputGroup>

          <Button title='Cadastrar pizza' />
        </Form>
      </ScrollView>
    </Container>
  );
}
