import React, { useRef, useState } from "react";
import { Input } from "../../UI/Input";

import classes from "./MealItemForm.module.css";

export const MealItemForm = ({ id, onAddToCart }) => {
    const amountInputRef = useRef();
    const [isInvalidInput, setIsInvalidInput] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        const isInvalidEnteredAmount =
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5;

        if (isInvalidEnteredAmount) {
            setIsInvalidInput(true);
            return;
        }

        setIsInvalidInput(false);

        onAddToCart(enteredAmountNumber);
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Input
                label="Amount"
                ref={amountInputRef}
                input={{
                    id: "amount_" + id,
                    type: "number",
                    min: 1,
                    max: 5,
                    step: 1,
                    defaultValue: 1,
                }}
            />

            <button type="submit">+ Add</button>

            {isInvalidInput && <p>Please enter a valid amount (1-5)</p>}
        </form>
    );
};
