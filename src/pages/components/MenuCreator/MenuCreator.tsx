import styles from "./styles.module.scss";

import MenuCard from "@/pages/components/MenuCreator/MenuCard/MenuCard";
import useMenuStore from "@/stores/menuStore";
import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel,
} from "react-accessible-accordion";
import CreatorForm, { CreatorFormProps } from "./CreatorForm";

const MenuCreator = () => {
	const { menuData } = useMenuStore();

	const add: CreatorFormProps["onSubmit"] = () => {};

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Menu Creator</h2>
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
			<aside className={styles.creatorForm}>
				<CreatorForm onSubmit={add} />
			</aside>
		</div>
	);
};

export default MenuCreator;
