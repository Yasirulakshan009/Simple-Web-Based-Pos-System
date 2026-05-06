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
