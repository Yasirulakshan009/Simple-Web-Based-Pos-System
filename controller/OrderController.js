import { getItemData, searchItem,addToCart } from "../model/ItemModel.js";
import {cart_db} from "../db/DB.js";


const itemGrid = $('#item-grid');
const cardTemplate = $('.apple-item-card').first().clone();

const slideScrollArea = $('.cart-items-scroll-area');
const cartItemTemplate = $('.apple-cart-item').first().clone();

slideScrollArea.empty();


function loadOrderPageItems(itemsToLoad) {

    itemGrid.empty();

    let allItems = (itemsToLoad !== undefined) ? itemsToLoad : getItemData();

    if(allItems.length === 0){
        itemGrid.html(`
        <h2 style="
            width:100%;
            display:flex;
            justify-content:center;
            align-items:center;
            color:#b0b0b0;
            font-size:32px;
            font-weight:600;
        ">
            No Items Found !
        </h2>
    `);
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
            cartBtn.html(' Added <i class="bi bi-bag-check-fill"></i>')
                .addClass('btn-added')
                .prop('disabled', true);
        } else {
            cartBtn.html(' Add to Cart <i class="bi bi-bag-plus"></i>')
                .removeClass('btn-added')
                .prop('disabled', false);
        }

        cartBtn.off('click').on('click', function() {
            $(this).html(' Added <i class="bi bi-bag-check-fill"></i>')
                .addClass('btn-added')
                .prop('disabled', true);

            addToCart(item.id);

            const newCartItem = cartItemTemplate.clone();

            newCartItem.find('img').attr('src',item.image);
            newCartItem.find('.item-model').text(item.model);
            newCartItem.find('.item-name').text(item.itemName);
            newCartItem.find('.item-price').text(item.sellingPrice);

            const currentQtyInput = newCartItem.find('input');
            currentQtyInput.val(1);

            newCartItem.find('.cart-del-btn').on('click' , function (){
                newCartItem.remove();

                cartBtn.html(' Add to Cart <i class="bi bi-bag-plus"></i>')
                    .removeClass('btn-added')
                    .prop('disabled', false);
            });

            newCartItem.find('#plusBtn').on('click', function() {
                let currentQty = parseInt(currentQtyInput.val());
                currentQtyInput.val(currentQty + 1);
            });

            newCartItem.find('#minBtn').on('click', function() {
                let currentQty = parseInt(currentQtyInput.val());
                if (currentQty > 1) {
                    currentQtyInput.val(currentQty - 1);
                }
            });

            slideScrollArea.append(newCartItem);
        });

        itemGrid.append(newCard);
    });
}


$('#search_input').on('input', function () {

    let text = $(this).val().trim();

    if(text === ""){
        loadOrderPageItems(getItemData());
    }else{
        let filteredList = searchItem(text);
        loadOrderPageItems(filteredList);
    }
});

$(document).ready(function() {
    loadOrderPageItems();
});

export { loadOrderPageItems };