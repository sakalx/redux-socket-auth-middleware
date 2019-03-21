const db = require('./');

// [SELECT] all data from table:
function getSqlSelectAllFromTable(table) {
  return `SELECT * FROM ${table}`;
}

function getDataFromTable({table, callBackResult, callBackEnd}) {
  const sql = getSqlSelectAllFromTable(table);

  db.query(sql)
  .on('result', callBackResult)
  .on('end', callBackEnd);
}

// [SELECT] all data from row table by key:
function getSqlSelectRowFromTable(table, key = '') {
  return `SELECT * FROM ${table} WHERE ${key} = ?`;
}

function getDataFromRow({table, option, callBackResult, callBackEnd}) {
  const sql = getSqlSelectRowFromTable(table, option.key);

  db.query(sql, [option.value])
  .on('result', callBackResult)
  .on('end', callBackEnd);
}

module.exports = {
  getDataFromTable,
  getDataFromRow,
};