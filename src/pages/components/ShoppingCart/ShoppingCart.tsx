import axiosInstance from "@/api/axios";
import Button from "@/components/Button/Button";
import { CartItem } from "@/stores/cartStore";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./styles.module.scss";

interface IShoppingCartProps {
	cart: CartItem[];
	addItemToShoppingCart: (item: CartItem) => void;
	removeItemFromShoppingCart: (id: string) => void;
	clearShoppingCart: () => void;
	decreaseItemCount: (id: string) => void;
}

const calculateTotalPrice = (cart: CartItem[]) => {
	return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const tax = "Included";

const ShoppingCart = ({
	cart,
	addItemToShoppingCart,
	removeItemFromShoppingCart,
	clearShoppingCart,
	decreaseItemCount,
}: IShoppingCartProps) => {
	const [loading, setLoading] = useState(false);
	const stripePromise = loadStripe(
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
	);

	const handleCheckout = async () => {
		setLoading(true);

		try {
			const { data } = await axiosInstance.post("/orders", {
				tableId: "0",
				items: cart,
			});

			const response = await axiosInstance.post(
				"/orders/create-checkout-session",
				{
					orderId: data.order._id,
				}
			);
			const stripe = await stripePromise;
			if (!stripe) {
				throw new Error("Stripe.js has not loaded.");
			}
			await stripe.redirectToCheckout({ sessionId: response.data.sessionId });

			// setOrderId(data.order._id);
		} catch (error) {
			console.error("Error creating order:", error);
		}

		setLoading(false);
	};

	const totalPrice = useMemo(() => {
		return calculateTotalPrice(cart);
	}, [cart]);

	return (
		<div className={styles.cartContainer}>
			<h1 className={styles.cartTitle}>Your Cart</h1>

			<div className={styles.cartItems}>
				{cart.map((item) => (
					<div key={item.id} className={styles.cartItem}>
						<div className={styles.quantityControl}>
							<Button round={true} onClick={() => decreaseItemCount(item.id)}>
								-
							</Button>
							<span>{item.quantity}</span>
							<Button round={true} onClick={() => addItemToShoppingCart(item)}>
								+
							</Button>
						</div>
						{item.image ? (
							<Image
								src={item.image}
								alt={item.title}
								className={styles.itemImage}
								width={30}
								height={30}
							/>
						) : (
							<div className={styles.noImage}>
								<span>No image</span>
							</div>
						)}
						<div className={styles.itemDetails}>
							<h2>{item.title}</h2>
							<p>${item.price.toFixed(2)}</p>
							{/* <div className={styles.extras}>
							{item.extras.map((extra, index) => (
								<span key={index} className={styles.extra}>
									{extra} <span className={styles.removeExtra}>×</span>
								</span>
							))}
						</div> */}
						</div>
						<button
							className={styles.removeItem}
							onClick={() => removeItemFromShoppingCart(item.id)}
						>
							×
						</button>
					</div>
				))}
			</div>
			{/* commented for now, will be possible to change in admin settings */}
			{/* <div className={styles.promoCodeContainer}>
				<input
					type="text"
					placeholder="Promo Code"
					value={promoCode}
					onChange={(e) => setPromoCode(e.target.value)}
				/>
				<button>Apply</button>
			</div> */}

			<div className={styles.clearCart}>
				<Button
					className={styles.clearCartButton}
					type="link"
					onClick={clearShoppingCart}
				>
					Clear cart
				</Button>
			</div>

			<div className={styles.summary}>
				<p>
					<span>Cart Total</span>
					<span>${totalPrice.toFixed(2)}</span>
				</p>
				<p>
					<span>Tax</span>
					<span>{tax}</span>
				</p>
				<p className={styles.subtotal}>
					<span>Subtotal</span>
					<span>${totalPrice}</span>
				</p>
			</div>
			<button
				className={styles.checkoutButton}
				disabled={loading}
				onClick={handleCheckout}
			>
				{loading ? "Loading..." : "Proceed to Checkout"}
			</button>
		</div>
	);
};

export default ShoppingCart;
