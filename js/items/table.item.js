export function tableItem(data, callback){
    let tableItem = document.createElement('div');
    tableItem.classList.add("table");

    tableItem.innerHTML = `
        <h3 class="table-name">${data.name}</h3>
        <p>4 seats</p>
        <div class="btns">
        <button class="select-table secondary-btn">Select</button>
        <button class="table-status-toggler primary-btn">Open</button>
        </div>

        <span class="table-badge" style="border-radius: var(--radius-sm)">${data.status}</span>
    `;

    let badge = tableItem.querySelector(".table-badge");
    let selectTableBtn = tableItem.querySelector(".select-table");
    let statusToggler = tableItem.querySelector(".table-status-toggler");

    toggleStatus(data.status === "available", badge, statusToggler);

    selectTableBtn.addEventListener('click', () => {
        callback.selectTable(data);
    });

    statusToggler.addEventListener('click', () => {
        let newStatus = data.status === "available" ? "occupied" : "available";

        callback.updateStatus(data.id, newStatus);
        toggleStatus(newStatus === "available", badge, statusToggler);
        data.status = newStatus;
    });

    return tableItem;
}

function toggleStatus(isAvailable, badge, toggler){
    badge.classList.toggle("status-available", isAvailable);
    badge.classList.toggle("status-occupied", !isAvailable);

    badge.textContent = isAvailable ? "available" : "occupied";
    toggler.textContent = isAvailable ? "Close" : "Open";
}