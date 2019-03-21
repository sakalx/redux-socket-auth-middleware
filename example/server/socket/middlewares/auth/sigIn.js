module.exports = function (user, session, next) {
  const sql = require('../../../mysql/query');
  const table = require('../../../config')['mySQL']['table'];

  let userFromDb = null;

  // Find user in db
  sql.getDataFromRow({
    table: table.users,
    option: {
      key: 'NAME',
      value: user.name,
    },
    callBackResult: user => userFromDb = user,
    callBackEnd: signInUser,
  });

  function signInUser() {
    if (!userFromDb) return next(new Error('User not found'));
    if (userFromDb.PASSWORD !== user.password) return next(new Error('Incorrect password'));

    // Save to session user
    session.user = {
      id: userFromDb.ID,
      name: userFromDb.NAME,
    };
    session.save();

    // Connect socket.io
    next();
  }
};