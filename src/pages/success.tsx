import axiosInstance from "@/api/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/success.module.scss";

const SuccessPage = () => {
	const router = useRouter();
	const { session_id } = router.query;
	const [loading, setLoading] = useState(false);
	const [orderStatus, setOrderStatus] = useState("completed");

	useEffect(() => {
		const verifyPayment = async () => {
			try {
				const { data } = await axiosInstance.post("/orders/verify-payment", {
					sessionId: session_id,
				});
				setOrderStatus(data.success ? "completed" : "failed");
			} catch (error) {
				console.error("Error verifying payment:", error);
				setOrderStatus("failed");
			} finally {
				setLoading(false);
			}
		};

		if (session_id) {
			verifyPayment();
		}
	}, [session_id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{orderStatus === "completed" ? (
				<div className={styles.container}>
					<div className={styles.container}>
						<div className={styles.card}>
							<div className={styles.iconContainer}>
								<div className={styles.checkmark}>✓</div>
							</div>
							<h2>Thank you!</h2>
							<p>Your transaction was successful</p>

							<div className={styles.details}>
								<div className={styles.detailRow}>
									<span>Date</span>
									<span>20 June, 2017</span>
								</div>
								<div className={styles.detailRow}>
									<span>To</span>
									<span>James Deen</span>
								</div>
								<div className={styles.detailRow}>
									<span>Email</span>
									<span>jamesdeen@gmail.com</span>
								</div>
								<div className={styles.detailRow}>
									<span>Amount</span>
									<span>£1598.00</span>
								</div>
								<div className={styles.detailRow}>
									<span>Status</span>
									<span className={styles.completed}>Completed</span>
								</div>
								<div className={styles.detailRow}>
									<span>Payment Method</span>
									<span>Mastercard ending *56</span>
								</div>
							</div>

							<button
								onClick={() => router.push("/66dec673d926c13e95516a4c/menu")}
								className={styles.closeButton}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			) : (
				<h1>Payment Failed</h1>
			)}
		</div>
	);
};

export default SuccessPage;
