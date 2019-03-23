import React, {useState, useEffect} from 'react';

import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import AuthorizationList from '../../components/AuthorizationList';
import LoginForm from '../../components/LoginForm';

import {Container, Header, Main} from './style';

function LoginPage({socket}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({name: '', password: ''});

  const {fetching} = socket;
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

        <Header>
          <header>
            <Typography color='inherit' variant='h4' gutterBottom>
              Socket.io chat
            </Typography>

            <Button
                color='inherit'
                href='https://www.npmjs.com/package/redux-socket-auth-middleware'
                size='small'
                target='_blank'
                variant='outlined'
            >
              handled with redux-socket-auth-middleware
            </Button>
          </header>
          <IconButton aria-label='Github' color='inherit'>
            <DeleteIcon/>
          </IconButton>
        </Header>

        <Main>
          <AuthorizationList setUser={setUser}/>
          <LoginForm user={user} setUser={setUser}/>
        </Main>
      </Container>
  );
}

const mapStateToProps = ({socket}) => ({
  socket,
});

export default connect(mapStateToProps, null)(LoginPage);