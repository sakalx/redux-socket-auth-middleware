function parseUser(user, next) {
  let parsedUser = null;

  try {
    parsedUser = JSON.parse(parsedUser);
  } catch (e) {
    next(new Error('Not valid user access'));
  }

  return parsedUser
}

module.exports = parseUser;