function loadSession(next) {
  return (err, sess) => {
    if (err) return next(new Error(`Failed load session:  ${err}`));

    sess && sess.user
      ? next()
      : next(new Error('Not authorized'));
  };
}

module.exports = loadSession;