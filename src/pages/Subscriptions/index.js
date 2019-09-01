import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import api from '~/services/api';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import { Container, List } from './styles';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function loadSubscriptions() {
      const response = await api.get('subscriptions');

      setSubscriptions(response.data);
    }

    loadSubscriptions();
  }, [subscriptions]);

  async function handleCancelation(subscription) {
    try {
      await api.delete(`subscriptions/${subscription.id}`);
      Alert.alert(
        'Sucesso',
        `Sua inscrição em "${
          subscription.Meetup.title
        }" foi cancelada com sucesso.`
      );
    } catch (err) {
      Alert.alert(
        'Erro',
        `Erro ao cancelar inscrição em "${subscription.Meetup.title}".`
      );
    }
  }

  return (
    <Background>
      <Container>
        <List
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              onPress={() => handleCancelation(item)}
              data={item.Meetup}
              buttonText="Cancelar inscrição"
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
};
