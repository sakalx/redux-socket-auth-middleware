import React from 'react';

import {connect} from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import {Container} from './style';

const Message = ({message, userId}) => (
    <Container>
      <ListItem>
        <ListItemAvatar>
          <Avatar color='red'>
            user.name.charAt(0).toUpperCase()
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={message}/>
      </ListItem>
    </Container>
);

const mapStateToProps = ({users}) => ({
  users,
});

export default connect(mapStateToProps, null)(Message);