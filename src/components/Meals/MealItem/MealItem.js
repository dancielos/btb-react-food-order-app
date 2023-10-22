import { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = function (props) {
	const cartCtx = useContext(CartContext);

	const price = new Intl.NumberFormat('en-ca', {
		style: 'currency',
		currency: 'CAD',
	}).format(props.price);

	const addToCartHandler = function (amount) {
		cartCtx.addItem({
			id: props.id,
			name: props.name,
			amount,
			price: props.price,
		});
	};

	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.name}</h3>
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealItemForm onAddToCart={addToCartHandler} id={props.id} />
			</div>
		</li>
	);
};

export default MealItem;
