import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Container, Image, Info, Title, Text, SubmitButton } from './styles';

export default function Meetup({ data, onPress, buttonText }) {
  return (
    <Container>
      <Image source={{ uri: `http://${data.File.url}` }} />

      <Info>
        <Title>{data.title}</Title>

        <Text>
          {format(parseISO(data.date), "dd 'de' MMMM', às' HH'h'", {
            locale: ptBR,
          })}
        </Text>
        <Text>{data.location}</Text>
        <Text>Organizador: {data.User.name}</Text>
      </Info>

      <SubmitButton onPress={onPress}>{buttonText}</SubmitButton>
    </Container>
  );
}
