import React from 'react';

import {connect} from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';

import UserAvatar from '../Avatar';

import {Container} from './style';

const Message = ({message, userId, users}) => {
  const isAuthor = users.current.id === userId;

  return (
      <Slide
          direction={isAuthor ? 'left' : 'right'}
          in={true}
          mountOnEnter
      >
        <Container isauthor={isAuthor ? 1 : 0}>
          <ListItem>
            <ListItemAvatar>
              <UserAvatar userId={userId}/>
            </ListItemAvatar>
            <ListItemText primary={message}/>
          </ListItem>
        </Container>
      </Slide>
  );
};

const mapStateToProps = ({users}) => ({
  users,
});

export default connect(mapStateToProps, null)(Message);