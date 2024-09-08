import useCartStore from "@/stores/cartStore";
import { useState } from "react";
import styles from "./styles.module.scss";

const ShoppingCart = () => {
	const { cart } = useCartStore();
	console.log(cart);
	// Sample cart items
	const [cartItems, setCartItems] = useState([
		{
			id: 1,
			name: "Spaghetti",
			price: 32.5,
			quantity: 1,
			imageUrl: "/images/spaghetti.jpg",
			extras: ["Cheese", "Petty"],
		},
		{
			id: 2,
			name: "Pizza",
			price: 32.5,
			quantity: 1,
			imageUrl: "/images/pizza.jpg",
			extras: ["Cheese", "Petty"],
		},
	]);

	const [promoCode, setPromoCode] = useState("");
	const [totalPrice, setTotalPrice] = useState(2565.0);
	const tax = 25.65;
	const delivery = 4.99;
	const discount = 0;

	// Handle removing an item
	const handleRemoveItem = (id) => {
		const updatedCart = cartItems.filter((item) => item.id !== id);
		setCartItems(updatedCart);
	};

	return (
		<div className={styles.cartContainer}>
			<h1 className={styles.cartTitle}>Your Food Cart</h1>

			{cartItems.map((item) => (
				<div key={item.id} className={styles.cartItem}>
					<div className={styles.quantityControl}>
						<button>-</button>
						<span>{item.quantity}</span>
						<button>+</button>
					</div>
					<img
						src={item.imageUrl}
						alt={item.name}
						className={styles.itemImage}
					/>
					<div className={styles.itemDetails}>
						<h2>{item.name}</h2>
						<p>${item.price.toFixed(2)}</p>
						<div className={styles.extras}>
							{item.extras.map((extra, index) => (
								<span key={index} className={styles.extra}>
									{extra} <span className={styles.removeExtra}>×</span>
								</span>
							))}
						</div>
					</div>
					<button
						className={styles.removeItem}
						onClick={() => handleRemoveItem(item.id)}
					>
						×
					</button>
				</div>
			))}

			<div className={styles.promoCodeContainer}>
				<input
					type="text"
					placeholder="Promo Code"
					value={promoCode}
					onChange={(e) => setPromoCode(e.target.value)}
				/>
				<button>Apply</button>
			</div>

			<div className={styles.summary}>
				<p>
					<span>Cart Total</span>
					<span>${totalPrice.toFixed(2)}</span>
				</p>
				<p>
					<span>Tax</span>
					<span>${tax.toFixed(2)}</span>
				</p>
				<p>
					<span>Delivery</span>
					<span>${delivery.toFixed(2)}</span>
				</p>
				<p>
					<span>Promo Discount</span>
					<span>-${discount.toFixed(2)}</span>
				</p>
				<p className={styles.subtotal}>
					<span>Subtotal</span>
					<span>${(totalPrice + tax + delivery - discount).toFixed(2)}</span>
				</p>
			</div>

			<button className={styles.checkoutButton}>Proceed to Checkout</button>
		</div>
	);
};

export default ShoppingCart;
