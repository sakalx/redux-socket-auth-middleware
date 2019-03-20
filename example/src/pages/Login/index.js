import React, {useState, useEffect} from 'react';

import {connect} from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm';

import {
  Container,
  TitleContainer,
  Title,
  LoginContainer,
  LoginTitleContainer,
} from './style';

function LoginPage({socket}) {
  const {fetching} = socket;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!fetching && loading) setLoading(false);
  }, [fetching]);

  if (loading) return <LinearProgress/>;

  return (
      <Container>

        {fetching &&
        <LinearProgress
            color='secondary'
            variant='query'
            style={{position: 'absolute', width: '100%'}}
        />}

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
  );
}

const mapStateToProps = ({socket}) => ({
  socket,
});

export default connect(mapStateToProps, null)(LoginPage);