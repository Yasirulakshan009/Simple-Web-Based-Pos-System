import {addCustomerData,getCustomerData} from '../model/CustomerModel.js';


const $addCustomer = $('#add-customer');
const $modalTitle = $('#customer-title');
const $customerBtnSave = $('#customer-btn-save');
const $customerForm = $('#customerForm');

$('#btn-new-customer').on('click' , function (){
    $modalTitle.text ( "Add New Customer");
    $customerBtnSave.text ("Save Customer");
    $customerForm[0].reset();
    $addCustomer.show();
});

$('#customer-table').on('click' , '.btn-edit-action',function (){
        $customerForm[0].reset();
        $modalTitle.text(  "Edit Customer");
        $customerBtnSave.text(  "Update Customer");
        $addCustomer.show();
});

$('#customer-table').on('click','.btn-delete-action',function (){
    if (confirm("Are you sure you want to delete this customer?")) {
       $(this).closest('tr').remove();
    }
});



$('#close-modal').on('click' , function () {
    $addCustomer.hide();
});

// load table////////////////////////

const loadStudentTbl = () => {

    $('#customer_tbody').empty();

    let customer_db = getCustomerData();

    customer_db.map((item, index) => {

        let new_row = `<tr data-index="${index}"> 
                              <td>${item.id}</td> 
                              <td>${item.name}</td> 
                              <td>${item.address}</td> 
                              <td>${item.contact}</td>
                              <td>
                                    <button class="btn-edit-action edit btn btn-sm "><i class="bi bi-pencil-square"></i></button>
                                    <button class="btn-delete-action delete btn btn-sm "><i class="bi bi-trash"></i></button>
                              </td>
                              </tr>`;

        $('#customer_tbody').append(new_row);

    });

}

// add customer/////////////////////

$customerBtnSave.on('click',function () {
    const id = $('#customer_id_input').val();
    const name = $('#customer_name_input').val();
    const address = $('#customer_address_input').val();
    const contact = $('#customer_contact_input').val();

    if(id && name && address && contact){
        addCustomerData(id,name,address,contact);

        Swal.fire({
            title: "Success!",
            text: "Customer saved successfully!",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
            background: '#ffffff',
            color: '#000000'
        });

        $customerForm[0].reset();
        loadStudentTbl();
    }else {
        Swal.fire({
            title: "Error!",
            text: "Please fill all fields!",
            icon: "error",
            confirmButtonColor: '#ff0061'
        });
    }
});
