import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

import {Container, Icon, Name} from './style';

const users = [
  {name: 'akira', password: 'akira_password'},
  {name: 'kuro', password: 'kuro_password'},
  {name: 'nao', password: 'nao_password'},
  {name: 'soda', password: 'soda_password'},
  {name: 'yoko', password: 'yoko_password'},
];

const AuthorizationList = ({setUser}) => {
  const handleSelectUser = user => () => setUser(user);

  return (
      <Container>
        <Typography color='inherit' variant='h5'>
          users for testing authentication:
        </Typography>

        <List component='nav'>
          {users.map((user) => (
              <ListItem
                  button
                  key={user.name}
                  onClick={handleSelectUser(user)}
              >
                <ListItemIcon>
                  <Icon/>
                </ListItemIcon>
                <Name color='inherit' variant='h5'>
                  {user.name}
                </Name>
                <Typography color='inherit' variant='subtitle1'>
                  {user.password}
                </Typography>
              </ListItem>
          ))}
        </List>
      </Container>
  );
};

export default AuthorizationList;