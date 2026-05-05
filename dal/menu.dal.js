import db from "./database.connection.js";

async function addMenuItem(item){
    try{
        return await db.menu.add({name: item.name, ingredients: item.ingredients, price: item.price});
    }catch(err){
        console.log(err);
        return null;
    }
}

async function getAllMenuItems(){
    try{
        return await db.menu.toArray();
    }catch(err){
        console.log(err);
        return null;
    }
}

async function clearMenuItems(){
    try{
        await db.menu.clear();
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

const menuDB = {
    addMenuItem,
    getAllMenuItems,
    clearMenuItems
}

export default menuDB;