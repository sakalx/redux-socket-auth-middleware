import React, {useEffect, useRef} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setMessages} from '../../redux-core/actions/chat';
import {setUsers, setUser, setUserStatus} from '../../redux-core/actions/users';

import event from '../../api/socket/events';

import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';

import Header from '../../components/Header';
import Message from '../../components/Message';
import NewMessage from '../../components/NewMessage';
import User from '../../components/User';

import {Container, Users, Messages} from './style';


// [TODO] sort users by status
function HomePage({
                    chat,
                    socket,
                    users,
                    setMessages,
                    setUsers,
                    setUser,
                    setUserStatus,
                  }) {
  const messagesRef = useRef(null);

  useEffect(() => {
    const handleSetUsers = users => setUsers(users);
    const handleUser = user => setUser(user);
    const handleSetUserStatus = userStatus => setUserStatus(userStatus);
    const handleSetPreMessages = messages => {
      setMessages(messages);
      setTimeout(() =>
          messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight), 0);
    };

    // Collecting data
    socket.io.on(event.users, handleSetUsers);
    socket.io.on(event.user, handleUser);
    socket.io.on(event.messages, handleSetPreMessages);
    socket.io.on(event.userStatus, handleSetUserStatus);

    return () => {
      socket.io.removeListener(event.users, handleSetUsers);
      socket.io.removeListener(event.user, handleUser);
      socket.io.removeListener(event.userStatus, handleSetUserStatus);
      socket.io.removeListener(event.messages, handleSetPreMessages);
    };
  }, []);

  return (
      <main>
        <Slide direction='down' in={true} mountOnEnter>
          <Header/>
        </Slide>

        <Container>
          <Slide direction='right' in={true} mountOnEnter>
            <Users>
              <List>
                {Object.values(users.data).map(user => (
                    users.current.id === user.id
                        ? null
                        : <User key={user.id} user={user}/>
                ))}
              </List>
            </Users>
          </Slide>

          <Messages ref={messagesRef}>
            <List>
              {chat.messages.map(({userId, message}, index) => (
                  <Message
                      key={String(index)}
                      message={message}
                      userId={userId}
                  />
              ))}
            </List>
          </Messages>
        </Container>

        <NewMessage messagesRef={messagesRef}/>
      </main>
  );
}

const mapStateToProps = ({chat, socket, users}) => ({
  chat,
  socket,
  users,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setMessages,
  setUsers,
  setUser,
  setUserStatus,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);