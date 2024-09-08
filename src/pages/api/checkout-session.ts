import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const { cartItems } = req.body; // Get cart items from the request

			// Prepare line items for Stripe
			const line_items = cartItems.map((item) => ({
				price_data: {
					currency: "usd",
					product_data: {
						name: item.title,
						images: [item.image],
					},
					unit_amount: item.price * 100, // Stripe expects amounts in cents
				},
				quantity: item.quantity,
			}));

			// Create Stripe checkout session
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				line_items,
				mode: "payment",
				success_url: `${req.headers.origin}/success`,
				cancel_url: `${req.headers.origin}/cart`,
			});

			// Send sessionId to the client
			res.status(200).json({ sessionId: session.id });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}
