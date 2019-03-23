import React, {useEffect} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {connectingToServer} from '../../redux-core/actions/socket';
import {showSnackbar} from '../../redux-core/actions/snackbar';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {FormContainer, LoginContainer} from './style';

const LoginForm = ({
                     user,
                     setUser,
                     socket,
                     connectingToServer,
                     showSnackbar,
                   }) => {
  const {error} = socket;
  useEffect(() => {
    if (error) showSnackbar(error.message || error);
  }, [error]);

  const handleChangeUser = ({target}) => {
    setUser(state => ({
      ...state,
      [target.name]: target.value,
    }));
  };

  const handleLogin = () => {
    const stringifiedUser = JSON.stringify(user);
    connectingToServer(stringifiedUser);
  };

  return (
      <Slide direction='left' in={true} mountOnEnter>
        <LoginContainer elevation={24}>
          <Typography color='textSecondary' variant='h3'>
            Login
          </Typography>

          <FormContainer>
            <TextField
                autoComplete='username'
                autoFocus
                fullWidth
                label='Name'
                name='name'
                onChange={handleChangeUser}
                value={user.name}
            />
            <TextField
                autoComplete='current-password'
                fullWidth
                label='Password'
                name='password'
                onChange={handleChangeUser}
                type='password'
                value={user.password}
            />
          </FormContainer>

          <Collapse in={Boolean(user.name && user.password)}
                    style={{width: '100%'}}>
            <Button
                color='primary'
                fullWidth
                onClick={handleLogin}
                variant='outlined'
            >
              Login
            </Button>
          </Collapse>

        </LoginContainer>
      </Slide>
  );
};

const mapStateToProps = ({socket}) => ({
  socket,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  connectingToServer,
  showSnackbar,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);