import React from 'react';

import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm';

import {
  Container,
  TitleContainer,
  Title,
  LoginContainer,
  LoginTitleContainer,
} from './style';

function LoginPage() {
  return (
    <Container>

      <TitleContainer>
        <Title variant='h4' gutterBottom={true}>
          Users
        </Title>
        <Title variant='h6' gutterBottom={true}>
          name: password
        </Title>
      </TitleContainer>

      <LoginContainer elevation={24}>

        <LoginTitleContainer>
          <Typography color='textSecondary' variant='h3'>
            Login
          </Typography>
        </LoginTitleContainer>

        <LoginForm/>
      </LoginContainer>
    </Container>
  )
}

export default LoginPage;