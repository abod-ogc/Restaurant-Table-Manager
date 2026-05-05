import Dexie from "https://unpkg.com/dexie/dist/modern/dexie.mjs";

const db = new Dexie("restaurantDb");

db.version(1).stores({
  restaurantTables: "++id, name, status",
  menu: "++id, name, ingredients, price",
  orders: "++id,  menuItemID, tableID",
});

export default db;
