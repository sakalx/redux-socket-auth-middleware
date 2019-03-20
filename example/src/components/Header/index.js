import React, {useLayoutEffect} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUser} from '../../redux-core/actions/users';

import event from '../../api/socket/events';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {Container} from './style';

function Header({socket, users, setUser}) {

  const handleLogout = () => socket.io.emit(event.sigOut);

  useLayoutEffect(() => {
    const handleUser = user => setUser(user);

    socket.io.on(event.user, handleUser);
    return () => socket.io.removeListener(event.user, handleUser);
  }, []);

  return (
      <AppBar position='fixed'>
        <Container>
          <Typography color='inherit' variant='h4'>
            {users.current.name}
          </Typography>
          <Typography color='inherit' variant='h6'>
            successfully connected
          </Typography>
          <Button
              color='inherit'
              onClick={handleLogout}
              variant='outlined'
          >
            logout
          </Button>
        </Container>
      </AppBar>
  );
}

const mapStateToProps = ({users, socket}) => ({
  socket,
  users,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);