module.exports = function (user, session, next) {
  const db = require('../../../mysql');

  let userFromDb = null;

  // Find user in db
  const sql = 'SELECT * FROM users WHERE NAME = ?';
  db.query(sql, [user.name])
    .on('result', user => userFromDb = user)
    .on('end', signInUser);

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