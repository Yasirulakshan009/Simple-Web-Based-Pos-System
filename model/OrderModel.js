import { order_db } from "../db/DB.js";

class Order {
    #orderId;
    #customerName;
    #date;
    #subTotal;
    #discount;
    #totalAmount;
    #paymentMethod;
    #items;

    constructor(orderId, customerName, date, subTotal, discount, totalAmount, paymentMethod, items) {
        this.#orderId = orderId;
        this.#customerName = customerName;
        this.#date = date;
        this.#subTotal = subTotal;
        this.#discount = discount;
        this.#totalAmount = totalAmount;
        this.#paymentMethod = paymentMethod;
        this.#items = items;
    }

    get orderId() { return this.#orderId; }
    get customerName() { return this.#customerName; }
    get date() { return this.#date; }
    get subTotal() { return this.#subTotal; }
    get discount() { return this.#discount; }
    get totalAmount() { return this.#totalAmount; }
    get paymentMethod() { return this.#paymentMethod; }
    get items() { return this.#items; }
}

const saveOrder = (orderData) => {
    // Controller එකෙන් එවන සරල දත්ත ටිකෙන් අලුත් Class Object එකක් හදනවා
    const newOrder = new Order(
        orderData.orderId,
        orderData.customerName,
        orderData.date,
        orderData.subTotal,
        orderData.discount,
        orderData.totalAmount,
        orderData.paymentMethod,
        orderData.items
    );
    order_db.unshift(newOrder);
    return true;
};

const getAllOrders = () => {
    return order_db;
};

const getOrderById = (id) => {
    return order_db.find(o => o.orderId === id);
};

export { saveOrder, getAllOrders, getOrderById };