function parseUser(user, next) {
  try {
    return JSON.parse(user);
  } catch (e) {
    next(new Error('Not valid user access'));
  }
}

module.exports = parseUser;