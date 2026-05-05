import {tableItem} from "../items/table.item.js";

const tablesCollection = (tables, callback) => {
    let collectionFrag = document.createDocumentFragment();
    let collection = document.querySelector(".tables-grid");
    collection.innerHTML = "";

    let availableTables = 0;
    let occupiedTables = 0;

    for(let table of tables){
        if(table.status === "available")
            availableTables++;
        else
            occupiedTables++;

        collectionFrag.append(tableItem(table, callback));
    }

    collection.append(collectionFrag);
    callback.renderTablesStatus(availableTables, occupiedTables);
}

async function resetTablesArea(callback){
    callback.resetOrdersArea();
    await callback.clearOrders();
    await callback.clearTables();
    await callback.appendDefaultTables();
}

const tablesArea = {
    tablesCollection,
    resetTablesArea
}

export default tablesArea;