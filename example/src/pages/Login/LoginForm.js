import React, {useState, useEffect} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {connectingToServer} from '../../redux-core/actions/socket';
import {showSnackbar} from '../../redux-core/actions/snackbar';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';

import {FormContainer} from './style';

function LoginForm({socket, connectingToServer, showSnackbar}) {
  const [name, setName] = useState('soda');
  const [password, setPassword] = useState('soda_password');

  useEffect(() => {
    if (socket.error) {
      showSnackbar(socket.error.message || socket.error);
    }
  }, [socket.error]);

  const handleChangeName = ({target}) => setName(target.value);

  const handleChangePassword = ({target}) => setPassword(target.value);

  const handleLogin = () => {
    const user = JSON.stringify({name, password});
    connectingToServer(user);
  };

  return (
      <React.Fragment>
        <FormContainer>
          <TextField
              autoComplete='username'
              autoFocus
              fullWidth
              label='Name'
              name='name'
              onChange={handleChangeName}
              value={name}
          />
          <TextField
              autoComplete='current-password'
              fullWidth
              label='Password'
              onChange={handleChangePassword}
              type='password'
              value={password}
          />
        </FormContainer>

        <Collapse in={Boolean(name && password)} style={{width: '100%'}}>
          <Button
              color='primary'
              fullWidth
              onClick={handleLogin}
              variant='outlined'
          >
            Login
          </Button>
        </Collapse>
      </React.Fragment>
  );
}

const mapStateToProps = ({socket}) => ({
  socket,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  connectingToServer,
  showSnackbar,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);