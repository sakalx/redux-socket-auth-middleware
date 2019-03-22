const Store = (function () {
  const _messages = [];
  const _users = {};

  class Store {
    set messages(message) {

      if (_users[message.userId] && message.message.length < 30) {
        _messages.push(message);
      }
      if (_messages.length > 21) _messages.shift();
    }

    get messages() {
      return _messages;
    }

    set users(users) {
      Object.assign(_users, users);
    }

    get users() {
      return _users;
    }

    set userStatus({userId, status}) {
      if (_users[userId] && _users[userId].status !== status) {
        _users[userId].status = status;
      }
    }
  }

  return Store;
})();

const store = new Store;

module.exports = store;