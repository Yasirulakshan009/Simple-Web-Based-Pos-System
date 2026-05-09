import {addItemData, getItemDataById, getItemData, updateItemData, deleteItemData, generateNextItemId, searchItem} from "../model/ItemModel.js";

const itemTitle = $('#item-title');
const saveUpdateBtn =  $('#item-btn-save');
const addItemModal = $('#add-item');
let currentImage = "";


function loadItemTable(itemList = getItemData()) {
    $('#item_tbody').empty();

    itemList.forEach(item => {
        let row = `<tr>
            <td>${item.id}</td>
            <td>
                <div class="d-flex align-items-center ps-3">
                    <img src="${item.image || ''}" class="table-img me-3" alt="item">
                    <span>${item.itemName}</span>
                </div>
            </td>
            <td>${item.brand}</td> 
            <td>${item.model}</td> 
            <td>${item.quantity}</td> 
            <td>${item.buyingPrice}</td> 
            <td>${item.sellingPrice}</td>
            <td>
                <button class="item-edit-action edit btn btn-sm"><i class="bi bi-pencil-square"></i></button>
                <button class="item-delete-action delete btn btn-sm"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;
        $('#item_tbody').append(row);
    });
}

$('#btn-new-item').on('click', function () {
    itemTitle.text("Add New Item");
    saveUpdateBtn.text("Save Item");


    clearForm();
    let nextId = generateNextItemId();
    $('#item-id').val(nextId);
    $('#item-id').prop('readonly', true);
    addItemModal.show();

});


$('#item-table').on('click','.item-edit-action', function () {
    let row = $(this).closest('tr');
    let id = row.find('td:eq(0)').text();
    let item = getItemDataById(id);
    if(item) {
        currentImage = item.image;
        $('#preview').attr('src', item.image).show();
    }
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
    addItemModal.show();
});


saveUpdateBtn.on('click', function () {
    let id = $('#item-id').val();
    let name = $('#item-name').val();
    let brand = $('#item-brand').val();
    let model = $('#item-model').val();
    let qty = $('#item-qty').val();
    let buyingPrice = parseFloat($('#item-buying-price').val()).toFixed(2);
    let sellingPrice = parseFloat($('#item-selling-price').val()).toFixed(2);


    if(id && name && brand && model && qty && !isNaN(buyingPrice) && !isNaN(sellingPrice)){

        if (saveUpdateBtn.text() == "Save Item"){

            if (getItemDataById(id)){
                playAppleSound();
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'warning',
                    iconColor: '#ff3b30',
                    text: 'ID already exists !',
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        popup: 'apple-toast'
                    }
                });
            }else{
                addItemData(id,name,brand,model,qty,buyingPrice,sellingPrice,currentImage);

                playAppleSound();
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Item Saved!',
                    iconColor: '#34c759',
                    showConfirmButton: false,
                    timer: 3000
                });
            }


        }else{
            updateItemData(id,name,brand,model,qty,buyingPrice,sellingPrice,currentImage);

            playAppleSound();
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                iconColor: '#34c759',
                title: 'Item Updated!',
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    popup: 'apple-toast'
                }

            });
        }

        clearForm();
        addItemModal.hide();
        loadItemTable();

    }else{

        playAppleSound();

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Please fill all the details',
            iconColor: '#ff3b30',
            showConfirmButton: false,
            timer: 3000,
            customClass: {
                popup: 'apple-toast'
            }

        });
    }
})


// enter delete btn
$('#item-table').on('click', '.item-delete-action', function () {
    let id = $(this).closest('tr').find('td:eq(0)').text();

    Swal.fire({
        text: "Are you sure delete id " + id + "?",
        icon: 'warning',
        iconColor: '#ff3b30',
        toast: true,
        position: 'top-end',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#ff3b30',
        cancelButtonColor: '#007aff',
        reverseButtons: true,
        customClass: {
            popup: 'apple-toast'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            deleteItemData(id);
            loadItemTable();

            playAppleSound();

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                iconColor: '#ff0000',
                title: 'Deleted!',
                text: 'Item has been removed.',
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    popup: 'apple-toast'
                }
            });
        }
    });
});


//close form
$('#item-close-modal').on('click', function () {
    addItemModal.hide();
});


 //clean form
function clearForm() {
    $('#item-name').val("");
    $('#item-brand').val("");
    $('#item-model').val("");
    $('#item-qty').val("");
    $('#item-buying-price').val("");
    $('#item-selling-price').val("");

    $('#preview').attr('src', '').hide();
    currentImage = "";

    $('#item-id').prop('readonly', true);
}

$('#item-clear').on('click', function () {
    clearForm();
});


$('#fileInput').on('change', function () {
    const reader = new FileReader();
    reader.onload = (e) => {
        $('#preview').attr('src', e.target.result).show();
        currentImage = e.target.result;
    };
    if (this.files[0]) reader.readAsDataURL(this.files[0]);
});

$('.image-box').on('click', () => $('#fileInput').click());

function playAppleSound() {
    let audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.volume = 0.2;
    audio.play().catch(error => console.log("Sound play error: ", error));
}

//search input
$('#search_input').on('input', function () {
    let text = $(this).val();
    let filteredList = searchItem(text);
    loadItemTable(filteredList);
});


loadItemTable();
