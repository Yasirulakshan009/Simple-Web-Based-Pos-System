document.addEventListener('DOMContentLoaded', function () {

    const navDashboard = document.getElementById('nav-dashboard');
    const navCustomers = document.getElementById('nav-customers');
    const navItems = document.getElementById('nav-items');
    const navOrders = document.getElementById('nav-orders');
    const navHistory = document.getElementById('nav-history');

    const dashboardView = document.getElementById('dashboard-view');
    const customerView = document.getElementById('customer-view');
    const itemView = document.getElementById('item-view');
    const orderView = document.getElementById('order-view');
    const orderHistoryView = document.getElementById('order-history-view');

    const allViews = [dashboardView, customerView, itemView, orderView, orderHistoryView];
    const allNavLinks = [navDashboard, navCustomers, navItems, navOrders, navHistory];

    function showView(targetView, activeLink) {
        allViews.forEach(view => {
            if(view) view.style.display = 'none';
        });
        allNavLinks.forEach(link => {
            if(link) link.classList.remove('active');
        });

        if(targetView) targetView.style.display = 'block';
        if(activeLink) activeLink.classList.add('active');
    }

    if (navDashboard) {
        navDashboard.addEventListener('click', (e) => {
            e.preventDefault();
            showView(dashboardView, navDashboard);
        });
    }

    if (navCustomers) {
        navCustomers.addEventListener('click', (e) => {
            e.preventDefault();
            showView(customerView, navCustomers);
        });
    }

    if (navItems) {
        navItems.addEventListener('click', (e) => {
            e.preventDefault();
            showView(itemView, navItems);
        });
    }

    if (navOrders) {
        navOrders.addEventListener('click', (e) => {
            e.preventDefault();
            showView(orderView, navOrders);
        });
    }

    if (navHistory) {
        navHistory.addEventListener('click', (e) => {
            e.preventDefault();
            showView(orderHistoryView, navHistory);
        });
    }

    showView(dashboardView, navDashboard);



    /*|||||||||||line chart|||||||||||||||||*/

    const chartElement = document.getElementById('myLineChart');

    if (chartElement) {
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        const data = {
            labels: labels,
            datasets: [{
                label: 'Weekly Sales',
                data: [50, 200, 160, 90, 200, 170, 210],
                pointRadius: 5,
                pointHoverRadius: 8,
                fill: true,
                borderColor: '#007aff',
                tension: 0.3,

                backgroundColor: function(context) {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;

                    if (!chartArea) {
                        return null;
                    }

                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(1, '#007aff');
                    gradient.addColorStop(0.5, '#52a2ff');
                    gradient.addColorStop(0, '#FFFFFF');

                    return gradient;
                }
            }]
        };

        new Chart(chartElement, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

 });

