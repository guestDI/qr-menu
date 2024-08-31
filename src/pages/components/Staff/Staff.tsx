import React, { useMemo, useEffect, useState } from "react"
import { useTable } from "react-table";
import Button from "../../../components/Button/Button";
import styles from "./styles.module.scss";
import Image from "next/image";
import DeleteIcon from "../../../inline-img/svg/delete.svg";
import EditIcon from "../../../inline-img/svg/edit.svg";
import clsx from "clsx";
import axiosInstance from "../../../api/axios";
import AddMemberForm from "./AddMemberForm";
import { toast, ToastContainer } from "react-toastify";
import useStaffStore from "../../../stores/staffStore";
import useUserStore from "@/stores/userStore";
import Modal from "@/components/Modal/Modal"
import EditMemberForm from "@/pages/components/Staff/EditMemberForm"
import { CustomEvent } from "@/model/types"

interface INewStaffMember {
	username: string;
	role: string;
	email: string;
}

interface IStaffMember extends INewStaffMember{
	id: string
}

const Staff = () => {
	const [show, setShow] = useState(false);
	const {
		staffData,
		setStaffData,
		removeStaffMember,
		addStaffMember,
		updateStaffMember,
	} = useStaffStore();
	const user = useUserStore((state) => state.user);

	useEffect(() => {
		const fetchStaffData = async () => {
			try {
				const response = await axiosInstance.get(
					"/users/" + user?.organizationId
				);
				setStaffData(response.data.result);
			} catch (error) {
				console.error("Error fetching staff data:", error);
			}
		};

		fetchStaffData();
	}, [setStaffData]);

	const handleDelete = async (e: CustomEvent, id: string) => {
		e.preventDefault();
		await axiosInstance
			.delete("/users/" + id)
			.then(() => {
				removeStaffMember(id);
				toast("Successfully deleted staff data");
			})
			.catch((error: unknown) => {
				console.error("Error deleting user:", error);
			});
	};

	const handleAddNew = async ({ username, role, email }: INewStaffMember) => {
		await axiosInstance
			.post("/admin/66c4bec16c999e564df47a78/register", {
				username,
				role,
				email,
			})
			.then(({ data }) => {
				console.log(data);
				addStaffMember(data);
				toast("User was added successfully!");
			})
			.catch(() => {
				toast("An unexpected error occurred");
			});
	};

	const handleEdit = async ({ id, username, role, email }: IStaffMember) => {
		await axiosInstance
			.post("/admin/66c4bec16c999e564df47a78/register", {
				username,
				role,
				email,
			})
			.then(({ data }) => {
				console.log(data);
				updateStaffMember(data);
				toast("User was updated successfully!");
			})
			.catch(() => {
				toast("An unexpected error occurred");
			});
	};

	const openShowModal = () => {
		setShow(true);
	}

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
				Header: "Email",
				accessor: "email",
			},
			{
				Header: "Actions",
				Cell: ({ row }: { row: { original: { id: string } } }) => (
					<div className={styles.btnRow}>
						<Button
							className={clsx(styles.btn, styles.actionBtn)}
							onClick={openShowModal}
						>
							<Image src={EditIcon} alt="Edit User" width={20} height={20} />{" "}
						</Button>
						<Button
							className={clsx(styles.btn, styles.actionBtn)}
							onClick={(e) => handleDelete(e, row.original.id)}
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
			// @ts-ignore
			columns,
			data: staffData,
		});

	return (
		<div>
			<h2 className={styles.title}>Staff Management</h2>
			<AddMemberForm onClick={handleAddNew} />
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
			<Modal show={show} onClose={() => setShow(false)} placement="center" className={styles.editModal}>
				<EditMemberForm onClick={handleEdit} onCancel={() => setShow(false)}/>
			</Modal>
			<ToastContainer theme="dark" autoClose={3000} position="bottom-right" />
		</div>
	);
};

export default Staff;
