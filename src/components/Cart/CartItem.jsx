import React from "react";

import classes from "./CartItem.module.css";

const CartItem = ({ price, name, amount, onAdd, onRemove }) => {
    const priceToString = price.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
    });

    return (
        <li className={classes["cart-item"]}>
            <div>
                <h2>{name}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>{priceToString}</span>
                    <span className={classes.amount}>x {amount}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <button onClick={onRemove}>-</button>
                <button onClick={onAdd}>+</button>
            </div>
        </li>
    );
};

export default CartItem;
