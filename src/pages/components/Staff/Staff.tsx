import React, { useState, useMemo } from "react";
import { useTable } from "react-table";
import Button from "../../../components/Button/Button";
import styles from "./styles.module.scss";
import Image from "next/image";
import AddUserIcon from "../../../inline-img/svg/user-add.svg";

const Staff = () => {
	// Изначальный список сотрудников
	const [staffData, setStaffData] = useState([
		{ id: 1, username: "john_doe", role: "Admin" },
		{ id: 2, username: "jane_smith", role: "Editor" },
	]);

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

	// Функция для редактирования записи
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
							className={styles.btn}
							onClick={() => handleEdit(row.original.id)}
						>
							Edit
						</Button>
						<Button
							className={styles.btn}
							onClick={() => handleDelete(row.original.id)}
						>
							Delete
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
			<Button className={styles.btn} onClick={handleAddNew}>
				<Image src={AddUserIcon} alt="Add User" width={20} height={20} />{" "}
			</Button>
			<table {...getTableProps()} className={styles.table}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th
									{...column.getHeaderProps()}
									style={{
										borderBottom: "1px solid black",
										padding: "10px",
										textAlign: "left",
									}}
								>
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<td
										{...cell.getCellProps()}
										style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
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
