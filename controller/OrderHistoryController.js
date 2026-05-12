import { getAllOrders, deleteOrder } from "../model/OrderModel.js";
import { updateDashboard } from "../controller/DashboardController.js";

const itemTemplate = $('.order-flex-layout').first().clone();

export function loadOrderTable(ordersToDisplay) {
    const historyTableBody = $('#history-table tbody').empty();

    const allOrdersOriginal = getAllOrders();
    const displayList = (ordersToDisplay !== undefined) ? ordersToDisplay : allOrdersOriginal;

    for (let i = displayList.length - 1; i >= 0; i--) {
        const order = displayList[i];

        let originalIndex = allOrdersOriginal.findIndex(o => o.orderId === order.orderId);
        let displayId = "ORD-" + String(originalIndex + 1).padStart(3, '0');

        historyTableBody.append(`
            <tr>
                <td>${displayId}</td>
                <td>${order.customerName}</td>
                <td>${order.subTotal}</td>
                <td>${order.discount}</td>
                <td>${order.totalAmount}</td>
                <td>${order.paymentMethod}</td>
                <td>
                    <button class="order-view-action view btn btn-sm" data-id="${order.orderId}"><i class="bi bi-eye"></i></button>
                    <button class="order-delete-action delete btn btn-sm" data-id="${order.orderId}"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `);
    }
}

$('#search_input').on('input', function () {
    let text = $(this).val().toLowerCase().trim();
    const allOrders = getAllOrders();

    let filteredOrders = allOrders.filter((order, index) => {
        let displayId = "ORD-" + String(index + 1).padStart(3, '0');

        return displayId.toLowerCase().includes(text) ||
            order.customerName.toLowerCase().includes(text);
    });

    loadOrderTable(filteredOrders);
});

$(document).on('click', '.order-delete-action', function() {
    const id = $(this).data('id');
    if (confirm("Are you sure you want to delete this order?")) {
        if (deleteOrder(id)) {
            alert("Order Deleted!");
            loadOrderTable();
            updateDashboard();
        }
    }
});

$(document).on('click', '.order-view-action', function() {
    const id = $(this).data('id');
    const order = getAllOrders().find(o => o.orderId === id);

    if (order) {
        $('#detail-customer-name').text(order.customerName);
        $('#detail-date').text(order.date);
        $('#detail-subtotal').text(order.subTotal);
        $('#detail-discount').text(order.discount);
        $('#detail-total').text(order.totalAmount);

        const itemsHolder = $('#items-holder').empty();
        order.items.forEach(item => {
            const newItemRow = itemTemplate.clone();
            newItemRow.find('.detail-val').first().text(item.name);
            newItemRow.find('.text-blue').text(item.model);
            newItemRow.find('img').attr('src', item.image);
            itemsHolder.append(newItemRow);
        });
        $('#order-details').fadeIn().css('display', 'flex');
    }
});

$('#history-close-modal').on('click', () => $('#order-details').fadeOut());

$(document).ready(() => loadOrderTable());