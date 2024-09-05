import Button from "@/components/Button/Button";
import useScreenResolution from "@/hooks/useScreenResolution";
import MenuCard from "@/pages/components/MenuCreator/MenuCard/MenuCard";
import useMenuStore from "@/stores/menuStore";
import clsx from "clsx";
import { useMemo, useState } from "react";
import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel,
} from "react-accessible-accordion";
import CreatorForm, { CreatorFormProps } from "./CreatorForm";
import styles from "./styles.module.scss";

const MenuCreator = () => {
	const { menuData } = useMenuStore();
	const [isFormVisible, setFormVisible] = useState(false);
	const { isMobile } = useScreenResolution();

	const toggleForm = () => {
		setFormVisible((prev) => !prev); // Toggle visibility
	};

	const categories = useMemo(() => {
		return menuData.map((menuItem) => {
			return {
				label: menuItem.category,
				value: menuItem.category.toLowerCase(),
			};
		});
	}, [menuData]);

	const add: CreatorFormProps["onSubmit"] = () => {};

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
			<aside
				className={clsx(
					styles.creatorForm,
					isFormVisible ? styles.visible : styles.hidden
				)}
			>
				<CreatorForm
					onSubmit={add}
					categories={categories}
					onClose={toggleForm}
					isMobile={isMobile}
				/>
			</aside>
		</div>
	);
};

export default MenuCreator;
