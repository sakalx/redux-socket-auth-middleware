module.exports = function() {
  const sql = require('../../../mysql/query');
  const table = require('../../../config')['mySQL']['table'];
  const userStore = require('../../../store')['userStore'];

  let isInit = false;

  if (!isInit) initUsers();

  function initUsers() {
    sql.getDataFromTable({
      table: table.users,
      callBackResult: sqlOnResult,
      callBackEnd: () => isInit = true,
    });

    function sqlOnResult(data) {
      const uid = data.ID;

      const users = {
        [uid]: {
          id: uid,
          name: data.NAME,
          status: 'offline',
        },
      };

      Object.assign(userStore, users);
    }
  }
};