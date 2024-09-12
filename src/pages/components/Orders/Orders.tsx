import clsx from "clsx";
import { useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { ToastContainer } from "react-toastify";
import Button from "../../../components/Button/Button";

import axiosInstance from "@/api/axios";
import useOrderStore from "@/stores/ordersStore";
import styles from "./styles.module.scss";

const Orders = ({ organizationId }: { organizationId: string }) => {
	const { orderData, setOrderData } = useOrderStore();

	useEffect(() => {
		const fetchOrderData = async () => {
			try {
				const response = await axiosInstance.get("/orders/" + organizationId);
				setOrderData(response.data);
			} catch (error) {
				console.error("Error fetching orders data:", error);
			}
		};

		fetchOrderData();
	}, [setOrderData]);

	const columns = useMemo(
		() => [
			{
				Header: "Table Number",
				accessor: "tableId",
				Cell: ({ value }: { value: number }) => (
					<span className={styles.tableNum}>{value}</span>
				),
			},
			{
				Header: "Items",
				accessor: "items",
				Cell: ({ value }: { value: any[] }) => (
					<div>
						{value.map((item, index) => (
							<div className={styles.item} key={index}>
								{item.menuItem.title} - Quantity: {item.quantity} - Price: $
								{item.menuItem.price}
							</div>
						))}
					</div>
				),
			},
			{
				Header: "Total Amount",
				accessor: "totalAmount",
				Cell: ({ value }: { value: number }) => (
					<span className={styles.totalAmount}>${value}</span>
				),
			},
			{
				Header: "Payment",
				accessor: "paymentStatus",
				Cell: ({ value }: { value: string }) => (
					<div
						className={clsx(
							styles.status,
							value === "pending" ? styles.pending : styles.paid
						)}
					>
						{value}
					</div>
				),
			},
			{
				Header: "Actions",
				Cell: ({ row }: { row: { original: { id: string } } }) => (
					<div className={styles.btnRow}>
						<Button
							size="sm"
							className={clsx(styles.btn, styles.actionBtn)}
							onClick={(e) => {}}
						>
							Cl
						</Button>
					</div>
				),
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data: orderData,
		});

	return (
		<div>
			<h2 className={styles.title}>Orders</h2>
			<table {...getTableProps()} className={styles.table}>
				<thead>
					{headerGroups.map((headerGroup, index) => (
						<tr {...headerGroup.getHeaderGroupProps()} key={index}>
							{headerGroup.headers.map((column, index) => (
								<th
									{...column.getHeaderProps()}
									style={{
										borderBottom: "1px solid black",
										padding: "10px",
										textAlign: "left",
									}}
									key={index}
								>
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{!rows.length ? (
						<tr>
							<td colSpan={5}>No Orders yet</td>
						</tr>
					) : (
						rows.map((row, index) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()} key={index}>
									{row.cells.map((cell, index) => (
										<td
											{...cell.getCellProps()}
											style={{
												borderBottom: "1px solid #ccc",
												padding: "10px",
											}}
											key={index}
										>
											{cell.render("Cell")}
										</td>
									))}
								</tr>
							);
						})
					)}
				</tbody>
			</table>
			<ToastContainer theme="dark" autoClose={3000} position="bottom-right" />
		</div>
	);
};

export default Orders;
