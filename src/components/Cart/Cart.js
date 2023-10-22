import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = function (props) {
	const cartCtx = useContext(CartContext);

	const totalAmount = new Intl.NumberFormat('en-ca', {
		style: 'currency',
		currency: 'CAD',
	}).format(cartCtx.totalAmount);

	const hasItems = cartCtx.items.length > 0;

	const removeCartItemHandler = function (id) {
		cartCtx.removeItem(id);
	};

	const addCartItemHandler = function (item) {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={removeCartItemHandler.bind(null, item.id)}
					onAdd={addCartItemHandler.bind(null, item)}
				>
					{item.name}
				</CartItem>
			))}
		</ul>
	);

	return (
		<Modal onHideModal={props.onHideCart}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button--alt']} onClick={props.onHideCart}>
					Close
				</button>
				{hasItems && <button className={classes.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;
