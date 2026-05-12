import { getCustomerData } from "../model/CustomerModel.js";
import { getItemData } from "../model/ItemModel.js";
import { getAllOrders } from "../model/OrderModel.js";

export function updateDashboard() {
    const customers = getCustomerData();
    const items = getItemData();
    const orders = getAllOrders();

    $('#total-customers').text(customers.length);
    $('#total-items').text(items.length);
    $('#total-orders').text(orders.length);

    let totalRevenue = 0;
    orders.forEach(order => {
        let amount = parseFloat(String(order.totalAmount).replace(/,/g, ''));
        totalRevenue += amount;
    });

    $('#total-revenue').text(totalRevenue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }));

    const recentTableBody = $('#recent-orders-table').empty();

    const recentOrders = orders.slice(0, 5);

    recentOrders.forEach((order, index) => {
        let displayId = "ORD-" + String(orders.length - index).padStart(3, '0');

        let itemName = order.items.length > 0 ? order.items[0].name : "N/A";

        recentTableBody.append(`
            <tr>
                <td>${displayId}</td>
                <td>${order.customerName}</td>
                <td>${itemName}</td>
                <td>${order.date}</td>
                <td>${order.totalAmount}</td>
            </tr>
        `);
    });
}

$(document).ready(() => {
    updateDashboard();
});