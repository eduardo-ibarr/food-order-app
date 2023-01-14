import React from "react";

import image_meals from "../../assets/meals.jpg";

import classes from "./Header.module.css";
import { HeaderCartButton } from "./HeaderCartButton";

export const Header = ({ onShowCart }) => {
    return (
        <>
            <header className={classes.header}>
                <h1>Meals</h1>
                <HeaderCartButton onClick={onShowCart} />
            </header>
            <div className={classes["main-image"]}>
                <img alt="A table with foods." src={image_meals} />
            </div>
        </>
    );
};
