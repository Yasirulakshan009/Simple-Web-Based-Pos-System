document.addEventListener('DOMContentLoaded', function () {

    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
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
});