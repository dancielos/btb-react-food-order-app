import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = function (props) {
	const [isAmountValid, setIsAmountValid] = useState(true);

	const amountInputRef = useRef();

	const submitHandler = function (event) {
		event.preventDefault();

		const enteredAmount = amountInputRef.current.value;

		if (
			Number.isFinite(enteredAmount) ||
			enteredAmount < 1 ||
			enteredAmount > 5
		) {
			setIsAmountValid(false);
			return;
		}

		props.onAddToCart(+enteredAmount);
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input
				label='Amount'
				ref={amountInputRef}
				input={{
					id: `amount-${props.id}`,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<button>+ Add</button>
			{!isAmountValid && <p>Please enter a valid amount (1-5).</p>}
		</form>
	);
};

export default MealItemForm;
