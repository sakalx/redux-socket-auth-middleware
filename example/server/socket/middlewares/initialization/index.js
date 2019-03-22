module.exports = function() {
  const sql = require('../../../mysql/query');
  const table = require('../../../config')['mySQL']['table'];
  const store = require('../../../store');

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

      store.users  = {
        [uid]: {
          id: uid,
          name: data.NAME,
          status: 'offline',
        },
      };
    }
  }
};