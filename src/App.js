import { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {
	const [isCartShown, setIsCartShown] = useState(false);

	const showCartHandler = () => setIsCartShown(true);

	const hideCartHandler = () => setIsCartShown(false);

	return (
		<>
			{isCartShown && <Cart onHideCart={hideCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</>
	);
}

export default App;
