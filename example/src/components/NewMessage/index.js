import React, {useState} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addMessage} from '../../redux-core/actions/chat';

import event from '../../api/socket/events';

import TextField from '@material-ui/core/TextField';

import {Container} from './style';

function NewMessage({socket, users, addMessage}) {
  const [message, setMessage] = useState('');

  const handleChangeMsg = ({target}) => setMessage(target.value);

  const handleSendMsg = ({which}) => {
    if (which === 13 && message.length > 0) {
      const newMessage = {
        id: users.current.id,
        message,
      };

      setMessage('');
      addMessage(newMessage);

      socket.io.emit(event.newMessage, newMessage);
      setTimeout(() =>
          window.scrollTo(0, document.body.scrollHeight), 0);
    }
  };

  return (
      <Container>
        <TextField
            fullWidth
            id='new-message'
            label='New message'
            margin='normal'
            onChange={handleChangeMsg}
            onKeyPress={handleSendMsg}
            style={{backgroundColor: '#fff'}}
            value={message}
            variant='outlined'
        />
      </Container>
  );
}

const mapStateToProps = ({users, socket}) => ({
  socket,
  users,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addMessage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);