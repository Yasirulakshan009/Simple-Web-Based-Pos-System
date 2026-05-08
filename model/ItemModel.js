import {customer_db, item_db} from "../db/db.js";

class Item {
    #id;
    #itemName;
    #brand;
    #model;
    #quantity;
    #buyingPrice;
    #sellingPrice;

    constructor(id,itemName,brand,model,quantity,buyingPrice,sellingPrice) {
        this.#id=id;
        this.#itemName=itemName;
        this.#brand=brand;
        this.#model=model;
        this.#quantity=quantity;
        this.#buyingPrice=buyingPrice;
        this.#sellingPrice=sellingPrice;
    }


    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get itemName() {
        return this.#itemName;
    }

    set itemName(itemName) {
        this.#itemName = itemName;
    }

    get brand() {
        return this.#brand;
    }

    set brand(brand) {
        this.#brand = brand;
    }

    get model() {
        return this.#model;
    }

    set model(model) {
        this.#model = model;
    }

    get quantity() {
        return this.#quantity;
    }

    set quantity(quantity) {
        this.#quantity = quantity;
    }

    get buyingPrice() {
        return this.#buyingPrice;
    }

    set buyingPrice(buyingPrice) {
        this.#buyingPrice = buyingPrice;
    }

    get sellingPrice() {
        return this.#sellingPrice;
    }

    set sellingPrice(sellingPrice) {
        this.#sellingPrice = sellingPrice;
    }
}

const addItemData = (id ,itemName ,brand ,model,quantity,buyingPrice,sellingPrice) => {
    let new_item = new Item(id,itemName,brand,model,quantity,buyingPrice,sellingPrice);
    item_db.unshift(new_item);
}

const getItemData = () => {
    return item_db;
}

const updateItemData = (id ,itemName ,brand ,model,quantity,buyingPrice,sellingPrice) => {
    let obj = item_db.find(item => item.id == id);

    if(obj) {
        obj.iteName=itemName;
        obj.brand=brand;
        obj.model=model;
        obj.quantity=quantity;
        obj.buyingPrice=buyingPrice;
        obj.sellingPrice=sellingPrice;

    }
}

export {addItemData,getItemData,updateItemData};
