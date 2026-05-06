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

