import React, {useState} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {connectingToServer} from '../../redux-core/actions/socket';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';

import {
  FormContainer,
} from './style';


function LoginForm({socket, connectingToServer}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);


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
          error={error}
          fullWidth
          label='Name'
          name='name'
          onChange={handleChangeName}
          value={name}
        />
        <TextField
          autoComplete='current-password'
          error={error}
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
  )
}

const mapStateToProps = ({socket}) => ({
  socket,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  connectingToServer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);