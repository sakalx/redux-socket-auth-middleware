import React, {useEffect, useRef} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUsers, setUserStatus} from '../../redux-core/actions/users';

import event from '../../api/socket/events';

import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';

import Header from '../../components/Header';
import Message from '../../components/Message';
import NewMessage from '../../components/NewMessage';
import User from '../../components/User';

import {Container, Users, Messages} from './style';

function HomePage({
                    chat,
                    socket,
                    users,
                    setUsers,
                    setUserStatus,
                  }) {
  const messagesContainer = useRef(null);

  useEffect(() => {
    const handleSetUsers = users => setUsers(users);
    const handleSetUserStatus = userStatus => setUserStatus(userStatus);

    socket.io.on(event.users, handleSetUsers);
    socket.io.on(event.userStatus, handleSetUserStatus);

    return () => {
      socket.io.removeListener(event.users, handleSetUsers);
      socket.io.removeListener(event.userStatus, handleSetUserStatus);
    }
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

          <Messages ref={messagesContainer}>
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

        <NewMessage refMessages={messagesContainer}/>
      </main>
  );
}

const mapStateToProps = ({chat, socket, users}) => ({
  chat,
  socket,
  users,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setUsers,
  setUserStatus,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);