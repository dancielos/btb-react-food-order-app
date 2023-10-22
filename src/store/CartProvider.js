import CartContext from './cart-context';

const CartProvider = function (props) {
	const addItemToCartHandler = function (item) {};
	const removeItemFromCartHandler = function (id) {};

	const cartContext = {
		items: [],
		totalAmount: 0,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
