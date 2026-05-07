import { addCustomerData, getCustomerData, updateCustomerData, deleteCustomerData, searchCustomer, getCustomerDataById } from '../model/CustomerModel.js';
import {check_phone} from '../utills/rege_utills.js';

const addCustomerModal = $('#add-customer');
const modalTitle = $('#customer-title');
const saveUpdateButton = $('#customer-btn-save');
const customerForm = $('#customerForm');

function loadCustomerTable(data) {
    $('#customer_tbody').empty();

    let customerList;
    if (data == undefined) {
        customerList = getCustomerData();
    } else {
        customerList = data;
    }

    customerList.forEach(function (item) {
        let row = `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.address}</td>
            <td>${item.contact}</td>
            <td>
                <button class="btn-edit-action edit btn btn-sm "><i class="bi bi-pencil-square"></i></button>
                <button class="btn-delete-action delete btn btn-sm "><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;
        $('#customer_tbody').append(row);
    });
}

// add btn click//////////////////
$('#btn-new-customer').on('click', function () {
    modalTitle.text("Add New Customer");
    saveUpdateButton.text("Save Customer");

    customerForm[0].reset();
    addCustomerModal.show();
});


// fill data update form
$('#customer-table').on('click', '.btn-edit-action', function () {
    let row = $(this).closest('tr');
    let id = row.find('td:eq(0)').text();
    let name = row.find('td:eq(1)').text();
    let address = row.find('td:eq(2)').text();
    let contact = row.find('td:eq(3)').text();

    $('#customer_id_input').val(id);
    $('#customer_name_input').val(name);
    $('#customer_address_input').val(address);
    $('#customer_contact_input').val(contact);

    modalTitle.text("Edit Customer");
    saveUpdateButton.text("Update Customer");

    $('#customer_id_input').attr('readonly', true);
    addCustomerModal.show();
});


// click save or update btn
saveUpdateButton.on('click', function () {
    let id = $('#customer_id_input').val();
    let name = $('#customer_name_input').val();
    let address = $('#customer_address_input').val();
    let contact = $('#customer_contact_input').val();
    $('#customer_id_input').attr('readonly', false);


    if (id != "" && name != "" && address != "" && contact != "") {

        if (saveUpdateButton.text() == "Save Customer") {

            if (getCustomerDataById(id)) {

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
            } else if (!check_phone(contact)) {

                playAppleSound();
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'warning',
                    iconColor: '#ff3b30',
                    text: 'Invalid Phone Number !',
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        popup: 'apple-toast'
                    }
                });
            } else {
                addCustomerData(id, name, address, contact);

                playAppleSound();
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Customer Saved!',
                    iconColor: '#34c759',
                    showConfirmButton: false,
                    timer: 3000
                });
            }

        } else {

            if (!check_phone(contact)) {

                playAppleSound();
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'warning',
                    iconColor: '#ff3b30',
                    text: 'Invalid Phone Number !',
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        popup: 'apple-toast'
                    }
                });
            } else {
                updateCustomerData(id, name, address, contact);

                playAppleSound();
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    iconColor: '#34c759',
                    title: 'Customer Updated!',
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        popup: 'apple-toast'
                    }

                });
            }
        }

        addCustomerModal.hide();
        loadCustomerTable();

    } else {

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
});


// enter delete btn
$('#customer-table').on('click', '.btn-delete-action', function () {
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
            deleteCustomerData(id);
            loadCustomerTable();

            playAppleSound();

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                iconColor: '#34c759',
                title: 'Deleted!',
                text: 'Customer has been removed.',
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    popup: 'apple-toast'
                }
            });
        }
    });
});


//search input
$('#search_input').on('input', function () {
    let text = $(this).val();
    let filteredList = searchCustomer(text);
    loadCustomerTable(filteredList);
});

//close form
$('#close-modal').on('click', function () {
    addCustomerModal.hide();
});


loadCustomerTable();

function playAppleSound() {
    let audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.volume = 0.2;
    audio.play().catch(error => console.log("Sound play error: ", error));
}
