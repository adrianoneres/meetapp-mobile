import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  margin-bottom: 15px;
  border-radius: 3px;
  background: #fff;
`;

export const Image = styled.Image`
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Info = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 14px;
`;

export const Text = styled.Text`
  padding-left: 14px;
  margin-bottom: 6px;
  font-size: 14px;
  color: #999;
`;

export const SubmitButton = styled(Button)`
  margin: 0 20px 20px;
`;
