import React from 'react';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Avatar from '../Avatar';

const User = ({user}) => (
    <React.Fragment>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar userId={user.id}/>
        </ListItemAvatar>

        <ListItemText
            primary={user.name}
            secondary={
              <Typography
                  color={user.status === 'online' ? 'primary' : 'textSecondary'}
                  component='span'
              >
                {user.status}
              </Typography>
            }
        />
      </ListItem>

      <Divider variant='inset'/>
    </React.Fragment>
);

export default User;