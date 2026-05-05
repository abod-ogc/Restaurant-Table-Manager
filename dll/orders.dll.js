import ordersDB from "../dal/orders.dal.js";

async function add(menuId, tableId){
    if (menuId == null || tableId == null) return null;
    if (Number.isNaN(menuId) || Number.isNaN(tableId)) return null;

    return await ordersDB.addOrder(menuId, tableId);
}

async function remove(tableID){
    if(tableID === null || Number.isNaN(tableID)) return null;

    return await ordersDB.removeOrders(tableID);
}

async function getAll(tableID){
    return await ordersDB.getAllOrders(tableID);
}

async function clear(){
    return await ordersDB.clearOrders();
}

const ordersDll = {
    add,
    remove,
    getAll,
    clear
}

export default ordersDll;