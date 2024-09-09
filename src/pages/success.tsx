import axiosInstance from "@/api/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/success.module.scss";

interface IOrderDetails {
	createdAt: string;
	email: string;
	totalAmount: number;
	status: string;
}

const SuccessPage = () => {
	const router = useRouter();
	const { session_id } = router.query;
	const [loading, setLoading] = useState(false);
	const [orderStatus, setOrderStatus] = useState("completed");
	const [orderDetails, setOrderDetails] = useState<IOrderDetails>({
		createdAt: "",
		email: "",
		totalAmount: 0,
		status: "",
	});

	const [organizationId, setOrganizationId] = useState<string | null>(null);

	// Use useEffect to get organizationId from sessionStorage after the component has mounted
	useEffect(() => {
		const orgId = window.sessionStorage.getItem("organizationId");
		setOrganizationId(orgId);
	}, []);

	useEffect(() => {
		const verifyPayment = async () => {
			try {
				const { data } = await axiosInstance.post("/orders/verify-payment", {
					sessionId: session_id,
				});
				console.log(data);
				setOrderStatus(data.success ? "completed" : "failed");
				setOrderDetails(data);
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
					<div className={styles.card}>
						<div className={styles.header}>
							<div className={styles.iconContainer}>
								<div className={styles.wrapper}>
									<div className={styles.checkmark}>✓</div>
								</div>
							</div>
						</div>
						<div className={styles.titleContainer}>
							<h2 className={styles.title}>Thank you!</h2>
							<p className={styles.message}>Your transaction was successful</p>
						</div>
						<div className={styles.separator}>
							<div className={styles.left}></div>
							<div className={styles.right}></div>
						</div>
						<div className={styles.body}>
							<div className={styles.details}>
								<div className={styles.detailRow}>
									<div className={styles.date}>
										<span className={styles.label}>Date</span>
										<span className={styles.value}>
											{orderDetails.createdAt?.split(",")[0]}
										</span>
									</div>
									<div className={styles.date}>
										<span className={styles.label}>Time</span>
										<span className={styles.value}>
											{orderDetails.createdAt?.split(",")[1]}
										</span>
									</div>
								</div>
								<div className={styles.detailRow}>
									<div className={styles.emailTo}>
										<span className={styles.label}>To</span>
										<span className={styles.value}>{orderDetails.email}</span>
									</div>
								</div>
								<div className={styles.detailRow}>
									<div className={styles.amount}>
										<span className={styles.label}>Amount</span>
										<span className={styles.value}>
											£{orderDetails.totalAmount}
										</span>
									</div>
									<span className={styles.completed}>
										{orderDetails.status}
									</span>
								</div>

								<div className={styles.paymentMethod}>
									<span className={styles.label}>Payment Method</span>
									<span className={styles.value}>Credit/Debit Card</span>
								</div>
							</div>
						</div>

						<div className={styles.footer}>
							<button
								onClick={() => router.push(`/${organizationId}/menu`)}
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
