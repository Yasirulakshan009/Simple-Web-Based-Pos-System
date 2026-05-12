import { getItemData, searchItem, addToCart } from "../model/ItemModel.js";
import { getCustomerData } from "../model/CustomerModel.js";
import { saveOrder } from "../model/OrderModel.js";
import { loadOrderTable } from "./OrderHistoryController.js";
import { cart_db } from "../db/DB.js";

const itemGrid = $('#item-grid');
const cardTemplate = $('.apple-item-card').first().clone();
const slideScrollArea = $('.cart-items-scroll-area');
const cartItemTemplate = $('.apple-cart-item').first().clone();

slideScrollArea.empty();

function loadOrderPageItems(itemsToLoad) {
    itemGrid.empty();
    let allItems = (itemsToLoad !== undefined) ? itemsToLoad : getItemData();

    if(allItems.length === 0){
        itemGrid.html(`<h2 style="width:100%; display:flex; justify-content:center; align-items:center; color:#b0b0b0; font-size:32px; font-weight:600;">No Items Found !</h2>`);
        return;
    }

    allItems.forEach(item => {
        const newCard = cardTemplate.clone();
        newCard.find('#order-cart-btn').text('Add to Cart');
        newCard.css('display', 'flex');
        newCard.find('#order-item-img').attr('src', item.image);
        newCard.find('#order-item-model').text(item.model);
        newCard.find('#order-item-price').text(item.sellingPrice);
        newCard.find('#order-item-name').text(item.itemName);
        newCard.find('#order-item-qty').text(`${item.quantity} In Stock`);

        const cartBtn = newCard.find('#order-cart-btn');
        const isAdded = cart_db.some(c => c.id === item.id);

        if (isAdded) {
            cartBtn.html(' Added <i class="bi bi-bag-check-fill"></i>').addClass('btn-added').prop('disabled', true);
        } else {
            cartBtn.html(' Add to Cart <i class="bi bi-bag-plus"></i>').removeClass('btn-added').prop('disabled', false);
        }

        cartBtn.off('click').on('click', function() {
            $(this).html(' Added <i class="bi bi-bag-check-fill"></i>').addClass('btn-added').prop('disabled', true);
            addToCart(item.id);

            const newCartItem = cartItemTemplate.clone();
            newCartItem.find('img').attr('src',item.image);
            newCartItem.find('.item-model').text(item.model);
            newCartItem.find('.item-name').text(item.itemName);
            newCartItem.find('.item-price').text(item.sellingPrice);

            const currentQtyInput = newCartItem.find('input').val(1);

            newCartItem.find('.cart-del-btn').on('click' , function (){
                let itemIndex = cart_db.findIndex(c => c.id === item.id);
                if (itemIndex !== -1) { cart_db.splice(itemIndex, 1); }
                newCartItem.remove();
                calculateTotal();
                loadOrderPageItems();
            });

            newCartItem.find('#plusBtn').on('click', function() {
                currentQtyInput.val(parseInt(currentQtyInput.val()) + 1);
                calculateTotal();
            });

            newCartItem.find('#minBtn').on('click', function() {
                let currentQty = parseInt(currentQtyInput.val());
                if (currentQty > 1) {
                    currentQtyInput.val(currentQty - 1);
                    calculateTotal();
                }
            });

            slideScrollArea.append(newCartItem);
            calculateTotal();
        });
        itemGrid.append(newCard);
    });
}

function calculateTotal() {
    let subTotal = 0;
    $('.apple-cart-item').each(function () {
        let price = parseFloat($(this).find('.item-price').text());
        let qty = parseInt($(this).find('input').val());
        subTotal += price * qty;
    });

    $('#sub-total').text(subTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

    let discountPercent = parseFloat($('#order-discount').val()) || 0;
    let fullPayment = subTotal - (subTotal * discountPercent / 100);

    $('#full-payment').text(fullPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
}

const customerOptionTemplate = $('#customer-option-template').clone();
function loadAllCustomers() {
    const customerSelect = $('#order-customer-select').empty();
    customerSelect.append('<option selected disabled>Select Customer</option>');
    getCustomerData().forEach(customer => {
        const newOption = customerOptionTemplate.clone().removeAttr('id').val(customer.id).text(customer.name);
        customerSelect.append(newOption);
    });
}

$('#btn-place-order').on('click', function () {
    if (!$('#order-customer-select').val()) return alert("Select Customer");
    if ($('.apple-cart-item').length === 0) return alert("Cart empty");

    let purchasedItems = [];
    $('.apple-cart-item').each(function () {
        purchasedItems.push({
            model: $(this).find('.item-model').text(),
            name: $(this).find('.item-name').text(),
            image: $(this).find('img').attr('src')
        });
    });

    let orderData = {
        orderId: "ORD-" + Math.floor(Math.random() * 9000 + 1000),
        customerName: $('#order-customer-select option:selected').text(),
        date: new Date().toLocaleDateString(),
        subTotal: $('#sub-total').text(),
        discount: $('#order-discount').val() || 0,
        totalAmount: $('#full-payment').text(),
        paymentMethod: $('input[name="inlineRadioOptions"]:checked').next('label').text(),
        items: purchasedItems
    };

    if (saveOrder(orderData)) {
        alert("Order Success!");
        cart_db.length = 0;
        clearOrderForm();
        loadOrderPageItems();
        loadOrderTable();
    }
});

function clearOrderForm() {
    slideScrollArea.empty();
    $('#sub-total, #full-payment').text("0.00");
    $('#order-customer-select, #order-discount').val("");
    $('input[name="inlineRadioOptions"]').prop('checked', false);
}

$('#search_input').on('input', function () {
    let text = $(this).val().trim();
    loadOrderPageItems(text === "" ? getItemData() : searchItem(text));
});

$(document).ready(function() {
    loadOrderPageItems();
    loadAllCustomers();
});

$('#order-discount').on('input', calculateTotal);
export { loadOrderPageItems ,loadAllCustomers};