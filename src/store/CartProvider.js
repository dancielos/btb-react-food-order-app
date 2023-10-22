import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = function (state, action) {
	const items = state.items;
	let totalAmount;

	if (action.type === 'ADD_TO_CART') {
		const itemIndex = items.findIndex((item) => item.id === action.item.id);

		if (itemIndex !== -1) {
			items[itemIndex].amount += action.item.amount;
		} else {
			items.push(action.item);
		}

		totalAmount = state.totalAmount + action.item.price * action.item.amount;

		return {
			items: [...items],
			totalAmount,
		};
	} else if (action.type === 'REMOVE_FROM_CART') {
		// console.log(state.items.length);

		const itemIndex = items.findIndex((item) => item.id === action.id);

		if (itemIndex === -1) return;

		totalAmount = state.totalAmount - items[itemIndex].price;

		items[itemIndex].amount -= 1;

		if (items[itemIndex].amount === 0) {
			items.splice(itemIndex, 1);
		}

		return {
			items: [...items],
			totalAmount,
		};
	}

	return defaultCartState;
};

const CartProvider = function (props) {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = function (item) {
		dispatchCartAction({
			type: 'ADD_TO_CART',
			item,
		});
	};
	const removeItemFromCartHandler = function (id) {
		dispatchCartAction({
			type: 'REMOVE_FROM_CART',
			id,
		});
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
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
