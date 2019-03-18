import React, {useLayoutEffect} from 'react';

import {connect} from 'react-redux';

function HomePage({socket}) {

  useLayoutEffect(() => {
    socket.io.on('user', f => console.log(f));
  }, []);

  const logout = () => socket.io.emit('sigOut');

  return (
      <div>
        <h1>Home page</h1>
        <button onClick={logout}>logout</button>
      </div>
  );
}

const mapStateToProps = ({socket}) => ({
  socket,
});

export default connect(mapStateToProps, null)(HomePage);