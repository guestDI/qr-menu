import React, { useState, useMemo, useEffect } from "react";
import { useTable } from "react-table";
import Button from "../../../components/Button/Button";
import styles from "./styles.module.scss";
import Image from "next/image";
import AddUserIcon from "../../../inline-img/svg/user-add.svg";
import DeleteIcon from "../../../inline-img/svg/delete.svg";
import EditIcon from "../../../inline-img/svg/edit.svg";
import clsx from "clsx";
import axiosInstance from "../../../api/axios";
import Input from "../../../components/Input/Input";

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

	const handleDelete = (id) => {
		setStaffData(staffData.filter((staff) => staff.id !== id));
	};

	const handleAddNew = () => {
		const newStaff = {
			id: staffData.length + 1,
			username: `new_user_${staffData.length + 1}`,
			role: "Viewer",
		};
		setStaffData([...staffData, newStaff]);
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
							onClick={() => handleEdit(row.original.id)}
						>
							<Image src={EditIcon} alt="Edit User" width={20} height={20} />{" "}
						</Button>
						<Button
							className={clsx(styles.btn, styles.actionBtn)}
							onClick={() => handleDelete(row.original.id)}
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
			<div className={styles.row}>
				<Input size="lg" placeholder="Username" name="Username" type="text" onChange={() => {}} />
				<Input size="lg" placeholder="Email (optional)" name="Email" type="text" onChange={() => {}}/>
				<Button
					className={clsx(styles.btn, styles.addBtn)}
					onClick={handleAddNew}
				>
					<Image src={AddUserIcon} alt="Add User" width={20} height={20} />{" "}
				</Button>
			</div>
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
		</div>
	);
};

export default Staff;
