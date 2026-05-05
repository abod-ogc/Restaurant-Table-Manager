import tablesDB from "../dal/tables.dal.js";

async function add() {
  let tables = await tablesDB.getAllTables();
  let count = tables.length + 1;

  let newTableName = `Table ${count.toString().padStart(2, "0")}`;
  return await tablesDB.addTable(newTableName);
}

async function update(id, status) {
  id = Number(id);
  if (!Number.isInteger(id) || typeof status !== "string") return false;

  return await tablesDB.updateTable(id, status.toLowerCase());
}

async function getAll() {
  return await tablesDB.getAllTables();
}

async function clear() {
  return await tablesDB.clearTables();
}


async function getTablesStatus(){
  return await tablesDB.getTablesStatus();
}

const tablesDll = {
  add,
  update,
  getAll,
  clear,
  getTablesStatus
}

export default tablesDll;
