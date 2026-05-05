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


    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const username = document.getElementById('exampleInputUsername').value;
            const password = document.getElementById('exampleInputPassword1').value;

            if (username === "" || password === "") {
                alert("Fill All Fields !");
                return;
            }
            if (username === "y" && password === "1") {
                alert("Login Successful!");
                window.location.href = "index.html";

            } else {
                alert("Invalid Username and Password. Try Again !");
                document.getElementById('exampleInputPassword1').value = "";
            }
        });
    }

    const checkbox = document.getElementById('exampleCheck1');
    const passwordInput = document.getElementById('exampleInputPassword1');
    if (checkbox && passwordInput) {
        checkbox.addEventListener('change', function() {
            passwordInput.type = this.checked ? 'text' : 'password';
        });
    }
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
                borderColor: '#00C42E',
                tension: 0.3,

                backgroundColor: function(context) {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;

                    if (!chartArea) {
                        return null;
                    }

                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(1, '#06EC38');
                    gradient.addColorStop(0.5, '#6DE589');
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

    const addCustomer = document.getElementById('add-customer');
    const modalTitle = document.getElementById('customer-title');
    const btnSave = document.getElementById('btn-save');

    document.getElementById('btn-new-customer').onclick = function() {
        modalTitle.innerText = "Add New Customer";
        btnSave.innerText = "Save Customer";
        document.getElementById('customerForm').reset();
        addCustomer.style.display = 'block';
    };

    document.querySelector('#customer-table').addEventListener('click', function(e) {

        if (e.target.closest('.btn-edit-action')) {
            document.getElementById('customerForm').reset();
            modalTitle.innerText = "Edit Customer";
            btnSave.innerText = "Update Customer";
            addCustomer.style.display = 'block';
        }

        if (e.target.closest('.btn-delete-action')) {
            if (confirm("Are you sure you want to delete this customer?")) {
                e.target.closest('tr').remove();
            }
        }
    });

    document.getElementById('close-modal').onclick = function() {
        addCustomer.style.display = 'none';
    };

    const addItem = document.getElementById('add-item');
    const itemTitle = document.getElementById('item-title');
    const itemSave = document.getElementById('item-btn-save');

    document.getElementById('btn-new-item').onclick = function() {
        itemTitle.innerText = "Add New Item";
        itemSave.innerText = "Save Item";
        document.getElementById('itemForm').reset();
        addItem.style.display = 'block';
    };

    document.querySelector('#item-table').addEventListener('click', function(e) {

        if (e.target.closest('.item-edit-action')) {
            document.getElementById('itemForm').reset();
            itemTitle.innerText = "Edit Item";
            itemSave.innerText = "Update Item";
            addItem.style.display = 'block';
        }

        if (e.target.closest('.item-delete-action')) {
            if (confirm("Are you sure you want to delete this item?")) {
                e.target.closest('tr').remove();
            }
        }
    });

    document.getElementById('item-close-modal').onclick = function() {
        addItem.style.display = 'none';
    };


    const orderDetails = document.getElementById('order-details');

    document.querySelector('#history-table').addEventListener('click', function(e) {

        if (e.target.closest('.order-view-action')) {
            orderDetails.style.display = 'block';
        }

        if (e.target.closest('.order-delete-action')) {
            if (confirm("Are you sure you want to delete this order?")) {
                e.target.closest('tr').remove();
            }
        }
    });

    document.getElementById('history-close-modal').onclick = function() {
        orderDetails.style.display = 'none';
    };
});

