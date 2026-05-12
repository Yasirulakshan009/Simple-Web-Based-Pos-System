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

    renderChart();
}

$('.recent-btn .btn-outline-dark').on('click', function() {
    $('#dashboard-view').hide();
    $('#order-history-view').show();

    $('.nav-link').removeClass('active');
    $('#nav-history').addClass('active');
});

$('.recent-btn .btn-primary').on('click', function() {
    $('#dashboard-view').hide();
    $('#item-view').show();

    $('.nav-link').removeClass('active');
    $('#nav-items').addClass('active');

    $('#btn-new-item').trigger('click');
});

function getWeeklySalesData() {
    const allOrders = getAllOrders();
    const salesData = [0, 0, 0, 0, 0, 0, 0]; // Sun to Sat

    allOrders.forEach(order => {
        const orderDate = new Date(order.date);
        const dayIndex = orderDate.getDay();

        let amount = parseFloat(String(order.totalAmount).replace(/,/g, ''));
        if (!isNaN(amount)) {
            salesData[dayIndex] += amount;
        }
    });
    return salesData;
}


let myChart;

function renderChart() {
    const chartElement = document.getElementById('myLineChart');
    if (!chartElement) return;

    if (myChart) {
        myChart.destroy();
    }

    const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    myChart = new Chart(chartElement, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Weekly Sales',
                data: getWeeklySalesData(),
                pointRadius: 5,
                fill: true,
                borderColor: '#007aff',
                tension: 0.3,
                backgroundColor: function(context) {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    if (!chartArea) return null;
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(1, '#007aff');
                    gradient.addColorStop(0.5, '#52a2ff');
                    gradient.addColorStop(0, '#FFFFFF');
                    return gradient;
                }
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } }
        }
    });
}

$(document).ready(() => {
    updateDashboard();
});

