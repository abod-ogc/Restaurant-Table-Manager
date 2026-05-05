import menuArea from "./collections/menu.collection.js";
import ordersArea from "./collections/orders.collection.js";
import tablesArea from "./collections/tables.collection.js";
import menuDll from "../dll/menu.dll.js";
import ordersDll from "../dll/orders.dll.js";
import tablesDll from "../dll/tables.dll.js";

let selectedTable = null;
let isTableOpen = false;

const clearTablesBtn = document.querySelector(".clear-tables");
const addTableBtn = document.querySelector(".add-table");
const clearOrder = document.querySelector(".clear-order");
const completeCheckout = document.querySelector(".complete-checkout");
const ordersList = document.querySelector(".orders-list");
const menuGrid = document.querySelector(".menu-grid");

clearTablesBtn.addEventListener('click', async () => {
  if(!confirm("are you sure? everything will be deleted !")) return;
  await resetTables();
});

addTableBtn.addEventListener('click', async () => {
  await tablesDll.add();
  await initTables();
});

clearOrder.addEventListener('click', async () => {
  if(!selectedTable){
    alert("select table first !");
    return;
  }

  await ordersDll.remove(selectedTable.id);
  resetOrdersArea();
});

completeCheckout.addEventListener('click', async () => {
  if(!selectedTable){
    alert("select table first !");
    return;
  }

  if(!isTableOpen){
    alert("open table first !");
    return;
  }

  alert("checkout done !");
  await ordersDll.remove(selectedTable.id);
  resetOrdersArea();
})

async function resetTables(){
  resetOrdersArea();
  await ordersDll.clear();
  await tablesDll.clear();
  await initTables();
}

function resetOrdersArea(){
    ordersList.innerHTML = "";
    renderTotalPrice?.(0);
}

function renderTablesStatus(availableTables, occupiedTables) {
  document.querySelector(".available-tables").textContent =
    `${availableTables} Available`;
  document.querySelector(".occupied-tables").textContent =
    `${occupiedTables} Occupied`;
}

function renderTotalPrice(total) {
  document.querySelector(".total-price").textContent = `$${total}`;
}

async function fechTableOrders(tableID){
  let tableOrders = await ordersDll.getAll(tableID);
  if (!tableOrders || tableOrders.length === 0) return null;

  let menu = await menuDll.getAll();

  let enrichedOrders = tableOrders.map(order => ({
    ...order,
    item: menu.find(m => m.id === order.menuItemID)
  }));

  return enrichedOrders;
}

async function addItemToBasket(itemID) {
  resetOrdersArea();
  if (!selectedTable){
    alert("Select Table First !");
    return;
  }
  
  await ordersDll.add(itemID, selectedTable.id);

  let orders = await fechTableOrders(selectedTable.id);
  if(!orders) return;

  ordersArea.ordersCollection(orders, {renderTotalPrice});
}

async function appendDefaultMenu(){
  let menu = [
      { name: "Margherita Pizza", ingredients: "Tomato, Mozzarella, Basil", price: 8.99 },
      { name: "Chicken Burger", ingredients: "Chicken, Lettuce, Tomato, Cheese", price: 6.49 },
      { name: "Pasta Alfredo", ingredients: "Pasta, Cream, Parmesan, Garlic", price: 7.99 },
      { name: "Caesar Salad", ingredients: "Lettuce, Croutons, Parmesan, Caesar Sauce", price: 5.49 },
      { name: "Grilled Steak", ingredients: "Beef Steak, Spices, Butter", price: 12.99 },
      { name: "French Fries", ingredients: "Potatoes, Salt, Oil", price: 3.49 }
  ];

  await Promise.all(menu.map(item => menuDll.add(item)));
}

async function initMenuItems() {
  menuGrid.innerHTML = "";
  let menu = await menuDll.getAll();
  if (!menu || menu.length === 0){
    await appendDefaultMenu();
    menu = await menuDll.getAll();
  }

  menuArea.menuCollection(menu, { addItemToBasket });
}

async function selectTable(table){
  resetOrdersArea();
  selectedTable = table;
  if(!table) return;

  isTableOpen = (table.status === "available");
  document.querySelector(".selected-table").textContent = table.name;

  let orders = await fechTableOrders(selectedTable.id);
  if(!orders) return;

  ordersArea.ordersCollection(orders, {renderTotalPrice});
}

async function updateStatus(tableID, newStatus){
  if(await tablesDll.update(tableID, newStatus)){
    isTableOpen = (selectedTable.status === "available");
    let tablesStatus = await tablesDll.getTablesStatus();
    renderTablesStatus(tablesStatus.available, tablesStatus.occupied);
  }
}

async function appendDefaultTables() {
   for (let i = 0; i < 6; i++) {
    await tablesDll.add();
  }
}

async function initTables() {
  let tables = await tablesDll.getAll();
  if (!tables || tables.length === 0) {
    await appendDefaultTables();
    tables = await tablesDll.getAll();
  }

  tablesArea.tablesCollection(tables, { renderTablesStatus, selectTable, updateStatus });
}

async function init() {
  await initTables();
  await initMenuItems();
}

await init();