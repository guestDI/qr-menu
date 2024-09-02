import React from "react";
import styles from "./styles.module.scss";
import Button from "../../../components/Button/Button";

import useMenuStore from "@/stores/menuStore";
import MenuCard from "@/pages/components/MenuCreator/MenuCard";
import useAppStore from "@/stores/appStore";
import Input from "../../../components/Input/Input";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Textarea from "@/components/Textarea/Textarea"

const MenuCreator = () => {
	const { isPreviewOpen, togglePreview } = useAppStore((state) => state);
	const { menuData } = useMenuStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const add = () => {};

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Menu Creator</h2>
				</div>
				<div>
					<div className={styles["cards-container"]}>
						{menuData.map((item) => (
							<MenuCard key={item.id} menuItem={item} />
						))}
					</div>
				</div>
			</div>
			<aside className={styles.creatorForm}>
				<form onSubmit={handleSubmit(add)}>
					<Input
						size="lg"
						placeholder="Category"
						type="text"
						{...register("category")}
					/>
					<Input
						size="lg"
						placeholder="Title"
						type="text"
						error={errors?.username?.message as string}
						{...register("title")}
					/>
					<Textarea placeholder="Description" name="description"/>
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
