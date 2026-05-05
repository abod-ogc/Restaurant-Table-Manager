import menuDB from "../dal/menu.dal.js";

async function add(item){
    if(!item.name || !item.ingredients || !item.price) return null;
    if(Number.isNaN(item.price)) return null;

    return await menuDB.addMenuItem(item);
}

async function getAll(){
    return await menuDB.getAllMenuItems();
}

async function clear(){
    return await menuDB.clearMenuItems();
}

const menuDll = {
    add,
    getAll,
    clear
}

export default menuDll;