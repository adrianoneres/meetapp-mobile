import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Alert, TouchableOpacity } from 'react-native';
import { format, addDays, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import { Container, Header, Title, List, Loading } from './styles';

export default function Dashboard() {
  const profile = useSelector(state => state.user.profile);

  const [meetups, setMeetups] = useState([]);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const dateFormatted = useMemo(() => {
    return format(date, "dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [date]);

  async function loadPage(pageNumber = page) {
    if (total && pageNumber > total) return;

    setLoading(true);

    const response = await api.get(
      `available?page=${pageNumber}&date=${format(date, 'yyyy-MM-dd')}`
    );

    const totalItems = response.headers['x-total-count'];

    setTotal(Math.ceil(totalItems / 10));
    setMeetups([...meetups, ...response.data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
  }, [date]); // eslint-disable-line

  function handlePreviousDay() {
    setTotal(0);
    setMeetups([]);
    setPage(1);
    setDate(addDays(date, -1));
  }

  function handleNextDay() {
    setTotal(0);
    setMeetups([]);
    setPage(1);
    setDate(addDays(date, 1));
  }

  async function handleSubscription(meetup) {
    try {
      if (meetup.User.id === profile.id) {
        Alert.alert(
          'Erro',
          'Você não pode se inscrever em um meetup que organiza.'
        );
        return;
      }
      if (isBefore(meetup.date, new Date())) {
        Alert.alert(
          'Erro',
          'Você não pode se inscrever em um meetup que já aconteceu.'
        );
        return;
      }
      await api.post(`meetups/${meetup.id}/subscriptions`);
      Alert.alert(
        'Sucesso',
        `Você se inscreveu com sucesso em "${meetup.title}".`
      );
    } catch (err) {
      Alert.alert('Erro', 'Erro ao se inscrever no meetup.');
    }
  }

  return (
    <Background>
      <Container>
        <Header>
          <TouchableOpacity onPress={handlePreviousDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>

          <Title>{dateFormatted}</Title>

          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </Header>

        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          onEndReached={() => loadPage()}
          onEndThreshold={0.1}
          ListFooterComponent={loading && <Loading />}
          renderItem={({ item }) => (
            <Meetup
              onPress={() => handleSubscription(item)}
              data={item}
              buttonText="Realizar inscrição"
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
};
