import React, { useContext, useEffect, useState } from "react";

import { CartContext } from "../../context/cart-context.js";

import { CartIcon } from "../Cart/CartIcon.jsx";

import classes from "./HeaderCartButton.module.css";

export const HeaderCartButton = ({ onClick }) => {
    const { items } = useContext(CartContext);
    const [showAnimation, setShowAnimation] = useState(false);

    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    useEffect(() => {
        if (items.length === 0) {
            return;
        }

        setShowAnimation(true);

        const timeout = setTimeout(() => {
            setShowAnimation(false);
        }, 300);

        return () => {
            clearTimeout(timeout);
        };
    }, [items]);

    return (
        <button
            onClick={onClick}
            className={`${classes.button} ${showAnimation ? classes.bump : ""}`}
        >
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};
