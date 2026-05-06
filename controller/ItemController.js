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