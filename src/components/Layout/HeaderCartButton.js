import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = function (props) {
	const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);

	const cartCtx = useContext(CartContext);

	const { items } = cartCtx;

	const numOfCartItems = items.reduce((acc, item) => {
		return acc + item.amount;
	}, 0);

	const btnClasses = `${classes.button} ${
		isBtnHighlighted ? classes.bump : ''
	}`;

	useEffect(() => {
		if (items.length === 0) return;

		setIsBtnHighlighted(true);

		const timer = setTimeout(() => {
			setIsBtnHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
