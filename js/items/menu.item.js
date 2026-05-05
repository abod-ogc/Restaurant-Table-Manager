export function menuItem(data, callback){
    let menuItem = document.createElement('div');
    menuItem.classList.add("menu-item");

    menuItem.innerHTML = `
        <h3 class="name">${data.name}</h3>
        <p class="ingrdients">${data.ingredients}</p>
        <span class="price">$${data.price}</span>
        <button class="add primary-btn">add</button>
    `;

    let addBtn = menuItem.querySelector(".add");
    addBtn.addEventListener('click', () => {
        callback.addItemToBasket(data.id);
    });

    return menuItem;
}