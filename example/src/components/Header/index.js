import React, {useLayoutEffect} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUser} from '../../redux-core/actions/users';

import event from '../../api/socket/events';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Avatar from '../Avatar';

import {Container, User} from './style';

function Header({socket, users, setUser}) {

  const handleLogout = () => socket.io.emit(event.sigOut);

  useLayoutEffect(() => {
    const handleUser = user => setUser(user);

    socket.io.on(event.user, handleUser);
    return () => socket.io.removeListener(event.user, handleUser);
  }, []);

  return (
      <AppBar position='sticky'>
        <Container>
          <User>
            <Avatar userId={users.current.id}/>
            <Typography color='inherit' variant='h5'>
              {users.current.name.toUpperCase()}
            </Typography>
          </User>

          <Typography color='inherit' variant='h6'>
            Socket.io chat
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