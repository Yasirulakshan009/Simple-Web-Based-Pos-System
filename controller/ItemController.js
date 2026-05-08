import{addItemData,getItemData,updateItemData} from "../model/ItemModel.js";

const itemForm = $('#itemForm');
const itemTitle = $('#item-title');
const saveUpdateBtn =  $('#item-btn-save');
const addItem = $('#add-item');

$('#btn-new-item').on('click', function () {
    itemTitle.text("Add New Item");
    saveUpdateBtn.text("Save Item");

    itemForm[0].reset();
    addItem.show();

});


$('#item-table').on('click','.item-edit-action', function () {
    let row = $(this).closest('tr');
    let id = row.find('td:eq(0)').text();
    let name = row.find('td:eq(1) span').text();
    let brand = row.find('td:eq(2)').text();
    let model = row.find('td:eq(3)').text();
    let qty = row.find('td:eq(4)').text();
    let buyingPrice = row.find('td:eq(5)').text();
    let sellingPrice = row.find('td:eq(6)').text();

    $('#item-id').val(id);
    $('#item-name').val(name);
    $('#item-brand').val(brand);
    $('#item-model').val(model);
    $('#item-qty').val(qty);
    $('#item-buying-price').val(buyingPrice);
    $('#item-selling-price').val(sellingPrice);

    itemTitle.text("Update Item");
    saveUpdateBtn.text("Update Item")

    $('#item-id').attr('readonly',true);
    addItem.show();
});


saveUpdateBtn.on('click', function () {
    let id = $('#item-id').val();
    let name = $('#item-name').val();
    let brand = $('#item-brand').val();
    let model = $('#item-model').val();
    let qty = $('#item-qty').val();
    let buyingPrice = $('#item-buying-price').val();
    let sellingPrice = $('#item-selling-price').val();
    $('#item-id').attr('readonly', false);

    if(id != "" && name != "" && brand != "" && model != "" && qty != "" && buyingPrice != "" && sellingPrice != "" ){

        if (saveUpdateBtn.text() == "Save Item"){

            addItemData(id,name,brand,model,qty,buyingPrice,sellingPrice);

        }

    }else{

    }


})


//close form
$('#item-close-modal').on('click', function () {
    addItem.hide();
});

















document.addEventListener('DOMContentLoaded', function () {
    const imageBox = document.querySelector('.image-box');
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('preview');

    if (imageBox && fileInput) {
        imageBox.addEventListener('click', function () {
            fileInput.click();
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();

                reader.addEventListener('load', function () {
                    previewImage.setAttribute('src', this.result);
                    previewImage.style.display = 'block';
                });

                reader.readAsDataURL(file);
            }
        });
    }
});