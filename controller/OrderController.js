import { getItemData } from "../model/ItemModel.js";

function loadOrderPageItems() {
    const $itemGrid = $('#item-grid');
    const $cardTemplate = $('.apple-item-card').first();
    const allItems = getItemData();

    $itemGrid.empty();

    allItems.forEach(item => {
        const $newCard = $cardTemplate.clone();

        $newCard.css('display', 'flex');

        $newCard.find('#order-item-img').attr('src', item.image);
        $newCard.find('#order-item-model').text(item.model);
        $newCard.find('#order-item-price').text(item.sellingPrice);
        $newCard.find('#order-item-name').text(item.itemName);
        $newCard.find('#order-item-qty').text(`${item.quantity} In Stock`);

        const $btn = $newCard.find('.item-add-btn');
        $btn.text('Add to Cart');
        $newCard.find('#order-cart-btn').on('click', function() {
            addToCart(item.id);
        });

        $itemGrid.append($newCard);
    });
}

$(document).ready(function() {
    loadOrderPageItems();
});

export { loadOrderPageItems };