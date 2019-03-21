import React from 'react';

import {connect} from 'react-redux';

import Avatar from '@material-ui/core/Avatar';

const UserAvatar = ({userId, users}) => (
    <Avatar style={{backgroundColor: users.data[userId].avatarColor}}>
      {users.data[userId].name.charAt(0).toUpperCase()}
    </Avatar>
);

const mapStateToProps = ({users}) => ({
  users,
});

export default connect(mapStateToProps, null)(UserAvatar);