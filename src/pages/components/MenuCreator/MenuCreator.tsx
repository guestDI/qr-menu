import axiosInstance from "@/api/axios";
import { Modal } from "@/components";
import Button from "@/components/Button/Button";
import useScreenResolution from "@/hooks/useScreenResolution";
import { IMenuItem } from "@/model/types";
import useMenuStore from "@/stores/menuStore";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CreatorForm, { CreatorFormProps } from "./CreatorForm";
import MenuCategoryList from "./MenuCategoryList/MenuCategoryList";
import styles from "./styles.module.scss";

const MenuCreator = ({ organizationId }: { organizationId: string }) => {
	const [selectedCard, setSelectedCard] = useState(null);
	const [cardToDelete, setCardToDelete] = useState<string | null>(null);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [isFormVisible, setFormVisible] = useState(false);
	const { menuData, addMenuItem, removeMenuItem } = useMenuStore();
	const { isMobile } = useScreenResolution();

	const toggleForm = () => {
		setFormVisible((prev) => {
			if (prev) {
				setSelectedCard(null);
			}
			return !prev;
		});
	};

	const closeForm = () => {
		setFormVisible(false);
		setSelectedCard(null);
	};

	const categories = useMemo(() => {
		return menuData.map((menuItem) => {
			return {
				label: menuItem.category,
				value: menuItem.category.toLowerCase(),
			};
		});
	}, [menuData]);

	const add: CreatorFormProps["onSubmit"] = async (data: IMenuItem) => {
		const categoryTitle = categories.find(
			(category) => category.value === data.category
		)?.label;

		await axiosInstance
			.put("/menu/add-menu-items", {
				menuItems: [
					{
						title: data.title,
						description: data.description,
						category: categoryTitle,
						currency: "Euro",
						price: data.price,
					},
				],
				placeId: organizationId,
			})
			.then(({ data }) => {
				console.log(data);
				addMenuItem(data.menu);
				toast("Menu item was added successfully!");
			})
			.catch((e) => {
				console.log(e);
				toast("An unexpected error occurred");
			});
	};

	const editMenuItem = (item) => {
		setSelectedCard(item);
	};

	const handleDeleteItem = (id: string) => {
		setCardToDelete(id);
		setShowConfirmationModal(true);
	};

	const deleteMenuItem = async (id: string) => {
		await axiosInstance
			.delete(`/menu/delete-menu-items/`, {
				data: {
					menuIds: [id],
				},
			})
			.then(() => {
				toast("Menu item was deleted successfully!");
				removeMenuItem(id); // Update the menu store
			})
			.catch((e) => {
				console.log(e);
				toast("An unexpected error occurred");
			});
	};

	const handleConfirm = () => {
		deleteMenuItem(cardToDelete);
	};

	const handleCancel = () => {
		setShowConfirmationModal(false);
		setSelectedCard(null);
	};

	useEffect(() => {
		if (selectedCard) {
			setFormVisible(true);
		}
	}, [selectedCard]);

	console.log("aaa", menuData);

	return (
		<div className={styles.main}>
			<div
				className={clsx(
					styles.container,
					isFormVisible ? styles.shortWidth : styles.fullWidth
				)}
			>
				<div className={styles.header}>
					<h2>Menu Creator</h2>
					<Button onClick={toggleForm} className={styles.toggleButton}>
						{isFormVisible ? "Hide Form" : "Show Form"}
					</Button>
				</div>
				<MenuCategoryList
					menuData={menuData}
					editMenuItem={editMenuItem}
					handleDeleteItem={handleDeleteItem}
				/>
			</div>
			<aside
				className={clsx(
					styles.creatorForm,
					isFormVisible ? styles.visible : styles.hidden
				)}
			>
				<CreatorForm
					onSubmit={add}
					categories={categories}
					onClose={closeForm}
					isMobile={isMobile}
					organizationId={organizationId}
					selectedMenuCard={selectedCard}
				/>
			</aside>
			<Modal
				className={styles.confirmModal}
				placement="center"
				show={showConfirmationModal}
				closeOnBackdrop={false}
				onClose={() => setShowConfirmationModal(false)}
			>
				<div className={styles.body}>
					<div className={styles.header}>
						<h3>Are you sure?</h3>
						<Button
							className={styles.closeBtn}
							round={true}
							onClick={handleCancel}
						>
							X
						</Button>
					</div>

					<div className={styles.footer}>
						<Button className={styles.secondaryBtn} onClick={handleCancel}>
							Cancel
						</Button>
						<Button className={styles.primaryBtn} onClick={handleConfirm}>
							Confirm
						</Button>
					</div>
				</div>
			</Modal>
			<ToastContainer theme="dark" autoClose={3000} position="bottom-right" />
		</div>
	);
};

export default MenuCreator;
