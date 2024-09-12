import axiosInstance from "@/api/axios";
import Button from "@/components/Button/Button";
import useScreenResolution from "@/hooks/useScreenResolution";
import { IMenuItem } from "@/model/types";
import MenuCard from "@/pages/components/MenuCreator/MenuCard/MenuCard";
import useMenuStore from "@/stores/menuStore";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel,
} from "react-accessible-accordion";
import { toast, ToastContainer } from "react-toastify";
import CreatorForm, { CreatorFormProps } from "./CreatorForm";
import styles from "./styles.module.scss";

const MenuCreator = ({ organizationId }: { organizationId: string }) => {
	const [selectedCard, setSelectedCard] = useState(null);
	const { menuData, addMenuItem } = useMenuStore();
	const [isFormVisible, setFormVisible] = useState(false);
	const { isMobile } = useScreenResolution();

	const toggleForm = () => {
		setFormVisible((prev) => {
			if (prev) {
				setSelectedCard(null);
			}
			return !prev;
		});
	};

	console.log(selectedCard);

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

	useEffect(() => {
		if (selectedCard) {
			setFormVisible(true);
		}
	}, [selectedCard]);

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
				<div className={styles.accordionWrapper}>
					<Accordion className={styles.accordion} allowZeroExpanded>
						{menuData.map((menuItem, index) => {
							return (
								<AccordionItem key={index} className={styles.accordion__item}>
									<AccordionItemHeading>
										<AccordionItemButton className={styles.accordion__button}>
											{menuItem.category}
										</AccordionItemButton>
									</AccordionItemHeading>
									<AccordionItemPanel className={styles.accordion__panel}>
										<div className={styles["cards-container"]}>
											{menuItem.items.map((item, index) => (
												<MenuCard
													key={item.id}
													menuItem={item}
													onEdit={() => editMenuItem(item)}
												/>
											))}
										</div>
									</AccordionItemPanel>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
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
			<ToastContainer theme="dark" autoClose={3000} position="bottom-right" />
		</div>
	);
};

export default MenuCreator;
