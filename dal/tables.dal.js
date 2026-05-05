import db from "./database.connection.js";

async function addTable(name) {
  try {
    return await db.restaurantTables.add({ name, status: "occupied" });
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateTable(id, newStatus) {
  try {
    const updated = await db.restaurantTables.update(id, { status: newStatus });

    return updated === 1; 
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getAllTables() {
  try {
    return await db.restaurantTables.toArray();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function clearTables() {
  try {
    await db.restaurantTables.clear();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getTablesStatus() {
  try {
    let available = await db.restaurantTables.where("status").equals("available").count();
    let occupied = await db.restaurantTables.where("status").equals("occupied").count();
        

    return { available, occupied };
  } catch (err) {
    console.log(err);
    return false;
  }
}

const tablesDB = {
  addTable,
  updateTable,
  getAllTables,
  clearTables,
  getTablesStatus
}

export default tablesDB;