import db from "./database.connection.js";

async function addOrder(menuItemID, tableID){
    try{
        return await db.orders.add({menuItemID, tableID});
    }catch(err){
        console.log(err);
        return null;
    }
}

async function removeOrders(tableID){
    try{
        await db.orders.where("tableID").equals(tableID).delete();
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

async function getAllOrders(tableID){
    try{
        return await db.orders.where("tableID").equals(tableID).toArray();
    }catch(err){
        console.log(err);
        return null;
    }
}

async function clearOrders(){
    try{
        await db.orders.clear();
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

const ordersDB = {
    addOrder,
    removeOrders,
    getAllOrders,
    clearOrders
};

export default ordersDB;