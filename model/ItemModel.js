import {item_db} from "../db/db.js";

class Item {
    #id;
    #itemName;
    #brand;
    #model;
    #quantity;
    #buyingPrice;
    #sellingPrice;
    #image;

    constructor(id,itemName,brand,model,quantity,buyingPrice,sellingPrice,image) {
        this.#id=id;
        this.#itemName=itemName;
        this.#brand=brand;
        this.#model=model;
        this.#quantity=quantity;
        this.#buyingPrice=buyingPrice;
        this.#sellingPrice=sellingPrice;
        this.#image=image;
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

    get image() {
        return this.#image;
    }

    set image(image) {
        this.#image = image;
    }
}

const addItemData = (id ,itemName ,brand ,model,quantity,buyingPrice,sellingPrice,image) => {
    let new_item = new Item(id,itemName,brand,model,quantity,buyingPrice,sellingPrice,image);
    item_db.unshift(new_item);
}

const getItemData = () => {
    return item_db;
}

const updateItemData = (id ,itemName ,brand ,model,quantity,buyingPrice,sellingPrice,image) => {
    let obj = item_db.find(item => item.id == id);

    if(obj) {
        obj.itemName=itemName;
        obj.brand=brand;
        obj.model=model;
        obj.quantity=quantity;
        obj.buyingPrice=buyingPrice;
        obj.sellingPrice=sellingPrice;
        if(image) obj.image = image;

    }
}

const deleteItemData = (id) => {
    let index = item_db.findIndex(item => item.id == id);

    if(index!==-1) {
        item_db.splice(index, 1);
    }
}

const getItemDataById = (id) => {
    return item_db.find(item => item.id==id);
}

const generateNextItemId = () => {
    if (item_db.length === 0) return "I00-001";
    let lastId = item_db[0].id;
    let parts = lastId.split("-");
    let nextNumber = parseInt(parts[1]) + 1;
    return "I00-" + nextNumber.toString().padStart(3, '0');
};

const searchItem = (searchTerm) => {
    let lowerTerm = searchTerm.toLowerCase();

    return item_db.filter(item => {
        let id = String(item.id).toLowerCase();
        let name = String(item.itemName).toLowerCase();
        let model = String(item.model).toLowerCase();

        return id.includes(lowerTerm) || name.includes(lowerTerm) || model.includes(lowerTerm);
    });
}


export {addItemData,getItemData,updateItemData,deleteItemData,getItemDataById,generateNextItemId,searchItem};
