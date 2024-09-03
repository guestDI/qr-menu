import React from "react";
import styles from "./styles.module.scss";
import Button from "../../../components/Button/Button";

import useMenuStore from "@/stores/menuStore";
import MenuCard from "@/pages/components/MenuCreator/MenuCard";
import Input from "../../../components/Input/Input";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Textarea from "@/components/Textarea/Textarea";
import Select from "@/components/Select/Select";
import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel,
} from "react-accessible-accordion";

const MenuCreator = () => {
	const { menuData } = useMenuStore();

	const categories = menuData.map((item) => item.category);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const add = () => {};

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Menu Creator</h2>
				</div>
				<div>
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
											{menuItem.items.map((item) => (
												<MenuCard key={item.id} menuItem={item} />
											))}
										</div>
									</AccordionItemPanel>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
			</div>
			<aside className={styles.creatorForm}>
				<form onSubmit={handleSubmit(add)}>
					<Select
						options={[
							{ label: "Option 1", value: "1" },
							{ label: "Option 2", value: "2" },
						]}
						size="lg"
						placeholder="Select Category"
						name="category"
						onAdd={() => {
							console.log("Add new option clicked");
						}}
					/>
					<Input
						size="lg"
						placeholder="Title"
						type="text"
						error={errors?.username?.message as string}
						{...register("title")}
					/>
					<Textarea placeholder="Description" name="description" />
					<Input
						size="lg"
						placeholder="Price"
						type="text"
						error={errors?.email?.message as string}
						{...register("price")}
					/>
					<Button className={clsx(styles.btn, styles.addBtn)} type="submit">
						Save
					</Button>
				</form>
			</aside>
		</div>
	);
};

export default MenuCreator;
