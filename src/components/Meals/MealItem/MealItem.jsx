import React, { useContext } from "react";
import { CartContext } from "../../../context/cart-context";

import classes from "./MealItem.module.css";
import { MealItemForm } from "./MealItemForm";

export const MealItem = ({ name, description, price, id }) => {
    const { addItem } = useContext(CartContext);

    const handleAddToCart = (amount) => {
        addItem({
            id,
            name,
            amount,
            price,
        });
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>
                    {price.toLocaleString("en-us", {
                        style: "currency",
                        currency: "USD",
                    })}
                </div>
            </div>
            <div>
                <MealItemForm id={id} onAddToCart={handleAddToCart} />
            </div>
        </li>
    );
};
