import {orderItem} from "../items/order.item.js";

const ordersCollection = (orders, callback) => {
    let collectionFrag = document.createDocumentFragment();
    let collection = document.querySelector(".orders-list");

    let totalPrice = 0;

    for(let order of orders){
        if (!order.item) continue;

        totalPrice += order.item.price;
        collectionFrag.append(orderItem(order.item));
    }

    collection.append(collectionFrag);
    callback?.renderTotalPrice?.(totalPrice);
}

const ordersArea = {
    ordersCollection
}

export default ordersArea;