import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar, Products, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
}));


const App = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const classes = useStyles();
    const [error, setError] = useState('');
    const [shippingData, setShippingData] = useState({});


    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    };

    const fetchCart = async () => {
        const cartData = await commerce.cart.retrieve();
        if (cartData) {
            setCart(cartData);
        }
    };

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
        window.location.reload(); // Refresh the page

    };

    const handleUpdateCartQty = async (lineItemId, quantity) => {
        try {
            const response = await commerce.cart.update(lineItemId, { quantity });
            setCart(response.cart);
            window.location.reload(); // Refresh the page
        } catch (error) {
            console.log('There was an error updating the cart items', error);
        }
    };

    const handleRemoveFromCart = async (lineItemId) => {
        const response = await commerce.cart.remove(lineItemId);

        setCart(response.cart);
        window.location.reload(); // Refresh the page
    };


    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();

        setCart(response.cart);
        window.location.reload(); // Refresh the page

    };

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);

            refreshCart();
        } catch (error) {
            console.log(error);
            setError(error.data.error.message);
        }
        // Send the user to the receipt
        // Store the order in session storage so we can show it again if the
        // user refreshes the page!
        window.sessionStorage.setItem('order_receipt', JSON.stringify(order));
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    console.log(cart);
    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <Navbar totalItems={cart ? cart.total_items : 0} handleDrawerToggle={handleDrawerToggle} />
                <Routes>
                    <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />} />
                    <Route path="/cart" element={<Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />} />
                    <Route path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={error} shippingData={shippingData} onEmptyCart={handleEmptyCart} />} />
                </Routes>

            </div>
        </Router>
    );
};

export default App;
