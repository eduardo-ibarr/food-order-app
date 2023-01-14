import React, { useReducer } from "react";
import { CartContext } from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const findExistingItem = ({ state, action, method }) => {
    const indexOfExistingItem = state.items.findIndex(
        (item) => item.id === (method === "remove" ? action.id : action.item.id)
    );

    const existingItem = state.items[indexOfExistingItem];

    return { existingItem, indexOfExistingItem };
};

const addItemToCart = ({ state, action }) => {
    const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

    const { existingItem, indexOfExistingItem } = findExistingItem({
        state,
        action,
        method: "add",
    });

    let updatedItems;

    if (existingItem) {
        const updatedItem = {
            ...existingItem,
            amount: existingItem.amount + action.item.amount,
        };

        updatedItems = [...state.items];

        updatedItems[indexOfExistingItem] = updatedItem;
    } else {
        updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
};

const removeItemFromCart = ({ state, action }) => {
    const { existingItem, indexOfExistingItem } = findExistingItem({
        state,
        action,
        method: "remove",
    });

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
        const updatedItem = {
            ...existingItem,
            amount: existingItem.amount - 1,
        };

        updatedItems = [...state.items];
        updatedItems[indexOfExistingItem] = updatedItem;
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        return addItemToCart({ state, action });
    }

    if (action.type === "REMOVE") {
        return removeItemFromCart({ state, action });
    }

    return defaultCartState;
};

export const CartProvider = ({ children }) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const handleAddItemToCart = (item) => {
        dispatchCartAction({ type: "ADD", item });
    };

    const handleRemoveItemFromCart = (id) => {
        dispatchCartAction({ type: "REMOVE", id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: handleAddItemToCart,
        removeItem: handleRemoveItemFromCart,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
};
