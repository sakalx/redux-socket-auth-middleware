import React, {useEffect} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addMessage} from '../../redux-core/actions/chat';

import event from '../../api/socket/events';

import Slide from '@material-ui/core/Slide';

import Header from '../../components/Header';
import Message from '../../components/Message';
import NewMessage from '../../components/NewMessage';

import {Messages} from './style';

function HomePage({chat, socket, addMessage}) {

  useEffect(() => {
    const handleAddMessage = message => addMessage(message);

    socket.io.on(event.newMessage, handleAddMessage);
    return () => socket.io.removeListener(event.newMessage, handleAddMessage);
  }, []);

  return (
      <main>
        <Header/>

        <Messages>
          {chat.messages.map(({id, message}, index) => (
              <Slide
                  direction='up'
                  in={true}
                  key={String(index)}
                  mountOnEnter
              >
                <Message message={message} userId={id}/>
              </Slide>
          ))}
        </Messages>

        <NewMessage/>
      </main>
  );
}

const mapStateToProps = ({chat, socket}) => ({
  chat,
  socket,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addMessage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);