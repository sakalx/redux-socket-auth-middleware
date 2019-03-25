import React, {useState, useEffect} from 'react';

import {connect} from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';

import AuthorizationList from '../../components/AuthorizationList';
import LoginForm from '../../components/LoginForm';
import {githubIcon} from '../../static/svg-icons';

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
          <Typography color='inherit' variant='h4' gutterBottom>
            Socket.io chat
          </Typography>
          <IconButton
              aria-label='Github'
              color='inherit'
              disableRipple
              href='https://github.com/sakalx/redux-socket-auth-middleware/tree/example-chat'
              target='_blank'
          >
            <SvgIcon viewBox='0 0 434 434'>
              <path d={githubIcon}/>
            </SvgIcon>
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