import React from 'react';

import {connect} from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

import UserAvatar from '../Avatar';

import {Container} from './style';

const Message = ({message, userId, users}) => {
  const user = users.data[userId];
  const isAuthor = users.current.id === userId;
  const colorUserName = user.avatarColor;

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

            <div>
              <Typography
                  component='h3'
                  style={{color: colorUserName}}
                  variant='button'
              >
                {user.name}
              </Typography>
              <ListItemText primary={message}/>
            </div>

          </ListItem>
        </Container>
      </Slide>
  );
};

const mapStateToProps = ({users}) => ({
  users,
});

export default connect(mapStateToProps, null)(Message);