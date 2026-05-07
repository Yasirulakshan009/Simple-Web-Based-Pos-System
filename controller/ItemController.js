import{addItemData,getItemData} from "../model/ItemModel";

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


saveUpdateBtn.on('click', function () {
    $('#item-id').val();
    $('#item-name').val();
    $('#item-')

})




















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