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

        const searchBar = document.getElementById('search_input');
        const headerInfo = document.getElementById('dashboard-header-info');

        if (targetView === dashboardView) {
            if(searchBar) searchBar.style.display = 'none';
            if(headerInfo) {
                headerInfo.style.display = 'block';
                updateGreeting();
            }
        } else {
            if(headerInfo) headerInfo.style.display = 'none';
            if(searchBar) searchBar.style.display = 'flex';
        }
    }

    function updateGreeting() {
        const greetingElement = document.getElementById('greeting-text');
        const dateElement = document.getElementById('current-date');

        const now = new Date();
        const hours = now.getHours();

        let greeting = "Good Night";
        if (hours < 12) greeting = "Good Morning ☀️";
        else if (hours < 16) greeting = "Good Afternoon 🌤️";
        else if (hours < 21) greeting = "Good Evening 🌙";

        if(greetingElement) greetingElement.innerText = `${greeting}, Admin!`;

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        if(dateElement) dateElement.innerText = now.toLocaleDateString('en-US', options);
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

});

