import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  margin-top: 20px;
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  align-self: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin: 0 20px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#fff',
})`
  margin: 30px 0;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
