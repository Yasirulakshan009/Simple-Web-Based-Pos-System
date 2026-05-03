document.addEventListener('DOMContentLoaded', function () {

    const navDashboard = document.getElementById('nav-dashboard');
    const navCustomers = document.getElementById('nav-customers');
    const navItems = document.getElementById('nav-items');

    const dashboardView = document.getElementById('dashboard-view');
    const customerView = document.getElementById('customer-view');
    const itemView = document.getElementById('item-view');

    const allViews = [dashboardView, customerView, itemView];
    const allNavLinks = [navDashboard, navCustomers, navItems];

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

    showView(dashboardView, navDashboard);


    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault(); // පේජ් එක Refresh වීම නවත්වන්න
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

    const customerModal = document.getElementById('add-customer');
    const modalTitle = document.getElementById('modal-title');
    const btnSave = document.getElementById('btn-save');

    document.getElementById('btn-new-customer').onclick = function() {
        modalTitle.innerText = "Add New Customer";
        btnSave.innerText = "Save Customer";
        document.getElementById('customerForm').reset();
        customerModal.style.display = 'block';
    };

    document.querySelector('#customer-table').addEventListener('click', function(e) {

        if (e.target.closest('.btn-edit-action')) {
            document.getElementById('customerForm').reset();
            modalTitle.innerText = "Edit Customer";
            btnSave.innerText = "Update Customer";
            customerModal.style.display = 'block';
        }

        if (e.target.closest('.btn-delete-action')) {
            if (confirm("Are you sure you want to delete this customer?")) {
                e.target.closest('tr').remove();
            }
        }
    });

    document.getElementById('close-modal').onclick = function() {
        customerModal.style.display = 'none';
    };
});

