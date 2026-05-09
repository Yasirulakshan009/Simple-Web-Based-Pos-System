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
    customer_db.unshift(new_customer);
}

const getCustomerData = () => {
    return customer_db;
}

const updateCustomerData = (cid, cname, caddress, ccontact) => {
    let obj = customer_db.find(item => item.id == cid);

    if(obj) {
        obj.name=cname;
        obj.address=caddress;
        obj.contact=ccontact
    }
}

const deleteCustomerData = (cid) => {
    let index = customer_db.findIndex(item => item.id == cid);

    if(index!==-1) {
        customer_db.splice(index, 1);
    }
}

const searchCustomer = (searchTerm) => {
    let lowerTerm = searchTerm.toLowerCase();

    return customer_db.filter(item => {
        let id = String(item.id).toLowerCase();
        let name = String(item.name).toLowerCase();

        return id.includes(lowerTerm) || name.includes(lowerTerm);
    });
}

const getCustomerDataById = (id) => {
    return customer_db.find(item => item.id==id);
}

const generateNextCustomerId = () => {
    if (customer_db.length === 0) return "C00-001";
    let lastId = customer_db[0].id;
    let parts = lastId.split("-");
    let nextNumber = parseInt(parts[1]) + 1;
    return "C00-" + nextNumber.toString().padStart(3, '0');
};




export {addCustomerData , getCustomerData , updateCustomerData , deleteCustomerData , searchCustomer , getCustomerDataById , generateNextCustomerId};