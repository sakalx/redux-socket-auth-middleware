import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import srcBackground from '../../static/img/background.jpg';

export const Container = styled('div')`
  background-image: url(${srcBackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
`;

export const TitleContainer = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 2;
  justify-content: center;
  margin: 0 25px;
`;

export const Title = styled(Typography)`
  color: #fff !important;
`;

export const LoginContainer = styled(Paper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  margin: 10%;
  padding: 15px;
`;

export const LoginTitleContainer = styled('div')`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
  width: 100%;
`;

export const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  flex: 4;
  justify-content: space-evenly;
  width: 100%;
`;
