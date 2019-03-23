import React from 'react';

import {connect} from 'react-redux';

import event from '../../api/socket/events';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Avatar from '../Avatar';

import {Container, User} from './style';

const Header = ({socket, users}) => {
  const handleLogout = () => socket.io.emit(event.sigOut);

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

export default connect(mapStateToProps, null)(Header);