import {menuItem} from "../items/menu.item.js";

const menuCollection = (menuItems, callback) => {
    let collectionFrag = document.createDocumentFragment();
    let collection = document.querySelector(".menu-grid");

    for(let item of menuItems){
        collectionFrag.append(menuItem(item, callback));
    }

    collection.append(collectionFrag);
}

const menuArea = {
    menuCollection
}

export default menuArea;