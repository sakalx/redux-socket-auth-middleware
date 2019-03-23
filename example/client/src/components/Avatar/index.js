import React from 'react';

import {connect} from 'react-redux';

import Avatar from '@material-ui/core/Avatar';

const UserAvatar = ({userId, users}) => {
  const user = users.data[userId];

  if (!user) return null;

  return (
      <Avatar style={{backgroundColor: user.avatarColor}}>
        {user.name.charAt(0).toUpperCase()}
      </Avatar>
  );
};

const mapStateToProps = ({users}) => ({
  users,
});

export default connect(mapStateToProps, null)(UserAvatar);