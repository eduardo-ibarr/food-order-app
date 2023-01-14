import React, { useState } from "react";

import { Cart } from "./components/Cart/Cart";
import { Header } from "./components/Layout/Header";
import { Meals } from "./components/Meals/Meals";

import { CartProvider } from "./context/CartProvider";

function App() {
    const [showCart, setShowCart] = useState(false);

    const handleShowCart = () => {
        setShowCart(true);
    };

    const handleHideCart = () => {
        setShowCart(false);
    };

    return (
        <CartProvider>
            <Header onShowCart={handleShowCart} />
            {showCart && <Cart onClose={handleHideCart} />}

            <main>
                <Meals />
            </main>
        </CartProvider>
    );
}

export default App;
