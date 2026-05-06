import {customer_db} from "../db/db.js";

class Customer {
    #id;
    #name;
    #address;
    #contact;


    constructor(id,name,address,contact) {
        this.#id=id;
        this.#name=name;
        this.#address=address;
        this.#contact=contact;
    }


    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get address() {
        return this.#address;
    }

    set address(address) {
        this.#address = address;
    }

    get contact() {
        return this.#contact;
    }

    set contact(contact) {
        this.#contact = contact;
    }
}

const addCustomerData = (cid ,cname ,caddress ,ccontact) => {
    let new_customer = new Customer(cid,cname,caddress,ccontact);
    customer_db.push(new_customer);
}

const getCustomerData = () => {
    return customer_db;
}


export {addCustomerData , getCustomerData};