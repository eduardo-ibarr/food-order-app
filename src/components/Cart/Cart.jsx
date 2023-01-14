import React, { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import { Modal } from "../UI/Modal";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";

export const Cart = ({ onClose }) => {
    const { items, totalAmount, addItem, removeItem } = useContext(CartContext);

    const totalAmountToString = totalAmount.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
    });

    const handleAddItemToCart = (item) => {
        addItem({ ...item, amount: 1 });
    };

    const handleRemoveItemFromCart = (id) => {
        removeItem(id);
    };

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {items.map((item, i) => (
                <CartItem
                    key={`item_${item.id}`}
                    amount={item.amount}
                    name={item.name}
                    price={item.price}
                    onAdd={handleAddItemToCart.bind(null, item)}
                    onRemove={handleRemoveItemFromCart.bind(null, item.id)}
                />
            ))}
        </ul>
    );
    const hasItems = items.length > 0;

    return (
        <Modal onClose={onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmountToString}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={onClose} className={classes["button--alt"]}>
                    Close
                </button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};
