import React, {useState, useEffect} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addMessage} from '../../redux-core/actions/chat';

import event from '../../api/socket/events';

import TextField from '@material-ui/core/TextField';

import {Container} from './style';

function NewMessage({
                      refMessages,
                      socket,
                      users,
                      addMessage,
                    }) {
  const [message, setMessage] = useState('');

  const handleAddMessage = message => {
    addMessage(message);
    setTimeout(() =>
        refMessages.current.scrollTo(0, refMessages.current.scrollHeight), 0);
  };

  useEffect(() => {
    socket.io.on(event.newMessage, handleAddMessage);
    return () => socket.io.removeListener(event.newMessage, handleAddMessage);
  }, []);

  const handleChangeMsg = ({target}) => setMessage(target.value);

  const handleSendMsg = ({which}) => {
    if (which === 13 && message.length > 0) {
      const newMessage = {
        userId: users.current.id,
        message,
      };

      handleAddMessage(newMessage);
      socket.io.emit(event.newMessage, newMessage);
      setMessage('');
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