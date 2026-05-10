import { getItemData, searchItem,addToCart } from "../model/ItemModel.js";
import {cart_db} from "../db/DB.js";


const itemGrid = $('#item-grid');
const cardTemplate = $('.apple-item-card').first().clone();

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
            // Bootstrap Icon: bi-bag-check-fill (Apple feel ekata mara set)
            cartBtn.html(' Added <i class="bi bi-bag-check-fill"></i>')
                .addClass('btn-added')
                .css('pointer-events', 'none');
        } else {
            // Bootstrap Icon: bi-bag-plus
            cartBtn.html(' Add to Cart <i class="bi bi-bag-plus"></i>')
                .removeClass('btn-added')
                .css('pointer-events', 'auto');
        }

        cartBtn.off('click').on('click', function() {
            $(this).html(' Added <i class="bi bi-bag-check-fill"></i>')
                .addClass('btn-added')
                .css('pointer-events', 'none');

            addToCart(item.id);
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