import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.header};

  padding-top: ${heightPercentageToDP(5)}px;
`;
export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding-bottom: 20px;
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(30)}px;

  margin-top: 40px;
`;
export const Message = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text_detail};
  font-size: ${RFValue(15)}px;
  text-align: center;
  line-height: ${RFValue(25)}px;

  margin-top: 16px;
`;
export const Footer = styled.View`
  width: 100%;
  align-items: center;

  margin: 80px 0;
`;