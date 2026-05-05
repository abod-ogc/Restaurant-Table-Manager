export function orderItem(data){
    let orderItem = document.createElement('div');
    orderItem.classList.add("order");

    orderItem.innerHTML = `
        <span class="order-number">${Math.floor(Math.random() * 30) + 1}</span>
        <div class="order-details">
            <h4 class="order-name">${data.name}</h4>
            <p class="ingrdients">${data.ingredients}</p>
        </div>
        <span class="price">${data.price}</span>
    `;

    return orderItem;
}