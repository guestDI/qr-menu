import React, { useState, useMemo, useEffect } from "react";
import { useTable } from "react-table";
import Button from "../../../components/Button/Button";
import styles from "./styles.module.scss";
import Image from "next/image";
import DeleteIcon from "../../../inline-img/svg/delete.svg";
import EditIcon from "../../../inline-img/svg/edit.svg";
import clsx from "clsx";
import axiosInstance from "../../../api/axios";
import AddUserForm from "./AddUserForm";
import { toast, ToastContainer } from "react-toastify"

const Staff = () => {
	const [staffData, setStaffData] = useState([]);

	useEffect(() => {
		const fetchStaffData = async () => {
			try {
				const response = await axiosInstance.get(
					"/users/66c4bec16c999e564df47a78"
				);
				setStaffData(response.data.result);
			} catch (error) {
				console.error("Error fetching staff data:", error);
			}
		};

		fetchStaffData();
	}, []);

	const handleDelete = async (e: Event, id: string) => {
		e.preventDefault();
		await axiosInstance
			.delete("/users/" + id)
			.then(({ data }) => {
				const newStaffData = staffData.filter((staff) => staff._id !== data.id);
				setStaffData(newStaffData);
			})
			.catch((error: unknown) => {
				console.error("Error deleting user:", error);
			});
	};

	const handleAddNew = async ({ username, role, email }) => {
		// e.preventDefault();
		await axiosInstance
			.post("/admin/66c4bec16c999e564df47a78/register", {
				username,
				role,
				email
			})
			.then(({ data }) => {
				console.log(data);
				toast("User was added successfully!");
			})
			.catch(() => {
				toast("An unexpected error occurred");
			});

		// setStaffData([...staffData, newStaff]);
	};

	const handleEdit = (id: string) => {
		const updatedStaff = staffData.map((staff) => {
			if (staff.id === id) {
				return {
					...staff,
					username:
						prompt("Enter new username:", staff.username) || staff.username,
				};
			}
			return staff;
		});
		setStaffData(updatedStaff);
	};

	// Определение колонок для таблицы
	const columns = useMemo(
		() => [
			{
				Header: "Username",
				accessor: "username",
			},
			{
				Header: "Role",
				accessor: "role",
			},
			{
				Header: "Actions",
				Cell: ({ row }) => (
					<div className={styles.btnRow}>
						<Button
							className={clsx(styles.btn, styles.actionBtn)}
							onClick={() => handleEdit(row.original._id)}
						>
							<Image src={EditIcon} alt="Edit User" width={20} height={20} />{" "}
						</Button>
						<Button
							className={clsx(styles.btn, styles.actionBtn)}
							onClick={(e) => handleDelete(e, row.original._id)}
						>
							<Image
								src={DeleteIcon}
								alt="Delete User"
								width={20}
								height={20}
							/>{" "}
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
			data: staffData,
		});

	return (
		<div>
			<h2 className={styles.title}>Staff Management</h2>
			<AddUserForm onClick={handleAddNew} />
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
					{rows.map((row, index) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()} key={index}>
								{row.cells.map((cell, index) => (
									<td
										{...cell.getCellProps()}
										style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
										key={index}
									>
										{cell.render("Cell")}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
			<ToastContainer
				theme="dark"
				autoClose={3000}
				position="bottom-right"
			/>
		</div>
	);
};

export default Staff;
